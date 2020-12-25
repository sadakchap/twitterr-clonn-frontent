import {
  CardContent,
  Card,
  makeStyles,
  CardActions,
  Button,
  Typography,
  useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import DisplayTweetMsg from "./DisplayTweetMsg";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoopIcon from "@material-ui/icons/Loop";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a min",
    mm: "%d mins",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "a month",
    MM: "%d months",
    y: "ayr",
    yy: "%dyr",
  },
});

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
  tweetCardHeader: {
    padding: `${theme.spacing(1)}px 0 0`,
  },
  authorName: {
    fontWeight: 700,
    display: "inline-block",
    marginRight: `4px`,
  },
  tweetBody: {
    padding: `${theme.spacing(1)}px 0 0`,
  },
}));

const Tweet = (props) => {
  const {
    tweet: { username, createdAt, body, likesCount, commentsCount },
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card variant="outlined" className={classes.root}>
      <div className={classes.tweetProfilePic}>
        <Skeleton variant="circle" width={45} height={45} />
      </div>
      <div className={classes.tweetContent}>
        <div className={classes.tweetCardHeader}>
          <span className={classes.authorName}>{username}</span>
          <Typography variant="caption" component="span" color="textSecondary">
            @{username} &#183; {moment(parseInt(createdAt)).fromNow(true)}
          </Typography>
        </div>
        <CardContent className={classes.tweetBody}>
          <DisplayTweetMsg body={body} />
        </CardContent>
        <CardActions style={{ color: `${theme.palette.text.hint}` }}>
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
          <Button
            size="small"
            color="inherit"
            startIcon={<FavoriteBorderIcon />}
          >
            {commentsCount}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default Tweet;
