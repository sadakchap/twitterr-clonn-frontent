import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import ProfileEditForm from "./ProfileEditForm";

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
    top: "10%",
    margin: "0 auto",
    maxWidth: 600,
    width: "100%",
    backgroundColor: theme.palette.background.default,
    borderRadius: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      width: "100%",
      height: "100vh",
      borderRadius: 0,
    },
  },
  modalHeader: {
    padding: `${theme.spacing(2)}px`,
    borderBottom: `1px solid #5b708366`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderText: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  modalBody: {
    padding: `${theme.spacing(2)}px`,
  },
  saveBtn: {
    color: "#fff",
    borderRadius: "1.5rem",
    textTransform: "initial",
  },
}));

const UserProfileEditModal = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modalHeader}>
          <Typography
            variant="h6"
            component="h6"
            className={classes.modalHeaderText}
          >
            <IconButton
              color="primary"
              onClick={() => props.history.goBack()}
              style={{ padding: "4px" }}
            >
              <CloseIcon />
            </IconButton>
            Edit Profile
          </Typography>
        </div>

        <div className={classes.modalBody}>
          <ProfileEditForm user={props.location.state.data} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfileEditModal);

// things to update ->
// profile_pic, background_pic
