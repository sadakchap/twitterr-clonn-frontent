import { Grid, makeStyles } from "@material-ui/core";
import Base from "../../components/Base/Base";
import Users from "./Users";
import SelectedUserMessages from "./SelectedUserMessages";
import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { MessageProvider, useMessageDispatch } from "../../contexts/messages";
import { useAuthState } from "../../contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "100vh",
    overflow: "hidden",
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
}));

const Messages = () => {
  const classes = useStyles();
  const {
    user: { data: authUserData },
  } = useAuthState();
  const messageDispatch = useMessageDispatch();
  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE_SUBSCRIPTION
  );

  const { data: reactionData, error: reactionError } = useSubscription(
    NEW_REACTION_SUBSCRIPTION
  );

  useEffect(() => {
    if (messageError) {
      console.log(messageError);
    }
    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        message.to === authUserData.username ? message.from : message.to;
      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
    // eslint-disable-next-line
  }, [messageData, messageError]);

  useEffect(() => {
    if (reactionError) {
      console.log(reactionError);
    }
    if (reactionData) {
      const message = reactionData.newReaction.message;
      const otherUser =
        message.to === authUserData.username ? message.from : message.to;
      messageDispatch({
        type: "NEW_REACTION",
        payload: {
          username: otherUser,
          reaction: reactionData.newReaction,
        },
      });
    }
    // eslint-disable-next-line
  }, [reactionData, reactionError]);

  return (
    <Base>
      {(_) => (
        <MessageProvider>
          <Grid container className={classes.root}>
            <Grid item xs={12} sm={2} md={4}>
              <Users />
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
              <SelectedUserMessages />
            </Grid>
          </Grid>
        </MessageProvider>
      )}
    </Base>
  );
};

export default Messages;

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    newMessage {
      id
      content
      from
      to
      createdAt
    }
  }
`;

const NEW_REACTION_SUBSCRIPTION = gql`
  subscription newReaction {
    newReaction {
      id
      content
      createdAt
      message {
        id
        to
        from
      }
    }
  }
`;
