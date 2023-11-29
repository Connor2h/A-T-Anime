const {faker} = require('@faker-js/faker');
const { parse } = require('graphql');

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

    for (let i = 0; i < 100; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const createdUsers = await User.collection.insertMany(userData);
    // console.log(userData);

    // create followers for seeded users
    for (let i = 0; i < 10; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
        const { _id: userId } = createdUsers.insertedIds[randomUserIndex];

        // console.log(userId);
        let followerId = userId;

        while (followerId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
            followerId = createdUsers.insertedIds[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
    }

    // create following for seeded users
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
        const { _id: userId } = createdUsers.insertedIds[randomUserIndex];

        let followingId = userId;

        while (followingId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
            followingId = createdUsers.insertedIds[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { following: followingId } });
    }

    // console.log(userData);

    //push anime data into anime Model db
    const createdAnime = await Anime.collection.insertMany(animeData);

    //creating random myanime lists for seeded users
    // const userListData = [];
    // for (let i = 0; i < 75; i += 1) {
    //     const anime = []; 
    //     // Gets user ID
    //     const { _id: userId } = createdUsers[i];

    //     // Creates 5 Myanime for user
    //     for (let i=0; i<5; i+= 1) {
    //         const randomAnimeIndex = Math.floor(Math.random() * createdAnime.insertedCount);
    //         // Gets random anime
    //         const addAnime = createdAnime.insertedIds[randomAnimeIndex];
    //         //anime.push(addAnime);

    //         // Puts random anime in MyAnime
    //         let myAnimedata = await MyAnime.create({ userId: userId, score: 5, anime: [addAnime._id] });
    //         // Puts new MyAnime in User
    //         const updatedUser = await User.findOneAndUpdate(
    //             { _id: userId },
    //             { $push: { myAnime: myAnimedata._id }},
    //             { new: true }
    //         );
    //     }

    //     //await User.updateOne({ _id: userId }, { $addToSet: { myAnime: anime } });

    //     //userListData.push({userId, anime});
    // }
    // await MyAnime.collection.insertMany(userListData);
    // console.log(userListData);


    console.log('Seeding complete');
    process.exit(0);
});