import { Button, Grid, Grow, makeStyles, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useRef, useState } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useAuthState } from "../../contexts/auth";
import { gql, useMutation } from "@apollo/client";
import { FETCH_TWEETS_QUERY } from "../../utils/graphql";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

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
  const {
    authenticated,
    user: { data: authUserData },
  } = useAuthState();
  const [openDropDown, setOpenDropDown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpenDropDown);
  const { postId, username, createdAt, name } = props;

  const [deleteTweet] = useMutation(DELETE_TWEET_MUTATION, {
    update: (proxy, result) => {
      const data = proxy.readQuery({
        query: FETCH_TWEETS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_TWEETS_QUERY,
        data: {
          getPosts: data.getPosts.filter((tweet) => tweet.id !== postId),
        },
      });
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
          <span className={classes.authorName}>{name}</span>
          <Typography variant="caption" component="span" color="textSecondary">
            @{username} &#183; {moment(parseInt(createdAt)).fromNow(true)}
          </Typography>
        </Grid>
        {authenticated && authUserData.username === username && (
          <Grid item>
            <div className={classes.moreIconDiv} ref={wrapperRef}>
              <MoreHorizIcon
                onClick={() => setOpenDropDown((prev) => !prev)}
                style={{ color: "#ffffff80" }}
              />
              {openDropDown ? (
                <Grow in={openDropDown} timeout={400}>
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
                </Grow>
              ) : null}
            </div>
          </Grid>
        )}
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
