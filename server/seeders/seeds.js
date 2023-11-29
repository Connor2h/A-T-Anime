const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { User, MyAnime, Anime } = require('../models');
//const animeData = require('./animedb');
const animeData = require('./animeSeed');

db.once('open', async () => {
    await Anime.deleteMany({});
    await MyAnime.deleteMany({});
    await User.deleteMany({});

    // create user data seed
    const userData = [];

    for (let i = 0; i < 104; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const { insertedCount, insertedIds } = await User.collection.insertMany(userData);
    

    // create followers for seeded users
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * insertedCount);
        const [randomUserId, randomUserValue] = Object.entries(insertedIds)[randomUserIndex];

        let followerId = randomUserId;

        while (followerId === randomUserId) {
            const randomFollowerIndex = Math.floor(Math.random() * insertedCount);
            const [randomFollowerId, randomFollowerValue] = Object.entries(insertedIds)[randomFollowerIndex];
            followerId = randomFollowerId;
        }

        await User.updateOne({ _id: randomUserValue }, { $addToSet: { followers: randomUserValue } });
    }

    // create following for seeded users
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * insertedCount);
        const [randomUserId, randomUserValue] = Object.entries(insertedIds)[randomUserIndex];

        let followingId = randomUserId;

        while (followingId === randomUserId) {
            const randomFollowerIndex = Math.floor(Math.random() * insertedCount);
            const [randomFollowerId, randomFollowerValue] = Object.entries(insertedIds)[randomFollowerIndex];
            followingId = randomFollowerId;
        }

        await User.updateOne({ _id: randomUserValue }, { $addToSet: { following: randomUserValue } });
    }

    //push anime data into anime Model db
    const { insertedCount: animeLength, insertedIds:animeIds } = await Anime.collection.insertMany(animeData);

    //creating random myanime lists for seeded users
    const userListData = [];
    for (let i = 0; i < 75; i += 1) {
        const anime = []; 
        // Gets user ID
        const [randomUserId, randomUserValue] = Object.entries(insertedIds)[i];
        //const { _id: userId } = createdUsers.ops[i];

        // Creates 5 Myanime for user
        for (let i=0; i<5; i+= 1) {
            const randomAnimeIndex = Math.floor(Math.random() * animeLength);
            // Gets random anime
            const [randomAnimeId, randomAnimeValue] =  Object.entries(animeIds)[randomAnimeIndex];
            //anime.push(addAnime);

            // Puts random anime in MyAnime
            let myAnimedata = await MyAnime.create({ userId: randomUserValue, score: 5, anime: [randomAnimeValue] });
            // Puts new MyAnime in User
            const updatedUser = await User.findOneAndUpdate(
                { _id: randomUserValue },
                { $push: { myAnime: myAnimedata._id }},
                { new: true }
            );
        }

        //await User.updateOne({ _id: userId }, { $addToSet: { myAnime: anime } });

        //userListData.push({userId, anime});
    }
    // await MyAnime.collection.insertMany(userListData);
    // console.log(userListData);


    console.log('Seeding complete');
    process.exit(0);
});