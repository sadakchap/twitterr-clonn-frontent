import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import DisplayTweetMsg from "../Tweet/DisplayTweetMsg";
import moment from "moment";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  authorName: {
    fontWeight: 700,
    display: "inline-block",
    marginRight: `4px`,
    fontSize: "1.1rem",
    textTransform: "capitalize",
  },
  headerText: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));

const Comment = (props) => {
  const {
    comment: { username, body, createdAt, name },
  } = props;

  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item className={classes.headerText}>
          <span className={classes.authorName}>{name}</span>
          <Typography variant="caption" component="span" color="textSecondary">
            @{username} &#183; {moment(new Date(createdAt)).fromNow(true)}
          </Typography>
        </Grid>
        <Grid item>
          {user && user.username === username && (
            <IconButton size="small" color="secondary">
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <div style={{ margin: "8px 4px" }}>
        <DisplayTweetMsg body={body} />
      </div>
    </div>
  );
};

export default Comment;
