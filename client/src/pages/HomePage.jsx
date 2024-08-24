import ToolBox from "../components/toolbox";
import CodeEditor from "../components/CodeEditor";
import FileExplorer from "../components/FileExplorer";
import { useState } from "react";
import rightArrow from "../assets/open-file-explorer-icon.svg";
import { isMobile } from "react-device-detect";

function HomePage() {
  const [isFileExplorerShown, setIsFileExplorerShown] = useState(false);

  return (
    <>
      <ToolBox />

      <main className="flex flex-row">
        {isFileExplorerShown && <FileExplorer />}
        <div>
          {isMobile ? (
            <img
              src={rightArrow}
              alt="Open file explorer"
              className={`p-5 cursor-pointer z-10 absolute ${
                isFileExplorerShown ? "-rotate-180" : ""
              }`}
              onClick={() => setIsFileExplorerShown(!isFileExplorerShown)}
            />
          ) : (
            ""
          )}
          <CodeEditor />
        </div>
      </main>
      <div>
        <img
          src={rightArrow}
          alt="Open file explorer"
          className={`p-3 cursor-pointer z-10 absolute ${
            isFileExplorerShown ? "-rotate-180" : ""
          }`}
          onClick={() => setIsFileExplorerShown(!isFileExplorerShown)}
        />
      </div>
    </>
  );
}

export default HomePage;
