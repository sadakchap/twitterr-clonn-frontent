import { Button, CardActions, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoopIcon from "@material-ui/icons/Loop";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "../../contexts/auth";
import LikeButton from "../LikeButton/LikeButton";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.text.hint}`,
    paddingLeft: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
}));

const TweetActions = (props) => {
  const classes = useStyles();
  let location = useLocation();
  const {
    tweet: { id, likes, likesCount, comments, commentsCount },
    viewTweet = true,
  } = props;
  const {
    authenticated,
    user: { data: authUserData },
  } = useAuthState();

  const userCommentExists = !authenticated
    ? false
    : comments.findIndex(
        (comment) => comment.username === authUserData.username
      ) > -1;

  return (
    <CardActions className={classes.root}>
      <Button
        size="small"
        color={userCommentExists ? "primary" : "inherit"}
        startIcon={
          userCommentExists ? (
            <ChatBubbleIcon color="primary" />
          ) : (
            <ChatBubbleOutlineIcon />
          )
        }
        component={Link}
        to={{
          pathname: `/tweet/comment/${id}`,
          state: { background: location },
        }}
      >
        {commentsCount}
      </Button>
      <Button size="small" color="inherit" startIcon={<LoopIcon />}>
        {1.3}K
      </Button>
      <LikeButton tweet={{ id, likes, likesCount }} />
      {viewTweet && (
        <Button
          size="small"
          color="inherit"
          startIcon={<VisibilityOutlinedIcon fontSize="small" />}
          component={Link}
          to={{
            pathname: `/tweet/${id}`,
            state: { data: props },
          }}
          style={{ textTransform: "capitalize" }}
        >
          View
        </Button>
      )}
    </CardActions>
  );
};

export default TweetActions;
