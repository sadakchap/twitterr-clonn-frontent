import Base from "../../components/Base/Base";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import Tweet from "../../components/Tweet/Tweet";

const Feed = () => {
  const { data: { getPosts } = {}, loading } = useQuery(FETCH_TWEETS);

  return (
    <Base>
      <CreateTweet />
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        getPosts.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      )}
    </Base>
  );
};

export default Feed;

const FETCH_TWEETS = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
    }
  }
`;
