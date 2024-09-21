import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

function FileExplorer() {
  const { setEditorContent } = useContext(EditorContext);

  const { data, isLoading, isError, error } = useQuery({
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

  const { mutate } = useMutation({
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

  return (
    <aside className="flex flex-col flex-shrink-0 absolute z-10 w-full h-full bg-darker-gray md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6">
      <div className="flex flex-col w-full h-auto ">
        <h2 className="text-3xl text-center p-3">Username</h2>
        <p className="text-center p-2 text-lg">12MB / 25MB</p>
      </div>
      <nav className="flex flex-col p-5 text-lg overflow-scroll no-scrollbar overflow-x-hidden h-2/4 max-h-2/4">
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}

        {data && (
          <ul>
            {data.userFiles.map((file) => (
              <li
                key={file}
                onClick={() =>
                  mutate(file, {
                    onSuccess: (data) => setEditorContent(data.content),
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
