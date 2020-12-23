import React, { useState, useContext } from "react";

import uploadFile from "../../api/uploadFile.js";

const FileContext = React.createContext();
const FileUpdateContext = React.createContext();

export function useFile() {
  return useContext(FileContext);
}

export function useFileUpdate() {
  return useContext(FileUpdateContext);
}

function FileProvider({ children }) {
  const [state, setState] = useState({
    name: "",
    blob: "",
    headerMessage: "",
    loadingFile: false,
    pageCount: 0,
  });

  /**
   * @param {File} file
   *
   * If we open a file in our File Dropdown Menu.
   *
   * Create a blob of the file and grab the name of the file.
   * Will display the PDF in the body and the name will appear at the top
   * of th header.
   */
  const openFile = async (file) => {
    setState({ ...state, loadingFile: true });
    try {
      const response = await uploadFile(file);
      if (response.status === 200) {
        const blob = URL.createObjectURL(file);
        setState({
          ...state,
          blob,
          name: file.name,
          headerMessage: file.name,
          loadingFile: false,
          pageCount: response.pageCount,
        });
      } else {
        setState({
          ...state,
          headerMessage: response.message,
          loadingFile: false,
        });
      }
    } catch (err) {
      setState({
        ...state,
        headerMessage: "Something went wrong.",
        loadingFile: false,
      });
    }
  };

  /**
   * If we click the exit button, we will close the file
   * by setting the name and blob to empty strings.
   */
  const closeFile = () => {
    if (state.name.length > 0 && state.blob.length > 0) {
      setState({ ...state, name: "", blob: "" });
    }
  };

  function updateFile(blob) {
    const pdf = URL.createObjectURL(blob);
    setState({ ...state, blob: pdf });
  }

  const updateContext = {
    openFile,
    closeFile,
    updateFile,
  };

  return (
    <FileContext.Provider value={state}>
      <FileUpdateContext.Provider value={updateContext}>
        {children}
      </FileUpdateContext.Provider>
    </FileContext.Provider>
  );
}

export default FileProvider;
