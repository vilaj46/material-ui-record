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
  const [state, setState] = useState({ name: "", blob: "" });

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
    try {
      const uploadedFile = await uploadFile(file);
      const blob = URL.createObjectURL(uploadedFile);
      setState({ ...state, blob, name: file.name });
    } catch (err) {
      console.log(err);
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

  const updateContext = {
    openFile,
    closeFile,
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
