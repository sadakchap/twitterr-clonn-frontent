import { makeStyles, Tooltip, Typography } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import moment from "moment";

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

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);

  const sent = user.username === message.from;
  const classes = useStyles({ sent });
  const toolTipClasses = useStylesBootstrap();

  return (
    <div className={classes.root}>
      <Tooltip
        title={moment(new Date(message.createdAt)).format("MMM DD, hh:mm:s a")}
        arrow
        placement={sent ? "left" : "right"}
        classes={toolTipClasses}
      >
        <Typography className={classes.msgText} variant="body2">
          {message.content}
        </Typography>
      </Tooltip>
    </div>
  );
};

export default Message;
