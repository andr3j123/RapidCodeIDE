import { useState } from "react";
import DropDownFile from "./DropdownFile";
import DropDownEdit from "./DropdownEdit";
import DropDownHelp from "./DropdownHelp";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

function ToolBox() {
  const checkAuth = useQuery({
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

  const logOutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not logout");
      }

      return response.json();
    },
  });

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
      {checkAuth.isLoading ? (
        <p className="text-xl p-3">Loading...</p>
      ) : checkAuth.data && !checkAuth.data.authenticated ? (
        <Link to="/login" className="text-xl p-3 cursor-pointer">
          Log In
        </Link>
      ) : (
        <p
          className="text-xl p-3 cursor-pointer"
          onClick={() => {
            logOutMutation.mutate();
            location.reload();
          }}
        >
          Log Out
        </p>
      )}
    </header>
  );
}

export default ToolBox;
