import { createContext, useContext, useReducer } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  let usersCopy, userIndex;
  let { username, message, messages, reaction } = action.payload;
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
        if (user.username === username) {
          return {
            ...user,
            messages: messages,
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
      userIndex = state.users.findIndex((user) => user.username === username);
      const updatedUser = {
        ...usersCopy[userIndex],
        messages: usersCopy[userIndex].messages
          ? [{ ...message, reactions: [] }, ...usersCopy[userIndex].messages]
          : null,
        lastMessage: { ...message, reactions: [] },
      };
      usersCopy[userIndex] = updatedUser;
      return {
        ...state,
        users: usersCopy,
      };

    case "NEW_REACTION":
      usersCopy = [...state.users];
      // find the user
      userIndex = state.users.findIndex((user) => user.username === username);
      // make its copy
      let userCopy = usersCopy[userIndex];
      // find the msg in user
      let msgIdx = userCopy.messages?.findIndex(
        (m) => m.id === reaction.message.id
      );

      if (msgIdx > -1) {
        // msg exists // get messages copy
        let messagesCopy = [...userCopy.messages];

        let reactionsCopy = [...messagesCopy[msgIdx].reactions];

        const reactionIdx = reactionsCopy.findIndex(
          (r) => r.id === reaction.id
        );
        if (reactionIdx > -1) {
          // exists
          reactionsCopy[reactionIdx] = reaction;
        } else {
          // add
          reactionsCopy = [...reactionsCopy, reaction];
        }

        messagesCopy[msgIdx] = {
          ...messagesCopy[msgIdx],
          reactions: reactionsCopy,
        };

        userCopy = {
          ...userCopy,
          messages: messagesCopy,
        };

        usersCopy[userIndex] = userCopy;
      }

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
