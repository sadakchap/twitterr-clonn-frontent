import { Button, makeStyles, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import CreateTweet from "../CreateTweet/CreateTweet";

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
    borderRadius: "8px",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      width: "100%",
      height: "100vh",
    },
  },
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
}));

const CreateTweetModal = (props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      role="button"
      onClick={() => props.history.goBack()}
    >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modalHeader}>
          <Typography variant="h6" component="h6">
            Create Tweet
          </Typography>
          <Button variant="text" onClick={() => props.history.goBack()}>
            <CloseIcon color="disabled" />
          </Button>
        </div>
        <div className={classes.modalBody}>
          <div style={{ marginTop: "8px", width: "100%" }}>
            <CreateTweet showAsModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateTweetModal);
