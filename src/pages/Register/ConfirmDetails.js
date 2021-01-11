import {
  Button,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  infoLink: {
    "& a": {
      color: `${theme.palette.primary.main}`,
    },
  },
  signupBtn: {
    width: "100%",
    color: "#fff",
    borderRadius: "1.2rem",
    textTransform: "capitalize",
    height: "40px",
    margin: "24px 0 0",
  },
  modalHeader: {
    padding: `${theme.spacing(2)}px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBody: {
    padding: `${theme.spacing(2)}px`,
  },
  actionButton: {
    borderRadius: "1.2rem",
    color: "#fff",
    textTransform: "initial",
    "&:disabled": {
      color: `${theme.palette.text.secondary} !important`,
    },
  },
}));

const ConfirmDetails = ({
  fields,
  inputFocus = (f) => f,
  nextStep = (f) => f,
  prevStep = (f) => f,
}) => {
  const { name, email, date } = fields;

  const classes = useStyles();

  return (
    <>
      <div className={classes.modalHeader}>
        <IconButton color="primary" onClick={prevStep}>
          <ArrowBackIcon />
        </IconButton>
        <TwitterIcon />
        <div className=""></div>
      </div>
      <div className={classes.modalBody}>
        <div style={{ marginTop: "8px", width: "100%" }}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            style={{ marginLeft: "8px" }}
          >
            Create your account
          </Typography>

          <TextField
            id="nameConfirm"
            label="Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onClick={inputFocus("name")}
          />
          <br />
          <TextField
            id="emailConfirm"
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onClick={inputFocus("email")}
          />
          <br />
          <TextField
            id="email"
            label="Birth Date"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Sep 15, 2003"
            value={new Date(date).toLocaleDateString()}
            onClick={inputFocus("date")}
          />

          <div className={classes.toolbar}></div>

          <Typography
            variant="caption"
            component="div"
            className={classes.infoLink}
            gutterBottom
          >
            By signing up, you agree to the{" "}
            <Link to="https://twitter.com/en/tos#new">Terms of Service</Link>{" "}
            and <Link to="https://twitter.com/en/privacy">Privacy Policy</Link>,
            including{" "}
            <Link to="https://help.twitter.com/en/rules-and-policies/twitter-cookies">
              Cookie Use
            </Link>
            . Others will be able to find you by email or phone number when
            provided ·<Link to="#!">Privacy Options</Link>
          </Typography>

          <div className="">
            <Button
              variant="contained"
              color="primary"
              className={classes.signupBtn}
              onClick={nextStep}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDetails;
