import { makeStyles, Paper, Tooltip, Typography } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import moment from "moment";
import Reactions from "./Reactions";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    display: "flex",
    justifyContent: props.sent ? "flex-end" : "flex-start",
  }),
  msgText: (props) => ({
    position: "relative",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    margin: `${theme.spacing(1)}px`,
    borderRadius: "1.5rem",
    background: props.sent
      ? `${theme.palette.primary.main}`
      : `${theme.palette.background.paper}`,
  }),
  reactionPaper: {
    position: "absolute",
    right: "5px",
    bottom: "-5px",
    borderRadius: "1.5rem",
    padding: `1px 4px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
    border: `1px solid ${theme.palette.grey[700]}`,
  },
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
  const msgReactions = [...new Set(message.reactions.map((r) => r.content))];

  return (
    <div className={classes.root}>
      <div className="" style={{ display: "flex", alignItems: "center" }}>
        {sent && <Reactions message={message} />}
        <div style={{ position: "relative" }}>
          <Tooltip
            title={moment(new Date(message.createdAt)).format(
              "MMM DD, hh:mm:s a"
            )}
            arrow
            placement={sent ? "left" : "right"}
            classes={toolTipClasses}
          >
            <Typography className={classes.msgText} variant="body2">
              {message.content}
            </Typography>
          </Tooltip>
          {message.reactions.length > 0 && (
            <Paper className={classes.reactionPaper}>
              {msgReactions}{" "}
              <div style={{ fontWeight: 700, marginLeft: "3px" }}>
                {msgReactions.length}
              </div>
            </Paper>
          )}
        </div>

        {!sent && <Reactions message={message} />}
      </div>
    </div>
  );
};

export default Message;
