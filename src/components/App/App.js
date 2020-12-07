import React from "react";
import Container from "@material-ui/core/Container";

import styles from "./App.module.css";

// Components
import Header from "../Header/Header";
import Body from "../Body/Body";

// Contexts
import FileProvider from "../Context/FileProvider";
import ModalProvider from "../Context/ModalProvider";

function App() {
  return (
    <Container className={styles.app}>
      <FileProvider>
        <ModalProvider>
          <Header />
          <Body />
        </ModalProvider>
      </FileProvider>
    </Container>
  );
}

export default App;
