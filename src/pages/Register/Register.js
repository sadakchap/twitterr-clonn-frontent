import { makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import SignForm from "./SignForm";
import { validateEmail } from "../../utils/utils";
import Step2 from "./Step2";
import ConfirmDetails from "./ConfirmDetails";
import PasswordInput from "./PasswordInput";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    zIndex: 999999,
    backgroundColor: "#5b708366",
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
}));

const SignUpModal = (props) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    date: null,
    currentFocus: "name",
  });
  const [errors, setErrors] = useState({});

  const inputFocus = (input) => (e) => {
    console.log("firring");
    setStep(1);
    setFields({ ...fields, currentFocus: input });
  };

  const handleFieldChange = (name) => (e) => {
    const updatedValue = e.target.value.trim();
    setFields({ ...fields, [name]: updatedValue });

    let errorMsg = "";
    if (name === "name" && updatedValue === "") {
      errorMsg = "what's your name?";
    }
    if (name === "email" && !validateEmail(updatedValue)) {
      errorMsg = "Please enter a valid address";
    }

    if (name === "password" && updatedValue.length < 8) {
      errorMsg =
        "Your password needs to be at least 8 characters. Please enter a longer one.";
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleDateChange = (date) => {
    setFields({ ...fields, date });
  };

  const prevStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  let modalContent;
  switch (step) {
    case 1:
      modalContent = (
        <SignForm
          values={fields}
          handleFieldChange={handleFieldChange}
          errors={errors}
          handleDateChange={handleDateChange}
          nextStep={nextStep}
        />
      );
      break;

    case 2:
      modalContent = <Step2 nextStep={nextStep} prevStep={prevStep} />;
      break;

    case 3:
      modalContent = (
        <ConfirmDetails
          fields={fields}
          inputFocus={inputFocus}
          nextStep={nextStep}
        />
      );
      break;

    case 4:
      modalContent = (
        <PasswordInput
          fields={fields}
          handleFieldChange={handleFieldChange}
          errors={errors}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div
      className={classes.root}
      role="button"
      // onClick={() => props.history.goBack()}
    >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  );
};

export default withRouter(SignUpModal);
