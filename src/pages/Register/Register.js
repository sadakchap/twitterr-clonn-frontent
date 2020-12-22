import { Backdrop, makeStyles } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useState } from "react";
import MyButton from "../../components/MyButton/MyButton";
import { getNumberOfDays } from "../../utils/utils";
import SignForm from "./SignForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.default,
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    padding: theme.spacing(2),
    borderRadius: `${theme.spacing(2)}px`,
    height: `calc(100vh - 60px)`,
  },
  backdrop: {
    backgroundColor: "#5b708366",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  modalHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalForm: {
    padding: `${theme.spacing(2)}px`,
  },
}));

const Register = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    step: 1,
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
    code: "",
    numberOfDays: 31,
  });

  const nextStep = () => setValues({ ...values, step: step + 1 });
  const prevStep = () => setValues({ ...values, step: step - 1 });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleMonthOrYearChange = (name) => (e) => {
    let days = 31;

    const updatedValue = e.target.value;
    days =
      name === "month"
        ? getNumberOfDays(parseInt(updatedValue), year)
        : getNumberOfDays(parseInt(month), updatedValue);

    return setValues({
      ...values,
      [name]: updatedValue,
      numberOfDays: days,
    });
  };

  const activeContent = () => {
    switch (step) {
      case 1:
        return (
          <SignForm
            values={values}
            handleChange={handleChange}
            handleMonthOrYearChange={handleMonthOrYearChange}
          />
        );
      case 2:
        return <h1>customize twitter</h1>;
      case 3:
        return <h1>sign up here</h1>;
      case 4:
        return <h1>We sent a code</h1>;
      case 5:
        return <h1>You'll need a password</h1>;
      default:
        return <h1>This is default case!</h1>;
    }
  };

  const { step, month, year } = values;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <div className={classes.paper}>
          <div className={classes.modalHeader}>
            <div className="">
              {step > 1 && (
                <MyButton
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={prevStep}
                >
                  Back
                </MyButton>
              )}
            </div>
            <TwitterIcon />
            <div className="">
              {step !== 5 && (
                <MyButton
                  variant="contained"
                  size="small"
                  color="primary"
                  // disabled
                  onClick={nextStep}
                >
                  Next
                </MyButton>
              )}
            </div>
          </div>
          <div className={classes.modalContent}>
            <form autoComplete="off" className={classes.root}>
              {activeContent()}
            </form>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default Register;
