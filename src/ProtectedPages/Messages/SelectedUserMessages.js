import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useMessageDispatch, useMessageState } from "../../contexts/messages";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  messagesDiv: {
    height: "calc(100vh - 56px)",
    flexWrap: "nowrap",
    overflowY: "auto",
    paddingBottom: `${theme.spacing(1)}px`,
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    gap: `${theme.spacing(1)}px`,
  },
  input: {
    border: "none",
    outline: "none",
    display: "block",
    width: "100%",
    background: `${theme.palette.background.paper}`,
    height: "40px",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: "1.5rem",
    color: `${theme.palette.text.primary}`,
  },
}));

const SelectedUserMessages = () => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();
  const classes = useStyles();
  const [msgContent, setMsgContent] = useState("");

  const selectedUser = users?.find((user) => user.selected);

  const [
    getMessagesFrom,
    { loading, data: { getMessages } = {} },
  ] = useLazyQuery(FETCH_MESSAGES_FROM);

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: (_) => {
      setMsgContent("");
    },
    onError: (err) => console.log(err),
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msgContent.trim() === "" || !selectedUser) {
      return;
    }
    sendMessage({
      variables: {
        to: selectedUser.username,
        content: msgContent,
      },
    });
  };

  return (
    <>
      <Grid
        container
        direction="column-reverse"
        className={classes.messagesDiv}
      >
        {!selectedUser && (
          <Typography align="center" variant="caption" color="textSecondary">
            Select a friend!
          </Typography>
        )}
        {loading && <Spinner />}

        {selectedUser &&
          selectedUser.messages &&
          selectedUser.messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        {selectedUser &&
          selectedUser.messages &&
          selectedUser.messages.length === 0 && (
            <Typography align="center" variant="caption" color="textSecondary">
              You are connected now! Start by saying Hi!
            </Typography>
          )}
      </Grid>

      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type Message..."
            className={classes.input}
            value={msgContent}
            onChange={(e) => setMsgContent(e.target.value)}
          />
          <IconButton color="primary" role="button" type="submit">
            <SendIcon />
          </IconButton>
        </form>
      </div>
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
      reactions {
        id
        content
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      content
      to
      from
      createdAt
    }
  }
`;
