import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import styles from "../../../Modal.module.css";

import TitleMenu from "./TitleMenu";

export default function TitleItem({
  title,
  pageNumber,
  titlesList,
  id,
  setTitlesList,
  insertAbove,
  insertBelow, 
  remove
}) {
  const [loaded, setLoaded] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState([0, 0]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber);
  const [timer, setTimer] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [pageNumberError, setPageNumberError] = useState(false);
  const DELAY = 500;
  const documentPages = 1000; // Just for testing.
  console.log(title, id);
  const handleChange = (e) => {
    clearTimeout(timer);
    const { placeholder, value } = e.target;
    if (placeholder === "Title") {
      setCurrentTitle(value);
      callTimeout("title", value);
    } else {
      // placeholder is Page Number
      setCurrentPageNumber(value);
      callTimeout("pageNumber", value);
    }

    let tError = titleError;
    let pnError = pageNumberError;

    // If we are changing the title check for:
    // The title is not a blank space, the page number is not blank or text.
    if (placeholder === "Title") {
      if (value.trim().length === 0) {
        tError = true;
      } else {
        tError = false;
      }

      if (
        currentPageNumber.trim().length === 0 ||
        Number(currentPageNumber) === 0 ||
        Number(currentPageNumber) > documentPages
      ) {
        pnError = true;
      } else {
        pnError = false;
      }
    }

    // If we are changing the pageNumber check for:
    // The title is not a blank space, the page number is a number
    if (placeholder !== "Title") {
      if (
        value.trim().length === 0 ||
        Number(value) < 1 ||
        String(Number(value)) === "NaN" ||
        Number(value) > documentPages
      ) {
        pnError = true;
      } else {
        pnError = false;
      }

      if (currentTitle.trim().length === 0) {
        tError = true;
      } else {
        tError = false;
      }
    }

    setTitleError(tError);
    setPageNumberError(pnError);
  };

  const callTimeout = (k, v) => {
    const currentTimer = setTimeout(() => {
      const updatedList = [...titlesList];
      updatedList[id] = { ...updatedList[id], [k]: v };
      setTitlesList(updatedList);
    }, DELAY);
    setTimer(currentTimer);
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);

      const element = document.getElementById(id);
      if (element.addEventListener) {
        element.addEventListener("contextmenu", (e) => {
          if (e.ctrlKey) {
            e.preventDefault();
            const tar = e.target.placeholder === 'Page Number' ? 'Page Number' : 'Title';
            if (!displayMenu) {
              setMenuPosition([e.layerX, e.layerY, tar]);
              setDisplayMenu(true);
              return;
            }
          }
        });
      }
    }
  }, [id, loaded, setLoaded, displayMenu, setDisplayMenu, setMenuPosition]);

  return (
    <div className={styles.titleItem} id={id}>
      <TextField
        id="filled-textarea"
        label="Title"
        placeholder="Title"
        multiline
        variant="filled"
        className={styles.titleText}
        value={currentTitle}
        onChange={handleChange}
        error={titleError}
      />
      <TextField
        id="filled-textarea"
        label="Page Number"
        placeholder="Page Number"
        variant="filled"
        className={styles.titleNumber}
        value={currentPageNumber}
        onChange={handleChange}
        error={pageNumberError}
      />
      <TitleMenu
        displayMenu={displayMenu}
        menuPosition={menuPosition}
        closeMenu={() => setDisplayMenu(false)}
        id={id}
        insertAbove={insertAbove}
        insertBelow={insertBelow}
        remove={remove}
      />
    </div>
  );
}
