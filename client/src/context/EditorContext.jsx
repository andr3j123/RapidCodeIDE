import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const [editorContent, setEditorContent] = useState("");
  const [editorName, setEditorName] = useState("");

  return (
    <EditorContext.Provider
      value={{ editorContent, setEditorContent, editorName, setEditorName }}
    >
      {children}
    </EditorContext.Provider>
  );
}
