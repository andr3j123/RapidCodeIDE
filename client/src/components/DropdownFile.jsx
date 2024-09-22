import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

function DropDownFile() {
  const { editorContent, setEditorContent } = useContext(EditorContext);

  const downloadFile = () => {
    const blob = new Blob([editorContent], { type: "text/javascript" });

    const tempAnchorTag = document.createElement("a");
    tempAnchorTag.href = URL.createObjectURL(blob);
    tempAnchorTag.download = "test.js";
    tempAnchorTag.click();

    URL.revokeObjectURL(tempAnchorTag.href);
  };

  const openFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setEditorContent(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="absolute flex flex-col bg-medium-gray cursor-pointer w-1/2 text-lg md:w-1/3 lg:w-60 xl:w-60 2xl:w-52 z-20">
      <p className="p-2 w-full" onClick={() => setEditorContent("")}>
        New text file
      </p>
      <p
        className="p-2 w-full"
        onClick={() => {
          const fileInput = document.getElementById("openFile");
          fileInput.click();
        }}
      >
        Open
      </p>
      <input
        type="file"
        id="openFile"
        style={{ display: "none" }}
        onChange={openFile}
      />
      <p className="p-2 w-full">Save</p>
      <p className="p-2 w-full" onClick={downloadFile}>
        Export
      </p>
    </div>
  );
}

export default DropDownFile;
