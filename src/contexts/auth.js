import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwt")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwt"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwt");
  } else {
    initialState.user = decodedToken;
  }
}

export const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});
// userData: {username: "", id: "", token: ""}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_DATA":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwt", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/login";
  };

  const updateState = (userData) => {
    dispatch({
      type: "UPDATE_DATA",
      payload: userData,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateState }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
