function DropDownHelp() {
  return (
    <div className="absolute flex flex-col bg-medium-gray cursor-pointer w-1/2 text-lg md:w-1/3 lg:w-60 xl:w-60 2xl:w-52 z-20">
      <a
        className="p-2 w-full"
        href="https://www.gnu.org/licenses/gpl-3.0.html#license-text"
      >
        View license
      </a>
      <a
        href="https://github.com/andr3j123/RapidCodeIDE"
        className="p-2 w-full"
      >
        GitHub
      </a>
    </div>
  );
}

export default DropDownHelp;
