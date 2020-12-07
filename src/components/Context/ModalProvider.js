import React, { useState, useContext } from "react";

const ModalContext = React.createContext();
const ModalUpdateContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function useModalUpdate() {
  return useContext(ModalUpdateContext);
}

function ModalProvider({ children }) {
  const [state, setState] = useState("");

  /**
   * @param {String} modal 
   * 
   * If we click on a Dropdown Item in our header,
   * it could trigger opening a modal.
   */
  const openModal = (modal) => {
    setState(modal);
  };

  const updateContext = {
    openModal,
  };

  return (
    <ModalContext.Provider value={state}>
      <ModalUpdateContext.Provider value={updateContext}>
        {children}
      </ModalUpdateContext.Provider>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
