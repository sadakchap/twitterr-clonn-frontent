import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: `${theme.spacing(2)}px`,
    margin: `${theme.spacing(1)}px 0`,
    textTransform: "capitalize",
  },
}));

const MyButton = (props) => {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root}>
      {props.children}
    </Button>
  );
};

export default MyButton;
