import { Button, Grid, Grow, makeStyles, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useContext, useState } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { AuthContext } from "../../contexts/auth";
import { gql, useMutation } from "@apollo/client";

moment.updateLocale("en", {
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
  tweetCardHeader: {
    padding: `${theme.spacing(1)}px 0 0`,
  },
  authorName: {
    fontWeight: 700,
    display: "inline-block",
    marginRight: `4px`,
  },
  moreIconDiv: {
    position: "relative",
    "& svg": {
      cursor: "pointer",
    },
  },
  moreDropDown: {
    position: "absolute",
    top: "50%",
    right: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    transform: `translate(15%, 10%)`,
    backgroundColor: `${theme.palette.background.default}`,
    padding: `${theme.spacing(1)}px`,
    borderRadius: 2,
  },
}));

const TweetHeader = (props) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [openDropDown, setOpenDropDown] = useState(false);
  const { postId, username, createdAt } = props;

  const [deleteTweet] = useMutation(DELETE_TWEET_MUTATION, {
    update: (proxy, result) => {
      console.log(result);
    },
    onError: () => {},
    variables: {
      postId,
    },
  });

  const handleClick = () => {
    deleteTweet();
  };

  return (
    <div className={classes.tweetCardHeader}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item>
          <span className={classes.authorName}>{username}</span>
          <Typography variant="caption" component="span" color="textSecondary">
            @{username} &#183; {moment(parseInt(createdAt)).fromNow(true)}
          </Typography>
        </Grid>
        <Grid item>
          <div className={classes.moreIconDiv}>
            <MoreHorizIcon
              onClick={() => setOpenDropDown((prev) => !prev)}
              style={{ color: "#ffffff80" }}
            />
            {openDropDown ? (
              <Grow in={openDropDown} timeout={400}>
                {user && user.username === username ? (
                  <Button
                    className={classes.moreDropDown}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteOutlineIcon color="secondary" />}
                    onClick={handleClick}
                  >
                    Delete
                  </Button>
                ) : (
                  <Typography
                    variant="caption"
                    component="div"
                    className={classes.moreDropDown}
                  >
                    -
                  </Typography>
                )}
              </Grow>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TweetHeader;

const DELETE_TWEET_MUTATION = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
