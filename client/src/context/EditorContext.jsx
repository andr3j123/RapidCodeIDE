import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const [editorContent, setEditorContent] = useState("");

  return (
    <EditorContext.Provider value={{ editorContent, setEditorContent }}>
      {children}
    </EditorContext.Provider>
  );
}
