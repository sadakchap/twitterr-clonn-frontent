import Base from "../../components/Base/Base";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import Tweet from "../../components/Tweet/Tweet";
import { FETCH_TWEETS_QUERY } from "../../utils/graphql";

const Feed = () => {
  const { data: { getPosts } = {}, loading } = useQuery(FETCH_TWEETS_QUERY);

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
