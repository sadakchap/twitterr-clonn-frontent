import { createContext, useContext, useReducer } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_SELECTED_USER":
      const usersCopy = state.users.map((user) => ({
        ...user,
        selected: action.payload === user.username,
      }));
      return {
        ...state,
        users: usersCopy,
      };
    case "SET_USER_MESSAGES":
      // action.payload --> { username: "", messages: [] }
      const users = state.users.map((user) => {
        if (user.username === action.payload.username) {
          return {
            ...user,
            messages: action.payload.messages,
          };
        }
        return user;
      });
      return {
        ...state,
        users,
      };
    default:
      return state;
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
