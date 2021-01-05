import { Grid, makeStyles } from "@material-ui/core";
import Base from "../../components/Base/Base";
import Users from "./Users";
import SelectedUserMessages from "./SelectedUserMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    overflow: "hidden",
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
}));

const Messages = () => {
  const classes = useStyles();

  return (
    <Base>
      {(_) => (
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={5} md={4}>
            <Users />
          </Grid>
          <Grid item xs={12} sm={7} md={8} container direction="column-reverse">
            <SelectedUserMessages />
          </Grid>
        </Grid>
      )}
    </Base>
  );
};

export default Messages;
