import Base from "../../components/Base/Base";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "../../contexts/auth";
import Spinner from "../../components/Spinner/Spinner";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
  },
  content: {
    border: `1px solid ${theme.palette.grey[800]}`,
    maxWidth: 700,
    width: "100%",
  },
  header: {
    padding: `${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    backgroundColor: `${theme.palette.background.default}`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    "& h6": {
      marginLeft: "8px",
    },
  },
  headerAvatar: {
    cursor: "pointer",
  },
  headerTitle: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  exploreSection: {
    width: "60%",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolBar: theme.mixins.toolbar,
  mainContent: {
    minHeight: "calc(100vh - 68px)",
  },
  listWrapper: {
    padding: 0,
    width: "100%",
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    padding: `${theme.spacing(2)}px`,
    "& .MuiAvatar-colorDefault": {
      backgroundColor: `${theme.palette.primary.main}`,
      color: "#fff",
    },
  },
}));

const NotificationPage = () => {
  const history = useHistory();
  const {
    user: {
      data: { notifications },
    },
    loading,
  } = useAuthState();

  const classes = useStyles();

  return (
    <Base>
      {(_) => (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.header}>
              <IconButton color="primary" onClick={history.goBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <Typography variant="h6" component="h6">
                Notifications
              </Typography>
            </div>

            <div className={classes.mainContent}>
              {loading && <Spinner />}
              {!loading && notifications?.length > 0 && (
                <List className={classes.listWrapper}>
                  {notifications.map((not) => (
                    <Link
                      to={not.link}
                      key={not.id}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem className={classes.listItem} button>
                        <ListItemAvatar>
                          <Avatar>
                            {not.verb === "liked" && <FavoriteIcon />}
                            {not.verb === "commented" && <CommentIcon />}
                            {not.verb === "tagged" && "@"}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              color={not.read ? "textSecondary" : "textPrimary"}
                              variant={not.read ? "body2" : "subtitle2"}
                            >
                              {not.message}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              )}
              {!loading && notifications?.length === 0 && (
                <Typography variant="subtitle2" color="textSecondary">
                  No notifications here!
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.exploreSection}>
            <ExploreSection />
          </div>
        </div>
      )}
    </Base>
  );
};

export default NotificationPage;
