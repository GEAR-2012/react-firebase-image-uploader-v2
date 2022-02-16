import { createContext, useContext, useEffect, useState } from "react";
import useDeleteFolders from "../hooks/use-delete-folders";

const AppContext = createContext();

const AppContextProvider = (props) => {
  // folders/collection names in firebase storage & firestore
  const tempFolder = "Temp"; // temporary, deleted upon final upload
  const imageFolder = "Images"; // final destination of upload
  // 'progress' to hold the percentage value of image upload progress
  const [progress, setProgress] = useState(0);
  // 'filesToUpload' to hold the selected files & unique file names
  const [filesToUpload, setFilesToUpload] = useState([]);
  // 'isSidebarOpen' to hold the open state of side menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 'foldersToDelete' to trigger the deletion of a folder & collection simultaneously
  const [foldersToDelete, setFoldersToDelete] = useState("");

  // only used from here
  useDeleteFolders(foldersToDelete, setFoldersToDelete);

  // initially wipe clean the 'Temp' folder & collection in firebase (clean start)
  useEffect(() => {
    setFoldersToDelete(tempFolder);
  }, []);

  // when the progress reaches the 100%, after a delay restet it to 0% (switch of progress bar)
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  }, [progress]);

  return (
    <AppContext.Provider
      value={{
        tempFolder,
        imageFolder,
        progress,
        setProgress,
        filesToUpload,
        setFilesToUpload,
        isSidebarOpen,
        setIsSidebarOpen,
        setFoldersToDelete,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const AppState = () => {
  return useContext(AppContext);
};
