import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";

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
}));

const Users = ({ setSelectedUser }) => {
  const classes = useStyles();
  const { loading, data: { getUsers } = {} } = useQuery(FETCH_USER_QUERY);

  return (
    <div className={classes.root}>
      <h3>Messages</h3>
      <div className="">
        {loading && <Spinner />}
        {getUsers && getUsers.length > 0 && (
          <List>
            {getUsers.map((user) => (
              <ListItem
                button
                key={user.id}
                className={classes.borderBottom}
                onClick={() => setSelectedUser(user.username)}
              >
                <ListItemAvatar>
                  <Avatar src={user.profile_pic} />
                </ListItemAvatar>
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
                    {user.lastMessage.content
                      ? user.lastMessage.content
                      : "You are connected now!"}
                  </Typography>
                </ListItemText>
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
