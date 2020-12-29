import { makeStyles } from "@material-ui/core";

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
    <a href={link} spellCheck="false" className={classes.root}>
      <span>{`@${username}`}</span>
      <span style={{ display: "none" }}>{props.children}</span>
    </a>
  );
};

export default MentionComponent;
