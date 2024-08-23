import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <Editor
      className="w-auto flex-shrink"
      height="90vh"
      width="100vw"
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
