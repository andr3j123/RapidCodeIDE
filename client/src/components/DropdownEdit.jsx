function DropDownEdit() {
  return (
    <div className="absolute flex flex-col bg-medium-gray cursor-pointer w-1/2 text-lg md:w-1/3 lg:w-60 xl:w-60 2xl:w-52 z-20">
      <p className="p-2 w-full">Undo</p>
      <p className="p-2 w-full">Cut</p>
      <p className="p-2 w-full">Copy</p>
      <p className="p-2 w-full">Paste</p>
    </div>
  );
}

export default DropDownEdit;
