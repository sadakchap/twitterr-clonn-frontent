import { createContext, useContext, useReducer } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  let usersCopy;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_SELECTED_USER":
      usersCopy = state.users.map((user) => ({
        ...user,
        selected: action.payload === user.username,
      }));
      return {
        ...state,
        users: usersCopy,
      };
    case "SET_USER_MESSAGES":
      // action.payload --> { username: "", messages: [] }
      usersCopy = state.users.map((user) => {
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
        users: usersCopy,
      };
    case "ADD_MESSAGE":
      usersCopy = [...state.users];
      const userIndex = state.users.findIndex(
        (user) => user.username === action.payload.username
      );
      const updatedUser = {
        ...usersCopy[userIndex],
        messages: usersCopy[userIndex].messages
          ? [action.payload.message, ...usersCopy[userIndex].messages]
          : null,
        lastMessage: action.payload.message,
      };
      usersCopy[userIndex] = updatedUser;
      return {
        ...state,
        users: usersCopy,
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
