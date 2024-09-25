import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { useMutation } from "@tanstack/react-query";

function DropDownFile() {
  const { editorContent, setEditorContent, editorName } =
    useContext(EditorContext);

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

  const { mutate, error } = useMutation({
    mutationKey: ["save-file"],
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}saveFile/`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            titleToSave: editorName,
            textToSave: editorContent,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save file");
    },
  });

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
      <p className="p-2 w-full" onClick={() => mutate()}>
        Save
      </p>
      <p className="p-2 w-full" onClick={downloadFile}>
        Export
      </p>
    </div>
  );
}

export default DropDownFile;
