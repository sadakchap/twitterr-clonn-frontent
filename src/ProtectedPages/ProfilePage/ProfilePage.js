import Base from "../../components/Base/Base";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import UserExtraInfo from "./UserExtraInfo";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { FETCH_USER_QUERY } from "../../utils/graphql";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Tweet from "../../components/Tweet/Tweet";

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
    padding: `${theme.spacing(2)}px`,
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
  imageSection: {
    position: "relative",
    height: 200,
    backgroundColor: `#465869`,
  },
  avatar: {
    position: "absolute",
    left: "20px",
    bottom: "-35%",
    width: 150,
    height: 150,
    border: `5px solid ${theme.palette.background.default}`,
  },
  editBtn: {
    position: "absolute",
    right: 10,
    bottom: -50,
    borderRadius: "1.5rem",
    textTransform: "capitalize",
  },
  userInfo: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  headingText: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const { loading, data: { getUser } = {} } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });

  return (
    <Base>
      {(handleDrawerToggle) => (
        <div className={classes.root}>
          {loading ? (
            <CircularProgress />
          ) : (
            <div className={classes.content}>
              <div className={classes.header}>
                <IconButton color="primary" onClick={history.goBack}>
                  <ArrowBackOutlinedIcon />
                </IconButton>
                <div className={classes.headerTitle}>
                  <Typography variant="h6" component="h6">
                    {getUser.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getUser.postsCount} Tweets
                  </Typography>
                </div>
              </div>
              <div className={classes.imageSection}>
                <Avatar src={getUser.profile_pic} className={classes.avatar} />
                {user.id === getUser.id && (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.editBtn}
                    component={Link}
                    to={{
                      pathname: "/settings/profile",
                      state: {
                        background: location,
                        data: {
                          name: getUser.name,
                          profile_pic: getUser.profile_pic,
                          background_pic: getUser.background_pic,
                          bio: getUser.bio,
                          location: getUser.location,
                          website: getUser.website,
                          username: getUser.username,
                        },
                      },
                    }}
                    data={getUser}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              <div className={classes.toolBar}></div>
              <div className={classes.userInfo}>
                <Typography variant="h6">{getUser.name}</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  @{getUser.username}
                </Typography>
                <Typography variant="caption" component="div" gutterBottom>
                  {getUser.bio}
                </Typography>
                {/* extra user info */}
                <UserExtraInfo
                  location={getUser.location}
                  website={getUser.website}
                  dob={getUser.dob}
                  createdAt={getUser.createdAt}
                />
              </div>
              {/* User activity tabs */}
              <div className="">
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.headingText}
                >
                  My Tweets
                </Typography>
                {getUser.posts &&
                  getUser.posts.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      tweet={{
                        ...tweet,
                        author: {
                          name: getUser.name,
                          profile_pic: getUser.profile_pic,
                        },
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className={classes.exploreSection}>
            <ExploreSection />
          </div>
        </div>
      )}
    </Base>
  );
};

export default ProfilePage;
