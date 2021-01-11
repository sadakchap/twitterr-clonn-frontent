import { gql, useLazyQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
  },
  formWrapper: {
    marginTop: `${theme.spacing(2)}px`,
    maxWidth: 600,
  },
  formHeader: {
    width: "100%",
    textAlign: "center",
  },
  formBtn: {
    width: "100%",
    borderRadius: `${theme.spacing(3)}px`,
    margin: `${theme.spacing(1.5)}px 0`,
    textTransform: "capitalize",
    height: `44px`,
    "&.MuiButton-contained.Mui-disabled": {
      backgroundColor: "#19608e",
    },
    "& .MuiButton-label": {
      fontWeight: 700,
    },
  },
  snackBar: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
  },
  textLink: {
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const { loading: loadingFromCache } = useAuthState();
  const location = useLocation();

  const [values, setValues] = useState({
    username: location.state?.username || "",
    password: location.state?.password || "",
    error: "",
  });

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER_QUERY, {
    onCompleted: (data) => {
      dispatch({
        type: "LOGIN",
        payload: { token: data.login.token },
      });

      dispatch({ type: "SET_LOADING", payload: false });
      window.location.href = "/home";
    },
    onError: (err) => {
      dispatch({ type: "SET_LOADING", payload: false });
      setValues({
        ...values,
        password: "",
        error:
          "The email and password you entered did not match our records. Please double-check and try again.",
      });
      setOpenSnackBar(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("Errors");
      return;
    }
    setValues({ ...values, error: "" });
    dispatch({ type: "SET_LOADING", payload: true });
    loginUser({ variables: values });
  };

  useEffect(() => {
    if (location.state?.fromHome) {
      loginUser({ variables: values });
    }
    // eslint-disable-next-line
  }, []);

  const { username, password, error } = values;

  return (
    <Container className={classes.root}>
      <div className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <TwitterIcon style={{ fontSize: "2.5rem", marginBottom: "16px" }} />
          <Typography variant="h6" component="h6" fontWeight={700} gutterBottom>
            Log in to Twitter
          </Typography>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="caption" component="div" color="secondary">
            {error}
          </Typography>
          <TextField
            id="username"
            label="Email or username"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={username}
            onChange={handleChange("username")}
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={password}
            onChange={handleChange("password")}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.formBtn}
            disabled={!username || !password}
          >
            {loadingFromCache || loading ? (
              <CircularProgress style={{ color: "#fff" }} size={25} />
            ) : (
              "Login"
            )}
          </Button>
          <div style={{ textAlign: "center" }}>
            <Typography variant="caption">
              <Link
                className={classes.textLink}
                to={{
                  pathname: `/i/flow/signup`,
                  state: { background: location },
                }}
              >
                Sign up for twitter-clonn
              </Link>
            </Typography>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={5000}
      >
        <Typography
          variant="caption"
          component="div"
          className={classes.snackBar}
        >
          {error}
        </Typography>
      </Snackbar>
    </Container>
  );
};

export default Login;

const LOGIN_USER_QUERY = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
      name
    }
  }
`;
