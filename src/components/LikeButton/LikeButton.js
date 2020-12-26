import { useMutation, gql } from "@apollo/client";
import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./likeButton.css";
import LikeIcon from "./LikeIcon";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
  },
}));

const LikeButton = (props) => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const {
    tweet: { id, likes, likesCount },
  } = props;

  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);

  const handleClick = () => {
    if (!user) {
      return props.history.push("/login");
    }
    toggleLike({
      variables: {
        postId: id,
      },
    });
  };

  useEffect(() => {
    if (user) {
      const likeIdx = likes.findIndex(
        (like) => like.username === user.username
      );

      if (likeIdx > -1) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, likes]);

  return (
    <Button
      size="small"
      color={liked ? "secondary" : "inherit"}
      startIcon={<LikeIcon />}
      className={(liked ? "likeBtn liked " : "likeBtn ") + classes.root}
      onClick={handleClick}
    >
      {likesCount}
    </Button>
  );
};

export default LikeButton;

const TOGGLE_LIKE_MUTATION = gql`
  mutation($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
