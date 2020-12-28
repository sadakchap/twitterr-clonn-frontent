import { useState } from "react";
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { EditorState, convertToRaw } from "draft-js";
import { gql, useMutation } from "@apollo/client";
import TweetEditor from "../TweetEditor/TweetEditor";
import MyButton from "../MyButton/MyButton";
import { FETCH_TWEETS_QUERY } from "../../utils/graphql";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.text.disabled}`,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
  },
  rootMobile: {
    border: "none",
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

const CreateTweet = ({
  showAsModal = false,
  placeHolderText = "What's Happening",
}) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory();

  const [createTweet, { loading }] = useMutation(CREATE_TWEET_MUTATION, {
    update: (proxy, result) => {
      const data = proxy.readQuery({
        query: FETCH_TWEETS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_TWEETS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      setEditorState(EditorState.createEmpty());
      showAsModal && history.push("/home");
    },
    variables: {
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    },
  });

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    if (editorState.getCurrentContent().hasText()) {
      createTweet();
    }
  };

  return (
    <Paper
      className={
        showAsModal ? `${classes.rootMobile} ${classes.root}` : classes.root
      }
    >
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
              placeHolderText={placeHolderText}
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
