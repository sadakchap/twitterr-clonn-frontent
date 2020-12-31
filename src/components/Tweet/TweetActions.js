import { Button, CardActions, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoopIcon from "@material-ui/icons/Loop";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import LikeButton from "../LikeButton/LikeButton";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.text.hint}`,
    paddingLeft: 0,
  },
}));

const TweetActions = (props) => {
  const classes = useStyles();
  let location = useLocation();
  const {
    tweet: { id, likes, likesCount, comments, commentsCount },
  } = props;
  const { user } = useContext(AuthContext);

  const userCommentExists =
    comments.findIndex((comment) => comment.username === user.username) > -1;

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
    </CardActions>
  );
};

export default TweetActions;
