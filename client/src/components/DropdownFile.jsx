function DropDownFile() {
  return (
    <div className="absolute flex flex-col bg-medium-gray cursor-pointer w-1/2 text-lg md:w-1/3 lg:w-60 xl:w-60 2xl:w-52 z-10">
      <p className="p-2 w-full">New text file</p>
      <p className="p-2 w-full">Open</p>
      <p className="p-2 w-full">Save</p>
      <p className="p-2 w-full">Export</p>
    </div>
  );
}

export default DropDownFile;
