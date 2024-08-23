import { useState } from "react";
import DropDownFile from "./DropdownFile";
import DropDownEdit from "./DropdownEdit";
import DropDownHelp from "./DropdownHelp";
import { Link } from "react-router-dom";

function ToolBox() {
  const [isFileActive, setIsFileActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isHelpActive, setIsHelpActive] = useState(false);

  return (
    <header className="bg-darker-gray flex flex-row justify-between h-1/5">
      <nav className="flex flex-row">
        <div
          onMouseEnter={() => setIsFileActive(true)}
          onMouseLeave={() => setIsFileActive(false)}
        >
          <p className="text-xl p-3 cursor-pointer">File</p>

          {isFileActive && <DropDownFile />}
        </div>

        <div
          onMouseEnter={() => setIsEditActive(true)}
          onMouseLeave={() => setIsEditActive(false)}
        >
          <p id="toolboxEdit" className="text-xl p-3 cursor-pointer">
            Edit
          </p>
          {isEditActive && <DropDownEdit />}
        </div>

        <div
          onMouseEnter={() => setIsHelpActive(true)}
          onMouseLeave={() => setIsHelpActive(false)}
        >
          <p id="toolboxHelp" className="text-xl p-3 cursor-pointer">
            Help
          </p>
          {isHelpActive && <DropDownHelp />}
        </div>
      </nav>
      <Link to="/login" className="text-xl p-3 cursor-pointer">
        Log In
      </Link>
    </header>
  );
}

export default ToolBox;
