import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  formWrapper: {
    marginTop: `${theme.spacing(2)}px`,
    maxWidth: 600,
  },
  form: {},
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
}));

const Login = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form");
  };

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const { username, password } = values;

  return (
    <Container className={classes.root}>
      <div className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <TwitterIcon style={{ fontSize: "2.5rem", marginBottom: "16px" }} />
          <Typography variant="h6" component="h6" fontWeight={700}>
            Log in to Twitter
          </Typography>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Phone, email or username"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={username}
            onChange={handleChange("username")}
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
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
