import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

function CodeEditor() {
  const { editorContent, setEditorContent } = useContext(EditorContext);

  const handleEditorChange = (value, event) => {
    setEditorContent(value);
  };

  return (
    <Editor
      onChange={handleEditorChange}
      value={editorContent}
      className="w-auto flex-shrink"
      height="90vh"
      width="100vw"
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        fontSize: 14,
        minimap: {
          enabled: false,
        },
      }}
    ></Editor>
  );
}

export default CodeEditor;
