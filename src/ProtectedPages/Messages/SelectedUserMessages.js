import { Typography } from "@material-ui/core";
import Spinner from "../../components/Spinner/Spinner";

const SelectedUserMessages = ({ messagesLoading, getMessages }) => {
  // let selectedUserChat;

  return (
    <div>
      {messagesLoading && <Spinner />}
      {getMessages &&
        getMessages.length > 0 &&
        getMessages.map((message) => (
          <Typography variant="body2" component="div" key={message.id}>
            {message.content}
          </Typography>
        ))}
    </div>
  );
};

export default SelectedUserMessages;
