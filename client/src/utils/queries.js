import { gql } from '@apollo/client';

export const ALL_ANIME = gql`
  query allAnime($page: Int) {
    allAnime(page: $page) {
      _id
      englishTitle
      romajiTitle
      nativeTitle
      type
      format
      status
      description
      startDate
      endDate
      season
      episodes
      duration
      source
      coverImageLarge
      coverImageMedium
      bannerImage
      genres
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query Users {
  users {
    _id
    username
    email
    followerCount
    followingCount
    myAnime {
      userId
      score
      anime {
        _id
        englishTitle
        romajiTitle
        nativeTitle
        type
        format
        status
        description
        startDate
        endDate
        season
        episodes
        duration
        source
        coverImageLarge
        coverImageMedium
        bannerImage
        genres
      }
    }
  }
}
`;

export const QUERY_USER_BY_ID = gql`
  query Query($userId: ID!) {
  user(userId: $userId) {
    myAnime {
      userId
      score
      anime {
        _id
        englishTitle
        romajiTitle
        nativeTitle
        type
        format
        status
        description
        startDate
        endDate
        season
        episodes
        duration
        source
        coverImageLarge
        coverImageMedium
        bannerImage
        genres
      }
    }
    _id
    username
  }
}
`;


export const LIST_ANIME = gql`
  query animeByName($romajiTitle: String, $genres: [String]) {
    animeByName(romajiTitle: $romajiTitle, genres: $genres) {
      _id
      englishTitle
      romajiTitle
      nativeTitle
      description
      coverImageLarge
      coverImageMedium
      bannerImage
      genres
    }
  }
`;

export const QUERY_USER = gql`
  query UserByUserName($userName: String!) {
    userByUserName(userName: $userName) {
      _id
      username
      email
      followerCount
      followingCount
      following {
        username
      }
      myAnime {
        userId
        score
        anime {
          _id
          englishTitle
          nativeTitle
          romajiTitle
          type
          format
          status
          description
          startDate
          endDate
          season
          episodes
          duration
          source
          coverImageLarge
          coverImageMedium
          bannerImage
          genres
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      followerCount
      followingCount
      following {
        username
      }
      myAnime {
        userId
        score
        anime {
          _id
          englishTitle
          nativeTitle
          romajiTitle
          type
          format
          status
          description
          startDate
          endDate
          season
          episodes
          duration
          source
          coverImageLarge
          coverImageMedium
          bannerImage
          genres
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const Query_User_Search = gql `
query userSearchBar($page: Int!, $userName: String!) {
  userSearchBar(page: $page, userName: $userName) {
    _id
    username
    email
    followerCount
    followingCount
    following {
      username
    }
    myAnime {
      userId
      score
      anime {
        _id
        englishTitle
        nativeTitle
        romajiTitle
        type
        format
        status
        description
        startDate
        endDate
        season
        episodes
        duration
        source
        coverImageLarge
        coverImageMedium
        bannerImage
        genres
      }
    }
  }
}
`;

export const Query_Anime_By_Search = gql `
  query getAnimeBySearch($page: Int!, $title: String!) {
    getAnimeBySearch(page: $page, title: $title) {
      _id
      englishTitle
      romajiTitle
      nativeTitle
      type
      format
      status
      description
      startDate
      endDate
      season
      episodes
      duration
      source
      coverImageLarge
      coverImageMedium
      bannerImage
      genres
    }
  }
`
