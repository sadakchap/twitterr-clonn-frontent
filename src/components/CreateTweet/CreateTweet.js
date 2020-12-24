import { makeStyles, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import TweetEditor from "../TweetEditor/TweetEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.text.disabled}`,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
  },
  profilePicSection: {
    flex: 0.1,
  },
  tweetFormSection: {
    position: "relative",
    flex: 0.9,
    minHeight: "6em",
    cursor: "text",
  },
  tweetBtn: {
    margin: theme.spacing(1),
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

const CreateTweet = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.profilePicSection}>
        <Skeleton variant="circle" width={40} height={40} />
      </div>
      <div className={classes.tweetFormSection}>
        <TweetEditor />
      </div>
    </Paper>
  );
};

export default CreateTweet;
