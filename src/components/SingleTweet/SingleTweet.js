import Base from "../../components/Base/Base";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import Tweet from "../Tweet/Tweet";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
  },
  content: {
    border: `1px solid ${theme.palette.grey[800]}`,
    maxWidth: 700,
    width: "100%",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: `${theme.palette.background.default}`,
    borderBottom: `1px solid ${theme.palette.grey[800]}`,
  },
  headerAvatar: {
    cursor: "pointer",
  },
  headerTitle: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  exploreSection: {
    width: "60%",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolBar: theme.mixins.toolbar,
}));

const SingleTweet = (props) => {
  const classes = useStyles();
  console.log(props.location.state.data);

  return (
    <Base>
      {(handleDrawerToggle) => (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.header}>
              <IconButton color="primary" onClick={props.history.goBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="h6"
                className={classes.headerTitle}
              >
                Tweet
              </Typography>
            </div>

            <div className={classes.latestTweets}>
              <Tweet
                tweet={props.location.state.data.tweet}
                allowCardHover={false}
              />
            </div>
          </div>
          <div className={classes.exploreSection}>
            <ExploreSection />
          </div>
        </div>
      )}
    </Base>
  );
};

export default SingleTweet;
