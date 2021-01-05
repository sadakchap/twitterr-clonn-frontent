import { makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    display: "flex",
    justifyContent: props.sent ? "flex-end" : "flex-start",
  }),
  msgText: (props) => ({
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    margin: `${theme.spacing(1)}px`,
    borderRadius: "1.5rem",
    background: props.sent
      ? `${theme.palette.primary.main}`
      : `${theme.palette.background.paper}`,
  }),
}));

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);

  const sent = user.username === message.from;
  const classes = useStyles({ sent });

  return (
    <div className={classes.root}>
      <Typography className={classes.msgText} variant="body2">
        {message.content}
      </Typography>
    </div>
  );
};

export default Message;
