import { useState } from "react";
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { EditorState, convertToRaw } from "draft-js";
import { gql, useMutation } from "@apollo/client";
import TweetEditor from "../TweetEditor/TweetEditor";
import MyButton from "../MyButton/MyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.text.disabled}`,
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

const CreateTweet = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [createTweet, { loading }] = useMutation(CREATE_TWEET_MUTATION, {
    update: (_, result) => {
      console.log(result);
      setEditorState(EditorState.createEmpty());
    },
    variables: {
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    },
  });

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    createTweet();
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
            />
            <div className={classes.tweetControlDiv}>
              <div className="">extra controls</div>
              <MyButton
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                onClick={handleSubmitBtn}
              >
                Tweet
              </MyButton>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
};

export default CreateTweet;

const CREATE_TWEET_MUTATION = gql`
  mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
    }
  }
`;
