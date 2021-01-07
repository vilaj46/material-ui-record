import React from "react";
import Button from "@material-ui/core/Button";

import styles from "../../../Modal.module.css";

import addPageRanges from "../actions/addPageRanges.js";

export default function AddPageRangesButton({ titlesList, setTitlesList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const newTitlesList = addPageRanges(titlesList);
    setTitlesList([...newTitlesList]);
  };

  return (
    <Button
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary"
      onClick={handleClick}
      className={styles.addPageRangesButton}
    >
      Add Page Ranges to Titles
    </Button>
  );
}
