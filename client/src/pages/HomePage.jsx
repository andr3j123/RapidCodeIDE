import ToolBox from "../components/toolbox";
import CodeEditor from "../components/CodeEditor";
import FileExplorer from "../components/FileExplorer";
import { useState, useEffect } from "react";
import rightArrow from "../assets/open-file-explorer-icon.svg";

function HomePage() {
  const [isFileExplorerShown, setIsFileExplorerShown] = useState(false);

  return (
    <>
      <ToolBox />

      <main className="flex flex-row">
        {isFileExplorerShown && <FileExplorer />}
        <div>
          <CodeEditor />
        </div>
      </main>
      <div>
        <img
          src={rightArrow}
          alt="Open file explorer"
          className="p-3 cursor-pointer z-10 absolute"
          onClick={() => setIsFileExplorerShown(!isFileExplorerShown)}
        />
      </div>
    </>
  );
}

export default HomePage;
