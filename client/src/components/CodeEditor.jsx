import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        fontSize: "14",
        minimap: {
          enabled: false,
        },
      }}
    ></Editor>
  );
}

export default CodeEditor;
