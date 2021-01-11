import { createContext, useContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { FETCH_CURRENT_USER_QUERY } from "../utils/graphql";

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
      loading: false,
    };
  }
} else console.log("No token found");

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

    case "MARK_READ":
      return {
        ...state,
        user: {
          ...state.user,
          data: { ...state.user.data, unreadNotifications: 0 },
        },
      };

    default:
      break;
  }
  // LOGIN, LOGOUT, SET_USER, SET_LOADING
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [getUserData] = useLazyQuery(FETCH_CURRENT_USER_QUERY, {
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
      dispatch({ type: "SET_LOADING", payload: true });
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
