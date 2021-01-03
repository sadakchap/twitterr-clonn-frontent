import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Base from "../../components/Base/Base";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../../components/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    overflow: "hidden",
  },
  messageListWrapper: {
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
  searchWrapper: {
    padding: `${theme.spacing(1)}px`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  searchInputDiv: {
    display: "flex",
    backgroundColor: `${theme.palette.background.paper}`,
    padding: `0 ${theme.spacing(2)}px`,
    borderRadius: `20px`,
    alignItems: "center",
    width: "100%",
    boxShadow: `0 0 2px rgba(237,237,237,.1)`,
  },
  searchInput: {
    height: "40px",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    color: "#fff",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
}));

const Messages = () => {
  const classes = useStyles();

  const { loading, data: { getUsers } = {} } = useQuery(FETCH_USER_QUERY);

  return (
    <Base>
      {(handleDrawerToggle) => (
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={5} md={4}>
            <div className={classes.messageListWrapper}>
              <h3>Messages</h3>
              <div className={classes.searchWrapper}>
                <div className={classes.searchInputDiv}>
                  <SearchOutlinedIcon color="disabled" />
                  <input
                    className={classes.searchInput}
                    type="text"
                    placeholder="Search for people"
                  />
                </div>
              </div>
              <div className="">
                {loading && <Spinner />}
                {getUsers && getUsers.length > 0 && (
                  <List>
                    {getUsers.map((user) => (
                      <ListItem
                        button
                        key={user.id}
                        className={classes.borderBottom}
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
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Paper>one Messsage box</Paper>
          </Grid>
        </Grid>
      )}
    </Base>
  );
};

export default Messages;

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
