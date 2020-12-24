import { convertFromRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { useState } from "react";
import MentionComponent from "../TweetEditor/MentionComponent";
import mentionsStyles from "../TweetEditor/mentionStyle.module.css";
import createMentionPlugin from "draft-js-mention-plugin";

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  theme: mentionsStyles,
  supportWhitespace: true,
  mentionComponent: MentionComponent,
});

const plugins = [mentionPlugin];

const DisplayTweetMsg = ({ body }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
  );

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      plugins={plugins}
      readOnly
    />
  );
};

export default DisplayTweetMsg;
