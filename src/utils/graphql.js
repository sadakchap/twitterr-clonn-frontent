import { gql } from "@apollo/client";

export const filterUsers = async (token, text) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
        query {
          getUsers(filter: "${text}") {
            id
            username
            name
            bio
            profile_pic
          }
        }
        `,
      }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const FETCH_TWEETS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likesCount
      commentsCount
      likes {
        id
        username
      }
      comments {
        id
        body
        username
        createdAt
        name
      }
      author {
        name
        profile_pic
      }
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($username: String!) {
    getUser(username: $username) {
      id
      username
      name
      bio
      profile_pic
      postsCount
      location
      website
      dob
      createdAt
      posts {
        id
        body
        username
        createdAt
        likesCount
        commentsCount
        likes {
          id
          username
        }
        comments {
          id
          body
          username
          createdAt
          name
        }
      }
    }
  }
`;
