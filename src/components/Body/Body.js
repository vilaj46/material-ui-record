import React from "react";

import { useFile } from "../Context/FileProvider";
// import { useModal } from "../Context/FileProvider";

import styles from "./Body.module.css";

import MyModal from "../Modal/MyModal";

function Body() {
  const file = useFile();
  return (
    <div className={styles.body}>
      <MyModal />
      {file.name && (
        <iframe
          src={file.blob}
          title={file.name}
          className={styles.pdf}
        ></iframe>
      )}
    </div>
  );
}

export default Body;
