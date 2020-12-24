import {
  CardContent,
  Card,
  Paper,
  makeStyles,
  CardHeader,
  IconButton,
  CardActions,
  Button,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import DisplayTweetMsg from "./DisplayTweetMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.text.secondary}`,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    // width: 345,
  },
  tweetCardWrapper: {
    width: "100%",
  },
}));

const Tweet = (props) => {
  const {
    tweet: { username, createdAt, body },
  } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.profilePicSection}>
        <Skeleton variant="circle" width={40} height={40} />
      </div>
      <div className={classes.tweetCardWrapper}>
        <Card variant="outlined">
          <CardHeader
            title={username}
            subheader={createdAt}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <DisplayTweetMsg body={body} />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              comment
            </Button>
            <Button size="small" color="primary">
              ReTweet
            </Button>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
    </Paper>
  );
};

export default Tweet;
