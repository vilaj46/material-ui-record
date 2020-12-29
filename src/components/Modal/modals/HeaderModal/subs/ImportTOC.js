import React from "react";
import Button from "@material-ui/core/Button";

import styles from "../../../Modal.module.css";

import openTOC from "../actions/openTOC.js";

export default function ImportTOC({ setTitlesList }) {
  //   const file = useFile();
  //   const updateFile = useFileUpdate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    openTOC(setTitlesList);
  };

  return (
    <div className={styles.importTocContainer}>
      <div
        className={`${anchorEl === null ? "closed" : "opened"} ${
          styles.importTocButton
        }`}
      >
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Import Table of Contents
        </Button>
      </div>
    </div>
  );
}
