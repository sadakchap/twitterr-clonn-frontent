import Base from "../../components/Base/Base";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import TweetHeader from "../Tweet/TweetHeader";
import DisplayTweetMsg from "../Tweet/DisplayTweetMsg";
import moment from "moment";
import TweetActions from "../Tweet/TweetActions";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: `${theme.palette.background.default}`,
    borderBottom: `1px solid ${theme.palette.grey[800]}`,
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
  tweetCard: {
    flexGrow: 1,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    width: "100%",
    border: "none",
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    backgroundColor: `${theme.palette.background.default}`,
  },
  tweetProfilePic: {
    width: 50,
    paddingRight: "4px",
  },
  tweetContent: {
    width: `calc(100% - 50px)`,
    "& .MuiCardContent-root": {
      padding: `${theme.spacing(1)}px 0`,
    },
  },
  tweetBody: {
    padding: `${theme.spacing(1)}px 0 0 !important`,
  },
  tweetStatus: {
    display: "flex",
    gap: "16px",
    padding: `${theme.spacing(1)}px 0`,
    "& div span": {
      fontWeight: 700,
      color: "#fff",
      fontSize: "0.9rem",
    },
    "& div": {
      color: `${theme.palette.text.disabled}`,
    },
  },
}));

const SingleTweet = (props) => {
  const classes = useStyles();
  const { tweetId } = useParams();

  const {
    loading,
    data: {
      getPost: {
        id,
        username,
        createdAt,
        commentsCount,
        likesCount,
        body,
        comments,
        likes,
        author: { name, profile_pic } = {},
      } = {},
    } = {},
  } = useQuery(FETCH_SINGLE_TWEET_QUERY, {
    variables: { postId: tweetId },
  });

  return (
    <Base>
      {(handleDrawerToggle) => (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.header}>
              <IconButton color="primary" onClick={props.history.goBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="h6"
                className={classes.headerTitle}
              >
                Tweet
              </Typography>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div className={classes.tweetCardBox}>
                <Card variant="outlined" className={classes.tweetCard}>
                  <div className={classes.tweetProfilePic}>
                    <Avatar src={profile_pic} alt={username} />
                  </div>
                  <div className={classes.tweetContent}>
                    <TweetHeader
                      postId={id}
                      name={name}
                      username={username}
                      createdAt={createdAt}
                    />
                    <CardContent className={classes.tweetBody}>
                      <DisplayTweetMsg body={body} />
                    </CardContent>
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        variant="caption"
                        component="div"
                        style={{ margin: "8px 0" }}
                      >
                        {moment(new Date(parseInt(createdAt))).format(
                          "h:mm A . MMM Do, YYYY"
                        )}
                      </Typography>
                      <Divider />
                      <div className={classes.tweetStatus}>
                        <div className="">
                          <span>{likesCount}</span>{" "}
                          {likesCount === 1 ? "Like" : "Likes"}
                        </div>
                        <div className="">
                          <span> {commentsCount}</span> Quote{" "}
                          {commentsCount === 1 ? "Tweet" : "Tweets"}
                        </div>
                      </div>
                      <Divider />
                    </CardContent>
                    <CardActions style={{ padding: 0 }}>
                      <TweetActions
                        tweet={{ id, likes, comments }}
                        viewTweet={false}
                      />
                    </CardActions>
                  </div>
                </Card>
                {/* Reply to tweets */}
              </div>
            )}
          </div>
          <div className={classes.exploreSection}>
            <ExploreSection />
          </div>
        </div>
      )}
    </Base>
  );
};

export default SingleTweet;

const FETCH_SINGLE_TWEET_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likesCount
      commentsCount
      likes {
        id
        username
      }
      comments {
        id
        body
        username
      }
      author {
        name
        profile_pic
      }
    }
  }
`;
