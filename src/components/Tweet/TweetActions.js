import { Button, CardActions, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoopIcon from "@material-ui/icons/Loop";
import LikeButton from "../LikeButton/LikeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.text.hint}`,
    paddingLeft: 0,
  },
}));

const TweetActions = (props) => {
  const classes = useStyles();
  const {
    tweet: { id, likes, likesCount, comments, commentsCount },
  } = props;

  return (
    <CardActions className={classes.root}>
      <Button
        size="small"
        color="inherit"
        startIcon={<ChatBubbleOutlineIcon />}
      >
        {commentsCount}
      </Button>
      <Button size="small" color="inherit" startIcon={<LoopIcon />}>
        {1.3}K
      </Button>
      <LikeButton tweet={{ id, likes, likesCount }} />
    </CardActions>
  );
};

export default TweetActions;
