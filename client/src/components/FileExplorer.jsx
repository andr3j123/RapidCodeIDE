import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

function FileExplorer() {
  const { setEditorContent, setEditorName } = useContext(EditorContext);

  const loadFiles = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}readFiles`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not load the files");
      }

      return response.json();
    },
  });

  const getUserData = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}getUserData`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not get user data");
      }

      return response.json();
    },
  });

  const openFile = useMutation({
    mutationKey: ["open-file"],
    mutationFn: async (fileName) => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}openFile/${fileName}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "application/json" },
        }
      );

      if (!response.ok) throw new Error();

      return response.json();
    },
  });

  const createFile = useMutation({
    mutationKey: ["create-file"],
    mutationFn: async (data) => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}createFile`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: data,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
      return response.json();
    },

    onSuccess: () => loadFiles.refetch(),
  });

  const handleCreateFile = (event) => {
    event.preventDefault();

    const formData = {
      fileName: event.target.fileName.value,
    };

    createFile.mutate(JSON.stringify(formData));
  };

  const storageLeft = Math.abs(
    Math.floor(getUserData.data.userData.remainingStorageInBytes / 1048576) - 25
  );

  return (
    <aside className="flex flex-col flex-shrink-0 absolute z-10 w-full h-full bg-darker-gray md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6">
      <div className="flex flex-col w-full h-auto ">
        {getUserData.isLoading && (
          <h2 className="text-3xl text-center p-3">Loading...</h2>
        )}
        {getUserData.isError && (
          <h2 className="text-3xl text-center p-3">{getUserData.error}</h2>
        )}
        {getUserData.data && (
          <h2 className="text-3xl text-center p-3">
            {getUserData.data.userData.username}
          </h2>
        )}
        {getUserData.data && (
          <p className="text-center p-2 text-lg">{storageLeft}MB / 25MB</p>
        )}
        <form
          method="post"
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleCreateFile}
        >
          <label htmlFor="fileName" className="pb-1">
            Create new file:
          </label>
          <input
            type="text"
            name="fileName"
            id="fileName"
            className="focus:outline-none bg-input-bg text-black p-1 w-2/3 placeholder:text-black"
            placeholder="index.js"
          />
          <input
            type="submit"
            value="Create"
            className="text-xl cursor-pointer pt-2"
          />
        </form>

        {createFile.isError && (
          <p className="w-full text-center p-1">{createFile.error.message}</p>
        )}
        {createFile.isSuccess && (
          <p className="w-full text-center p-1">File created!</p>
        )}
      </div>
      <nav className="flex flex-col p-5 text-lg overflow-scroll no-scrollbar overflow-x-hidden h-2/4 max-h-2/4">
        {loadFiles.isLoading && <p>Loading...</p>}
        {loadFiles.isError && <p>{loadFiles.error.message}</p>}

        {loadFiles.data && (
          <ul>
            {loadFiles.data.userFiles.map((file) => (
              <li
                key={file}
                onClick={() =>
                  openFile.mutate(file, {
                    onSuccess: (data) => {
                      setEditorContent(data.content);
                      setEditorName(data.title);
                    },
                  })
                }
                className="cursor-pointer"
              >
                {file}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}

export default FileExplorer;
