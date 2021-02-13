import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "relative",
    top: "5%",
    margin: "0 auto",
    maxWidth: 600,
    width: "100%",
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - 60px)`,
    borderRadius: "16px",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      width: "100%",
      height: "100vh",
    },
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
  dateWrapper: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& label.MuiInputLabel-outlined": {
      transform: `translate(14px, -6px) scale(0.75)`,
      background: `${theme.palette.background.default} !important`,
    },
  },
}));

const SignForm = (props) => {
  const classes = useStyles();
  const { name, email, currentFocus, date } = props.values;
  const { handleFieldChange, errors, handleDateChange, nextStep } = props;

  return (
    <>
      <div className={classes.modalHeader}>
        <div className=""></div>
        <TwitterIcon />
        <Button
          color="primary"
          variant="contained"
          className={classes.actionButton}
          onClick={nextStep}
          disabled={name === "" || email === "" || date === null}
        >
          Next
        </Button>
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
            id="name"
            label="Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={handleFieldChange("name")}
            error={!!errors.name}
            helperText={errors.name}
            autoFocus={currentFocus === "name"}
          />
          <br />
          <TextField
            id="email"
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={handleFieldChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            autoFocus={currentFocus === "email"}
          />

          <div className="" style={{ marginTop: "24px" }}>
            <Typography variant="subtitle2" fontWeight={500}>
              Date of birth
            </Typography>
            <Typography variant="caption" color="textSecondary">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </Typography>
          </div>
          <br />
          <div className={classes.dateWrapper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of Birth"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                inputVariant="outlined"
                autoFocus={currentFocus === "date"}
              />
            </MuiPickersUtilsProvider>
          </div>
          <p
            style={{
              color: "#aeb2b6",
              textAlign: "left",
              fontSize: "0.9rem",
              marginTop: "2em",
              lineHeight: "0.9rem",
              letterSpacing: "0.5px",
            }}
          >
            <small>
              <strong>Note:</strong> Please use a dummy email address, if you
              don't have one, you can get using{" "}
              <a
                style={{ color: "#1da1f2" }}
                href="https://temp-mail.org/en/"
                target="_blank"
                rel="noopener noreferrer"
              >
                tempmail.org
              </a>
            </small>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignForm;
