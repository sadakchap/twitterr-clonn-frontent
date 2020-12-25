import { Button, CardActions, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoopIcon from "@material-ui/icons/Loop";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.text.hint}`,
    paddingLeft: 0,
  },
}));

const TweetActions = (props) => {
  const classes = useStyles();
  const { likesCount, commentsCount } = props;
  return (
    <CardActions className={classes.root}>
      <Button
        size="small"
        color="inherit"
        startIcon={<ChatBubbleOutlineIcon />}
      >
        {likesCount}
      </Button>
      <Button size="small" color="inherit" startIcon={<LoopIcon />}>
        {1.3}K
      </Button>
      <Button size="small" color="inherit" startIcon={<FavoriteBorderIcon />}>
        {commentsCount}
      </Button>
    </CardActions>
  );
};

export default TweetActions;
