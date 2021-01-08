import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";
import { useMessageDispatch, useMessageState } from "../../contexts/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[700]}`,
    height: "100%",
    "& h3": {
      padding: `${theme.spacing(2)}px`,
      margin: 0,
      borderBottom: `1px solid ${theme.palette.grey[700]}`,
    },
    "& ul.MuiList-root": {
      padding: 0,
    },
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const { loading } = useQuery(FETCH_USER_QUERY, {
    onCompleted: (result) => {
      dispatch({
        type: "SET_USERS",
        payload: result.getUsers,
      });
    },
    onError: () => {},
  });

  return (
    <div className={classes.root}>
      <h3>Messages</h3>
      <div className="">
        {loading && <Spinner />}
        {users && users.length > 0 && (
          <List>
            {users.map((user) => (
              <ListItem
                button
                key={user.id}
                selected={!!user.selected}
                className={`${classes.borderBottom} ${classes.centerItems}`}
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_USER",
                    payload: user.username,
                  })
                }
              >
                <ListItemAvatar className={classes.centerItems}>
                  <Avatar src={user.profile_pic} />
                </ListItemAvatar>
                <Hidden only="sm">
                  <ListItemText>
                    <Typography variant="subtitle2" component="span">
                      {user.name}{" "}
                      <Typography
                        variant="caption"
                        component="span"
                        color="textSecondary"
                      >{`@${user.username}`}</Typography>
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      color="textSecondary"
                    >
                      {user.lastMessage
                        ? user.lastMessage.content
                        : "You are connected now!"}
                    </Typography>
                  </ListItemText>
                </Hidden>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default Users;

const FETCH_USER_QUERY = gql`
  query {
    getUsers {
      id
      name
      username
      profile_pic
      lastMessage {
        id
        content
        to
        from
        createdAt
      }
    }
  }
`;
