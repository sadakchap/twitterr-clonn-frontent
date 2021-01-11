import {
  CircularProgress,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import SignForm from "./SignForm";
import { validateEmail } from "../../utils/utils";
import Step2 from "./Step2";
import ConfirmDetails from "./ConfirmDetails";
import PasswordInput from "./PasswordInput";
import { gql, useMutation } from "@apollo/client";
import { useAuthDispatch } from "../../contexts/auth";

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
  snackBar: {
    backgroundColor: theme.palette.secondary.main,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
  },
}));

const SignUpModal = () => {
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
  const dispatch = useAuthDispatch();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const inputFocus = (input) => (e) => {
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

    setErrors({ ...errors, [name]: errorMsg, errorMsg });
  };

  const handleDateChange = (date) => {
    setFields({ ...fields, date });
  };

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    onCompleted: (data) => {
      dispatch({
        type: "LOGIN",
        payload: { token: data.register.token },
      });

      dispatch({ type: "SET_LOADING", payload: false });
      window.location.href = "/home";
    },
    onError: (err) => {
      dispatch({ type: "SET_LOADING", payload: false });
      setStep(1);
      setErrors({
        ...err.graphQLErrors[0].extensions.exception.errors,
        errorMsg: err.graphQLErrors[0].message,
      });
      setOpenSnackBar(true);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        ...fields,
        dob: new Date(fields.date).toISOString(),
      },
    });
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
          handleFormSubmit={handleFormSubmit}
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
        {!loading && modalContent}
        {loading && <CircularProgress />}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackBar}
          onClose={() => setOpenSnackBar(false)}
          autoHideDuration={2000}
        >
          <Typography
            variant="caption"
            component="div"
            className={classes.snackBar}
          >
            {errors.errorMsg}
          </Typography>
        </Snackbar>
      </div>
    </div>
  );
};

export default withRouter(SignUpModal);

const REGISTER_USER_MUTATION = gql`
  mutation($name: String!, $email: String!, $password: String!, $dob: String!) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        dob: $dob
      }
    ) {
      id
      username
      name
      token
      unreadNotifications
    }
  }
`;
