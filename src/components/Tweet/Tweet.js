import { CardContent, Card, makeStyles, Fade } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import DisplayTweetMsg from "./DisplayTweetMsg";
import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    maxWidth: 600,
    width: "100%",
  },
  tweetProfilePic: {
    width: 50,
    paddingRight: "4px",
  },
  tweetContent: {
    width: `calc(100% - 50px)`,
  },
  tweetBody: {
    padding: `${theme.spacing(1)}px 0 0`,
  },
}));

const Tweet = (props) => {
  const {
    tweet: {
      id,
      username,
      createdAt,
      body,
      likesCount,
      commentsCount,
      likes,
      comments,
    },
    showActions = true,
  } = props;
  const classes = useStyles();

  return (
    <Fade in={true} timeout={500}>
      <Card variant="outlined" className={classes.root}>
        <div className={classes.tweetProfilePic}>
          <Skeleton variant="circle" width={45} height={45} />
        </div>
        <div className={classes.tweetContent}>
          <TweetHeader postId={id} username={username} createdAt={createdAt} />
          <CardContent className={classes.tweetBody}>
            <DisplayTweetMsg body={body} />
          </CardContent>
          {showActions && (
            <TweetActions
              tweet={{ id, likes, comments, likesCount, commentsCount }}
            />
          )}
        </div>
      </Card>
    </Fade>
  );
};

export default Tweet;
