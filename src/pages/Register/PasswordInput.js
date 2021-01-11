import {
  Button,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    padding: `${theme.spacing(2)}px`,
    borderBottom: `1px solid #5b708366`,
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

const PasswordInput = (props) => {
  const classes = useStyles();
  const { password } = props.fields;
  const { handleFieldChange, errors, handleFormSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);

  const revealPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={classes.modalHeader}>
        <div className=""></div>
        <TwitterIcon />
        <Button
          color="primary"
          variant="contained"
          className={classes.actionButton}
          disabled={password.trim().length < 8}
          onClick={handleFormSubmit}
        >
          Next
        </Button>
      </div>
      <div className={classes.modalBody}>
        <div style={{ marginTop: "8px", width: "100%" }}>
          <div>
            <Typography
              variant="h5"
              component="h5"
              gutterBottom
              style={{ marginLeft: "8px" }}
            >
              You'll need a password
            </Typography>
            <Typography
              variant="caption"
              component="div"
              gutterBottom
              color="textSecondary"
              style={{ marginLeft: "8px" }}
            >
              Make sure it’s 8 characters or more.
            </Typography>

            <TextField
              id="nameConfirm"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              error={!!errors.password}
              onChange={handleFieldChange("password")}
              helperText={
                <>
                  <Link onClick={revealPassword}>Reveal Password</Link>
                  <br />
                  {errors.password}
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
