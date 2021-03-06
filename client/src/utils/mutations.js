import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

/* export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`; */
export const ADD_ANIME = gql`
mutation addAnime($animeId: ID!) {
  addAnime(animeId: $animeId) {
    userId
    anime {
      _id
      }
    }
  }
`;

export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: ID!) {
  removeAnime(animeId: $animeId) {
    userId
    anime {
      _id
      }
    }
  }
`;

/* export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`; */

export const FOLLOW_USER = gql`
  mutation Mutation($followingId: ID!) {
  follow(followingId: $followingId) {
    _id
    username
    email
  }
}
`;

export const UNFOLLOW_USER = gql`
  mutation unFollow($followingId: ID!) {
    unFollow(followingId: $followingId) {
      _id
      username
      email
      following {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_SCORE = gql`
  mutation UpdateScore($score: Int!, $myAnimeId: ID!) {
    updateScore(score: $score, myAnimeId: $myAnimeId) {
      userId
      score
      anime {
        _id
        englishTitle
        romajiTitle
        nativeTitle
      }
    }
  }
`;