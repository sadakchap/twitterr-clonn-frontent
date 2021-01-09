import { createContext, useContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { gql, useLazyQuery } from "@apollo/client";

let initialState = {
  authenticated: false,
  user: {
    credentials: null,
    data: null,
  },
  loading: false,
};

const token = localStorage.getItem("jwt");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem("token");
  } else {
    initialState = {
      authenticated: true,
      user: {
        credentials: { token: token },
        data: decodedToken,
      },
    };
  }
} else console.log("No token found");

const GET_USER_QUERY = gql`
  query($username: String!) {
    getUser(username: $username) {
      id
      username
      name
      profile_pic
      unreadNotifications
      notifications {
        id
        link
        read
        verb
        message
      }
      dob
      bio
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
      website
      location
      createdAt
    }
  }
`;

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        authenticated: true,
        user: { ...state.user, credentials: action.payload },
      };
    case "LOGOUT":
      console.log("removing token");
      localStorage.removeItem("jwt");
      return initialState;

    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, data: action.payload },
      };
    case "UPDATE_USER":
      console.log("action triggered");
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          data: { ...state.user.data, ...action.payload },
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      break;
  }
  // LOGIN, LOGOUT, SET_USER, SET_LOADING
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [getUserData] = useLazyQuery(GET_USER_QUERY, {
    onCompleted: (data) => {
      dispatch({ type: "SET_USER", payload: data.getUser });
      dispatch({ type: "SET_LOADING", payload: false });
    },
    onError: (err) => {
      console.log(err);
      dispatch({ type: "LOGOUT" });
      window.location.href = "/login";
    },
  });

  useEffect(() => {
    if (
      state.authenticated &&
      Object.prototype.hasOwnProperty.call(state.user.data, "exp")
    ) {
      getUserData({ variables: { username: state.user.data.username } });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {props.children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

/*
  state: {
    authenticated: false,
    user: {
      credentials: {
        token
      }
      data: {
        id: ""
        username: ""
        name: ""
        profile_pic: ""
        unreadNotifications: 0
        notifications: [{}]
        bio: ""
        location: ""
        website: ""
        dob: ""
        createdAt: ""
      }
    }
    loading: false
  }
*/
