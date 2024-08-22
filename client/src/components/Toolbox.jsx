import { useState } from "react";
import DropDownFile from "./DropdownFile";
import DropDownEdit from "./DropdownEdit";
import DropDownHelp from "./DropdownHelp";

function ToolBox() {
  const [isFileActive, setIsFileActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isHelpActive, setIsHelpActive] = useState(false);

  return (
    <>
      <header className="bg-slate-600 flex flex-row justify-between h-1/5">
        <div className="flex flex-row">
          <div
            onMouseEnter={() => setIsFileActive(true)}
            onMouseLeave={() => setIsFileActive(false)}
          >
            <p className="text-xl p-3">File</p>

            {isFileActive && <DropDownFile />}
          </div>

          <div
            onMouseEnter={() => setIsEditActive(true)}
            onMouseLeave={() => setIsEditActive(false)}
          >
            <p id="toolboxEdit" className="text-xl p-3">
              Edit
            </p>
            {isEditActive && <DropDownEdit />}
          </div>

          <div
            onMouseEnter={() => setIsHelpActive(true)}
            onMouseLeave={() => setIsHelpActive(false)}
          >
            <p id="toolboxHelp" className="text-xl p-3">
              Help
            </p>
            {isHelpActive && <DropDownHelp />}
          </div>
        </div>
        <a href="./login.html" className="text-xl p-3">
          Log In
        </a>
      </header>
    </>
  );
}

export default ToolBox;
