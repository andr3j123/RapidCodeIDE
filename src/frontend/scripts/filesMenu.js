function newFile() {
  document.getElementById("editor").value = "";
}

function openFile() {
  const fileInput = document.getElementById("openFileInput");

  fileInput.click();

  fileInput.onchange = (event) => {
    // Retrieves the first selected file from the file input.
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = (event) => {
        const content = event.target.result;
        document.getElementById("editor").innerHTML = content;
      };
    }
  };
}

function saveAs() {
  const content =
    document.getElementById("editor").value ||
    document.getElementById("editor").textContent;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = document.getElementById("hiddenTitle").value || "filename.txt";
  a.click();

  // Cleans up data from cache
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newTextFile").addEventListener("click", () => {
    newFile();
  });

  document.getElementById("openFile").addEventListener("click", () => {
    openFile();
  });

  document.getElementById("saveAs").addEventListener("click", () => {
    saveAs();
  });

  document.getElementById("editorSettings").addEventListener("click", () => {
    document.getElementById("settings").style.display = "flex";
  });

  document.getElementById("save").addEventListener("click", () => {
    const content = document.getElementById("editor").value;

    document.getElementById("textToSave").value = content;

    document.getElementById("saveFile").submit();
  });
});
