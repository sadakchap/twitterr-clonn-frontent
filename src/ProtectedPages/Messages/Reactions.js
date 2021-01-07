import { IconButton, makeStyles, Popover } from "@material-ui/core";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: `0 ${theme.spacing(1)}px`,
    borderRadius: "1.5rem",
    height: "35px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  iconButton: {
    fontSize: "1rem",
    transition: "0.25s",
    padding: "0",
    paddingLeft: "4px",
    "&:hover": {
      fontSize: "1.4rem",
      backgroundColor: "transparent",
    },
  },
  smileyBtn: {
    color: `${theme.palette.text.secondary}`,
    "&:hover": {
      color: `${theme.palette.text.primary}`,
    },
  },
}));

const reactions = ["❤️", "😍", "😢", "👍", "👎", "😲", "😡", "😂"];

const Reactions = ({ message }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [sendReaction] = useMutation(SEND_REACTION_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      handleClose();
    },
    onError: (err) => console.log(err),
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReactionClick = (reaction) => {
    console.log(`Reacting ${reaction} to message ${message.id}`);
    sendReaction({ variables: { messageId: message.id, content: reaction } });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        size="small"
        onClick={handleClick}
        className={classes.smileyBtn}
      >
        <SentimentSatisfiedOutlinedIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        classes={{ paper: classes.popover }}
      >
        {reactions.map((reaction) => (
          <IconButton
            size="small"
            key={reaction}
            onClick={handleReactionClick.bind(this, reaction)}
            className={classes.iconButton}
          >
            {reaction}
          </IconButton>
        ))}
      </Popover>
    </div>
  );
};

export default Reactions;

const SEND_REACTION_MUTATION = gql`
  mutation($messageId: ID!, $content: String!) {
    reactToMessage(messageId: $messageId, content: $content) {
      id
      content
      createdAt
    }
  }
`;
