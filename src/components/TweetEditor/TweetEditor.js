import { useContext, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../../contexts/auth";
import { filterUsers } from "../../utils/graphql";

import { EditorState } from "draft-js";
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
    padding: `${theme.spacing(2)}px`,
    borderRadius: `${theme.shape.borderRadius}px`,
    marginBottom: "2em",
    minHeight: "80px",
  },
}));

const TweetEditor = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [suggestions, setSuggestions] = useState([]);
  const editor = useRef(null);

  const focus = () => editor.current.focus();

  const onSearchChange = ({ value }) => {
    filterUsers(user.token, value).then((res) => {
      setSuggestions(res.data.getUsers);
    });
  };

  return (
    <div className={classes.root} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        placeholder="What's happening?"
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
