import { gql, useLazyQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useMessageDispatch, useMessageState } from "../../contexts/messages";
import Message from "./Message";

const SelectedUserMessages = () => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const selectedUser = users?.find((user) => user.selected);

  const [
    getMessagesFrom,
    { loading, data: { getMessages } = {} },
  ] = useLazyQuery(FETCH_MESSAGES_FROM);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessagesFrom({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser, getMessagesFrom]);

  useEffect(() => {
    // checking selectedUser for componentDidMount
    if (selectedUser && getMessages) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: getMessages,
        },
      });
    }
    // eslint-disable-next-line
  }, [getMessages]);

  return (
    <>
      {!selectedUser && "No chat selected!"}
      {loading && <Spinner />}

      {selectedUser &&
        selectedUser.messages &&
        selectedUser.messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      {selectedUser &&
        selectedUser.messages &&
        selectedUser.messages.length === 0 && (
          <Typography align="center">
            You are connected now! send a wave!
          </Typography>
        )}
    </>
  );
};

export default SelectedUserMessages;

const FETCH_MESSAGES_FROM = gql`
  query($from: String!) {
    getMessages(from: $from) {
      id
      content
      to
      from
      createdAt
    }
  }
`;
