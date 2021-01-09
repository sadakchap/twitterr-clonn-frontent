import { useState } from "react";
import { Avatar, CircularProgress, makeStyles } from "@material-ui/core";
import { EditorState, convertToRaw } from "draft-js";
import { gql, useMutation } from "@apollo/client";
import TweetEditor from "../TweetEditor/TweetEditor";
import MyButton from "../MyButton/MyButton";
import { FETCH_TWEETS_QUERY } from "../../utils/graphql";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    padding: `${theme.spacing(2)}px`,
    display: "flex",
  },
  rootMobile: {
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: "4px",
  },
  profilePicSection: {
    width: 45,
  },
  tweetFormSection: {
    position: "relative",
    width: "100%",
    minHeight: "6em",
    cursor: "text",
  },
  tweetControlDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const CreateTweet = ({ showAsModal = false }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory();
  const {
    user: { data: authUserData },
  } = useAuthState();

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
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const rawData = convertToRaw(editorState.getCurrentContent());
    const mentionedUsers = [];
    for (const key in rawData.entityMap) {
      const ent = rawData.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention.username);
      }
    }
    console.log(mentionedUsers);

    if (editorState.getCurrentContent().hasText()) {
      createTweet({
        variables: {
          body: JSON.stringify(rawData),
        },
      });
    }
  };

  return (
    <div
      className={
        showAsModal ? `${classes.rootMobile} ${classes.root}` : classes.root
      }
    >
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <div className={classes.profilePicSection}>
            <Avatar src={authUserData.profile_pic} />
          </div>
          <div className={classes.tweetFormSection}>
            <TweetEditor
              editorState={editorState}
              setEditorState={setEditorState}
              placeHolderText={"What's happening?"}
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
    </div>
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
