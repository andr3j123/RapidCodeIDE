import ToolBox from "../components/toolbox";
import CodeEditor from "../components/CodeEditor";
import FileExplorer from "../components/FileExplorer";

function HomePage() {
  return (
    <>
      <ToolBox />

      <main className="flex flex-row">
        <FileExplorer />
        <CodeEditor />
      </main>
    </>
  );
}

export default HomePage;
