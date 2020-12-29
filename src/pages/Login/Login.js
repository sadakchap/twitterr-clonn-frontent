import { gql, useMutation } from "@apollo/client";
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
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

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
}));

const Login = (props) => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const [loginUser, { loading }] = useMutation(LOGIN_USER_QUERY, {
    update(_, result) {
      login(result.data.login);
      setValues({
        ...values,
        username: "",
        password: "",
      });
      props.history.push("/home");
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setValues({
        ...values,
        error:
          "The email and password you entered did not match our records. Please double-check and try again.",
      });
      setOpenSnackBar(true);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("Errors");
      return;
    }
    loginUser();
  };

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
            {loading ? (
              <CircularProgress style={{ color: "#fff" }} size={25} />
            ) : (
              "Login"
            )}
          </Button>
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
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      username
      token
      profile_pic
    }
  }
`;
