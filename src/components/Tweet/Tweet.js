import { CardContent, Card, makeStyles, Fade, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DisplayTweetMsg from "./DisplayTweetMsg";
import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    width: "100%",
    border: "none",
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    backgroundColor: `${theme.palette.background.default}`,
  },
  rootHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${theme.palette.background.paper}`,
    },
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
      author: { name, profile_pic },
    },
    showActions = true,
    allowCardHover = true,
  } = props;
  const classes = useStyles();

  return (
    <Fade
      in={true}
      timeout={500}
      style={{
        transition: `opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 0.2s`,
      }}
    >
      <Card
        variant="outlined"
        className={
          allowCardHover ? `${classes.root} ${classes.rootHover}` : classes.root
        }
      >
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
