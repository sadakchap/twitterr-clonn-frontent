import Base from "../../components/Base/Base";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  CircularProgress,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Tweet from "../../components/Tweet/Tweet";
import { FETCH_TWEETS_QUERY } from "../../utils/graphql";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

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
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    alignItems: "center",
    backgroundColor: `${theme.palette.background.default}`,
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
}));

const Feed = () => {
  const classes = useStyles();
  const { data: { getPosts } = {}, loading } = useQuery(FETCH_TWEETS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Base>
      {(handleDrawerToggle) => (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.header}>
              <Hidden smUp>
                <Avatar
                  src={user.profile_pic}
                  className={classes.headerAvatar}
                  onClick={handleDrawerToggle}
                />
              </Hidden>
              <Typography
                variant="h6"
                component="h6"
                className={classes.headerTitle}
              >
                Home
              </Typography>
            </div>
            <CreateTweet />
            <div className={classes.latestTweets}>
              {loading ? (
                <CircularProgress color="primary" />
              ) : (
                getPosts &&
                getPosts.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
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

export default Feed;
