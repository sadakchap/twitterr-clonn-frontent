import {
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useLazyQuery, gql } from "@apollo/client";
import Tweet from "../Tweet/Tweet";
import CreateComment from "../CreateComment/CreateComment";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    zIndex: 999999,
    backgroundColor: "#5b708366",
  },
  modal: {
    position: "relative",
    top: "10%",
    margin: "0 auto",
    maxWidth: 600,
    width: "100%",
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      width: "100%",
      height: "100vh",
    },
  },
  modalHeader: {
    padding: `${theme.spacing(2)}px`,
    borderBottom: `1px solid #5b708366`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBody: {
    padding: `${theme.spacing(2)}px`,
  },
}));

const CreateTweetModal = (props) => {
  const classes = useStyles();
  const { type, id } = useParams();
  const [redirectUser, setRedirectUser] = useState(false);
  const history = useHistory();

  const [loadTweet, { loading, data: { getPost } = {}, called }] = useLazyQuery(
    FETCH_TWEET_QUERY,
    {
      variables: {
        postId: id,
      },
    }
  );

  useEffect(() => {
    id && loadTweet();
    document.body.style.overflow = "hidden";
    redirectUser && history.goBack();
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [id, loadTweet, redirectUser, history]);

  const modalHeaderTitle =
    type === "edit" ? "Update Tweet" : "Tweet your reply";

  return (
    <div
      className={classes.root}
      role="button"
      onClick={() => props.history.goBack()}
    >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modalHeader}>
          <Typography variant="h6" component="h6">
            {modalHeaderTitle}
          </Typography>
          <Button variant="text" onClick={() => props.history.goBack()}>
            <CloseIcon color="disabled" />
          </Button>
        </div>
        <div className={classes.modalBody}>
          {called && loading && <CircularProgress color="primary" />}
          {getPost && <Tweet tweet={getPost} showActions={false} />}
          <div style={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              flexItem
              style={{ margin: "0 16px 16px" }}
            />
            <Divider
              style={{
                width: "16px",
                position: "absolute",
                bottom: "32px",
                left: "32px",
              }}
            />
            <div style={{ marginTop: "8px", width: "100%" }}>
              <CreateComment postId={id} setRedirectUser={setRedirectUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateTweetModal);

const FETCH_TWEET_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likesCount
      commentsCount
      likes {
        id
        username
      }
      comments {
        id
        body
        username
      }
      author {
        name
        profile_pic
      }
    }
  }
`;
