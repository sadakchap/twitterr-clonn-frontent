import {
  Box,
  Grid,
  Hidden,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Footer from "../../components/Footer/Footer";
import MyButton from "../../components/MyButton/MyButton";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row-reverse",
    },
  },
  gridItem: {
    width: " 100%",
    position: "relative",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px)",
    },
    overflow: "hidden",
  },
  quickLoginFormWrapper: {
    position: "absolute",
    width: "100%",
    height: "80px",
    top: 0,
    left: 0,
  },
  loginForm: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    gap: `${theme.spacing(1)}px`,
    justifyContent: "center",
    alignItems: "center",
  },
  innerGridItem: {
    maxWidth: "400px",
    width: "100%",
    padding: `${theme.spacing(2)}px`,
  },
  msgBoxWrapper: {
    width: "100%",
    height: "100%",
    padding: `${theme.spacing(2)}px`,
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.light}`,
    overflow: "hidden",
    position: "relative",
  },
  msgBox: {
    zIndex: 1,
  },
  msgHeading: {
    display: "flex",
    justifyItems: "flex-start",
    alignItems: "center",
    marginBottom: `${theme.spacing(3)}px`,
    "& h6": {
      marginLeft: `${theme.spacing(2)}px`,
    },
    "& svg": {
      fontSize: "2rem",
    },
  },
  bgIcon: {
    color: `${theme.palette.primary.main}`,
    position: "absolute",
    fontSize: "160vh",
    height: "160vh",
    top: "-30vh",
    right: "-50vh",
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      top: "-15vh",
      right: "-18vh",
      height: "70vh",
      fontSize: "70vh",
    },
  },
  buttonGrp: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    gap: `${theme.spacing(3)}px`,
    padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  return user ? (
    <Redirect to="/home" />
  ) : (
    <Box className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid
          item
          container
          sm={6}
          className={classes.gridItem}
          alignItems="center"
        >
          <Hidden smDown>
            <Grid item className={classes.quickLoginFormWrapper}>
              <form noValidate autoComplete="off" className={classes.loginForm}>
                <TextField
                  id="filled-username"
                  label="Phone, email or username"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                <TextField
                  id="filled-password"
                  label="Password"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                <MyButton variant="outlined" color="primary">
                  Log in
                </MyButton>
              </form>
            </Grid>
          </Hidden>
          <Grid item xs={12} className={classes.innerGridItem}>
            <TwitterIcon style={{ fontSize: "2.5rem" }} />
            <Typography variant="h4" component="h4" gutterBottom>
              See what’s happening in the world right now
            </Typography>
            <br /> <br />
            <Typography variant="subtitle1">Join Twitter today.</Typography>
            <div>
              <MyButton
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                href="/i/flow/signup"
              >
                Sign Up
              </MyButton>
              <MyButton
                color="primary"
                variant="outlined"
                disableElevation
                fullWidth
                href="/login"
              >
                Log In
              </MyButton>
            </div>
          </Grid>
        </Grid>
        <Grid item sm={6} className={classes.gridItem}>
          <TwitterIcon className={classes.bgIcon} />
          <Grid
            container
            className={classes.msgBoxWrapper}
            alignItems="center"
            alignContent="center"
          >
            <Grid item className={classes.msgBox}>
              <div className={classes.msgHeading}>
                <SearchIcon />
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight="fontWeightBold"
                >
                  Follow your interests.
                </Typography>
              </div>
              <div className={classes.msgHeading}>
                <PeopleIcon />
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight="fontWeightBold"
                >
                  Hear what people are talking about.
                </Typography>
              </div>
              <div className={classes.msgHeading}>
                <ChatBubbleOutlineIcon />
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight="fontWeightBold"
                >
                  Join the conversation.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smUp>
          <Grid item className={classes.gridItem}>
            <div className={classes.buttonGrp}>
              <MyButton
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                href="/i/flow/signup"
              >
                Sign Up
              </MyButton>
              <MyButton
                color="primary"
                variant="outlined"
                disableElevation
                fullWidth
                href="/login"
              >
                Log In
              </MyButton>
            </div>
          </Grid>
        </Hidden>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Home;
