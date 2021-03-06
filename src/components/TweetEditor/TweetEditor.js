import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useAuthState } from "../../contexts/auth";
import { filterUsers } from "../../utils/graphql";

import Editor from "draft-js-plugins-editor";
import createMentionPlugin from "draft-js-mention-plugin";
import mentionsStyles from "./mentionStyle.module.css";

import MentionEntry from "./MentionEntry";
import MentionComponent from "./MentionComponent";

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  theme: mentionsStyles,
  supportWhitespace: true,
  mentionComponent: MentionComponent,
});

const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "text",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
    minHeight: "80px",
  },
}));

const TweetEditor = (props) => {
  const classes = useStyles();
  const {
    user: {
      credentials: { token },
    },
  } = useAuthState();
  const { editorState, setEditorState, placeHolderText } = props;

  const [suggestions, setSuggestions] = useState([]);
  const editor = useRef(null);

  const focus = () => editor.current.focus();

  const onSearchChange = ({ value }) => {
    filterUsers(token, value).then((res) => {
      if (res.errors) {
        console.log(res.errors);
        return;
      }
      const mentionData =
        res.data.getUsers &&
        res.data.getUsers.map((user) => ({
          username: user.username,
          name: user.name,
          link: `/${user.username}`,
          avatar: user.profile_pic,
        }));
      setSuggestions(mentionData);
    });
  };

  return (
    <div className={classes.root} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        placeholder={placeHolderText}
        ref={editor}
      />
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        entryComponent={MentionEntry}
      />
    </div>
  );
};

export default TweetEditor;
