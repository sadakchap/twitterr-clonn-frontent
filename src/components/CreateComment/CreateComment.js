import { useState } from "react";
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { EditorState, convertToRaw } from "draft-js";
import { gql, useMutation } from "@apollo/client";
import TweetEditor from "../TweetEditor/TweetEditor";
import MyButton from "../MyButton/MyButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "none",
    padding: `${theme.spacing(2)}px`,
    display: "flex",
  },
  profilePicSection: {
    flex: 0.1,
  },
  tweetFormSection: {
    position: "relative",
    flex: 0.9,
    minHeight: "6em",
    cursor: "text",
  },
  tweetControlDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const CreateComment = ({ postId }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory();

  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: (_, result) => {
      console.log(result);
      history.push("/home");
    },
    onError: () => {},
    variables: {
      postId,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    },
  });

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    createComment();
  };

  return (
    <Paper className={classes.root}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <div className={classes.profilePicSection}>
            <Skeleton variant="circle" width={40} height={40} />
          </div>
          <div className={classes.tweetFormSection}>
            <TweetEditor
              editorState={editorState}
              setEditorState={setEditorState}
              placeHolderText={"Reply to tweet..."}
            />
            <div className={classes.tweetControlDiv}>
              <div className=""></div>
              <MyButton
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                onClick={handleSubmitBtn}
                disabled={!editorState.getCurrentContent().hasText()}
              >
                Reply
              </MyButton>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
};

export default CreateComment;

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
    }
  }
`;
