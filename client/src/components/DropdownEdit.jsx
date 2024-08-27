import { useContext } from "react";
import { EditorContext } from "../context/editorContext";

function DropDownEdit() {
  const { editorContent, setEditorContent } = useContext(EditorContext);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(editorContent)
      .catch(() => alert("Unable to copy text!"));
  };

  const cutToClipboard = () => {
    navigator.clipboard
      .writeText(editorContent)
      .catch(() => alert("Unable to copy text!"));

    setEditorContent("");
  };

  const pasteFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setEditorContent(text);
      })
      .catch((err) => {
        alert("Unable to paste text!");
      });
  };

  return (
    <div className="absolute flex flex-col bg-medium-gray cursor-pointer w-1/2 text-lg md:w-1/3 lg:w-60 xl:w-60 2xl:w-52 z-20">
      <p className="p-2 w-full" onClick={copyToClipboard}>
        Copy
      </p>
      <p className="p-2 w-full" onClick={cutToClipboard}>
        Cut
      </p>
      <p className="p-2 w-full" onClick={pasteFromClipboard}>
        Paste
      </p>
    </div>
  );
}

export default DropDownEdit;
