import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";

import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: `0 ${theme.spacing(2)}px`,
  },
  labelText: {
    fontWeight: "300",
    fontSize: "0.75rem",
    lineHeight: "1rem",
  },
  label: {
    marginLeft: 0,
  },
  empty: {
    margin: "30px 0",
  },
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
}));

const Step2 = ({ prevStep = (f) => f, nextStep = (f) => f }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.modalHeader}>
        <Button
          color="primary"
          variant="contained"
          className={classes.actionButton}
          onClick={prevStep}
        >
          Back
        </Button>
        <TwitterIcon />
        <Button
          color="primary"
          variant="contained"
          className={classes.actionButton}
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
      <div className={classes.modalBody}>
        <div style={{ marginTop: "8px", width: "100%" }}>
          <div className={classes.root}>
            <Typography variant="h6">Customize your experience</Typography>
            <div className={classes.empty}></div>
            <Typography variant="h6" gutterBottom>
              Track where you see Twitter content across the web
            </Typography>
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox name="checkedC" color="primary" defaultChecked />
              }
              label={
                <Typography variant="caption" className={classes.labelText}>
                  Twitter uses this data to personalize your experience. This
                  web browsing history will never be stored with your name,
                  email, or phone number.
                </Typography>
              }
              labelPlacement="start"
            />
            <div className={classes.empty}></div>
            <Typography variant="caption" color="textSecondary">
              For more details about these settings, visit the Help Center.
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
