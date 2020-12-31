import { gql, useMutation } from "@apollo/client";
import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
    minHeight: 60,
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
  commentBody: { margin: "8px 4px" },
}));

const Comment = (props) => {
  const {
    comment: { id, username, body, createdAt, name },
    postId,
  } = props;

  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    onError: (err) => {},
    variables: {
      postId,
      commentId: id,
    },
  });

  return (
    <div className={classes.root}>
      {loading ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container justify="space-between" alignItems="flex-start">
            <Grid item className={classes.headerText}>
              <span className={classes.authorName}>{name}</span>
              <Typography
                variant="caption"
                component="span"
                color="textSecondary"
              >
                @{username} &#183; {moment(new Date(createdAt)).fromNow(true)}
              </Typography>
            </Grid>
            <Grid item>
              {user && user.username === username && (
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={deleteComment}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <div className={classes.commentBody}>
            <DisplayTweetMsg body={body} />
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;

const DELETE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id
        body
        username
        createdAt
        name
      }
    }
  }
`;
