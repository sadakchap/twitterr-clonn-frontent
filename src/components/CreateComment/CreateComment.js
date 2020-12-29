import { useContext, useState } from "react";
import { Avatar, CircularProgress, makeStyles, Paper } from "@material-ui/core";
import { EditorState, convertToRaw } from "draft-js";
import { gql, useMutation } from "@apollo/client";
import TweetEditor from "../TweetEditor/TweetEditor";
import MyButton from "../MyButton/MyButton";
import { AuthContext } from "../../contexts/auth";

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

const CreateComment = ({ postId, setRedirectUser = (f) => f }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { user } = useContext(AuthContext);

  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update: (_, __) => {
      setRedirectUser((redirect) => !redirect);
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
            <Avatar src={user.profile_pic} />
          </div>
          <div className={classes.tweetFormSection}>
            <TweetEditor
              editorState={editorState}
              setEditorState={setEditorState}
              placeHolderText={"Tweet your reply..."}
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
