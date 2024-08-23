function FileExplorer() {
  return (
    <aside className="flex flex-col flex-shrink-0 absolute z-10 w-full h-full bg-darker-gray md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6">
      <div className="flex flex-col w-full h-auto ">
        <h2 className="text-3xl text-center p-3">Username</h2>
        <p className="text-center p-2 text-lg">12MB / 25MB</p>
      </div>
      <nav className="flex flex-col p-5 text-lg overflow-scroll no-scrollbar overflow-x-hidden h-2/4 max-h-2/4">
        <ul>script.js</ul>
        <ul>index.html</ul>
        <ul>style.css</ul>
      </nav>
    </aside>
  );
}

export default FileExplorer;
