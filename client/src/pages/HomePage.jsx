import ToolBox from "../components/Toolbox";
import CodeEditor from "../components/CodeEditor";
import FileExplorer from "../components/FileExplorer";
import { useState } from "react";
import rightArrow from "../assets/open-file-explorer-icon.svg";
import { isMobile } from "react-device-detect";
import { EditorProvider } from "../context/EditorContext";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const [isFileExplorerShown, setIsFileExplorerShown] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}check-auth`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not check the auth");
      }

      return response.json();
    },
  });

  return (
    <EditorProvider>
      <ToolBox />

      <main className="flex flex-row">
        {isFileExplorerShown && <FileExplorer />}
        <div>
          {/* Only God knows how this shit works */}
          {isLoading ? (
            ""
          ) : data && data.authenticated ? (
            isMobile ? (
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
            )
          ) : (
            ""
          )}
          <CodeEditor />
        </div>
      </main>
      <div>
        {/* This too */}
        {isLoading ? (
          ""
        ) : data && data.authenticated ? (
          !isMobile ? (
            <img
              src={rightArrow}
              alt="Open file explorer"
              className={`p-2 cursor-pointer z-10 absolute ${
                isFileExplorerShown ? "-rotate-180" : ""
              }`}
              onClick={() => setIsFileExplorerShown(!isFileExplorerShown)}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </EditorProvider>
  );
}

export default HomePage;
