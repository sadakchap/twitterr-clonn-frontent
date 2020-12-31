import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    color: `${theme.palette.primary.main}`,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const MentionComponent = (props) => {
  const {
    mention: { username, link },
  } = props;
  const classes = useStyles();

  return (
    <Link to={link} spellCheck="false" className={classes.root}>
      <span>{`@${username}`}</span>
      <span style={{ display: "none" }}>{props.children}</span>
    </Link>
  );
};

export default MentionComponent;
