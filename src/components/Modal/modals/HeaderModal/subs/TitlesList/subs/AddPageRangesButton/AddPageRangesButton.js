import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import styles from "./AddPageRangesButton.module.css";

import addPageRanges from "../../../../actions/addPageRanges.js";
import removePageRanges from "../../../../actions/removePageRanges.js";

export default function AddPageRangesButton({ titlesList, setTitlesList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [applied, setApplied] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    const newApplied = !applied;

    if (newApplied) {
      const newTitlesList = addPageRanges(titlesList);
      setTitlesList([]);
      setTimeout(() => {
        setTitlesList(newTitlesList);
      }, 100);
    } else {
      // Remove the page ranges if they exist.
      const newTitlesList = removePageRanges(titlesList);
      setTitlesList([]);
      setTimeout(() => {
        setTitlesList(newTitlesList);
      }, 100);
    }

    setApplied(newApplied);
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
      {applied ? "Remove Page Ranges from Titles" : "Add Page Ranges to Titles"}
    </Button>
  );
}
