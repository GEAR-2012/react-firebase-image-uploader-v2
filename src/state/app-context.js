import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {
  // 'progress' to hold the percentage value of image upload progress
  const [progress, setProgress] = useState(0);
  // 'isSidebarOpen' to hold the open state of side menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        progress,
        setProgress,
        isSidebarOpen,
        setIsSidebarOpen,
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
