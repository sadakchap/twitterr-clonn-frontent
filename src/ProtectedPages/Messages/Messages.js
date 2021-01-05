import { Grid, makeStyles } from "@material-ui/core";
import Base from "../../components/Base/Base";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Users from "./Users";
import SelectedUserMessages from "./SelectedUserMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    overflow: "hidden",
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
}));

const Messages = () => {
  const classes = useStyles();

  const [selectedUser, setSelectedUser] = useState(null);

  const [
    getMessagesFrom,
    { loading: messagesLoading, data: { getMessages } = {} },
  ] = useLazyQuery(FETCH_MESSAGES_FROM);

  useEffect(() => {
    if (selectedUser) {
      getMessagesFrom({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessagesFrom]);

  return (
    <Base>
      {(_) => (
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={5} md={4}>
            <Users setSelectedUser={setSelectedUser} />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <SelectedUserMessages
              messagesLoading={messagesLoading}
              getMessages={getMessages}
            />
          </Grid>
        </Grid>
      )}
    </Base>
  );
};

export default Messages;

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
