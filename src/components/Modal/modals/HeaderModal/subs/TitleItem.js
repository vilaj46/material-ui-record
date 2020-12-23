import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import styles from "../../../Modal.module.css";

import TitleMenu from "./TitleMenu";

import { useFile } from "../../../../Context/FileProvider";

export default function TitleItem({
  title,
  pageNumber,
  titlesList,
  id,
  setTitlesList,
  insertItemAbove,
  insertItemBelow,
  removeItem,
}) {
  const [loaded, setLoaded] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState([0, 0, "", 0]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber);
  const [timer, setTimer] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [pageNumberError, setPageNumberError] = useState(false);
  const DELAY = 500;

  const file = useFile();
  const documentPages = file.pageCount;

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

    let tError = titleError; // Title error.
    let pnError = pageNumberError; // Page number error.

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

  /**
   * @param {String} k - The key we are changing.
   * @param {String} v - The value we are changing.
   *
   * Sets a timer when we start typing in one of the inputs.
   * If we stop typing, it will save and update after the delay.
   */
  const callTimeout = (k, v) => {
    const currentTimer = setTimeout(() => {
      const updatedList = [...titlesList];
      let indexOf = null;
      for (let i = 0; i < updatedList.length; i++) {
        const currItem = updatedList[i];
        if (currItem.id === id) {
          indexOf = i;
          break;
        }
      }

      updatedList[indexOf] = { ...updatedList[indexOf], [k]: v };
      setTitlesList(updatedList);
    }, DELAY);
    setTimer(currentTimer);
  };

  useEffect(() => {
    // Was having a bug where new items added would have a same value.
    // Could not figure out why.
    if (title !== currentTitle) {
      setCurrentTitle(title);
    }

    // Adds custom event listener for ctrl-right-click
    // that brings up the menu.
    if (!loaded) {
      setLoaded(true);
      let element = null;
      element = document.getElementById(id);

      if (element.addEventListener) {
        element.addEventListener("contextmenu", (e) => {
          if (e.ctrlKey) {
            e.preventDefault();
            const tar =
              e.target.placeholder === "Page Number" ? "Page Number" : "Title";
            if (!displayMenu) {
              setMenuPosition([
                e.layerX,
                e.layerY,
                tar,
                Number(element.offsetWidth),
              ]);
              setDisplayMenu(true);
              return;
            }
          }
        });
      }
    }
  }, [
    id,
    loaded,
    setLoaded,
    displayMenu,
    setDisplayMenu,
    setMenuPosition,
    // Adding these is bugging the form. Need to figure out a way around this.
    // setCurrentTitle,
    // title,
    // currentTitle,
  ]);

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
      {loaded && (
        <TitleMenu
          displayMenu={displayMenu}
          menuPosition={menuPosition}
          closeMenu={() => setDisplayMenu(false)}
          id={id}
          insertItemAbove={insertItemAbove}
          insertItemBelow={insertItemBelow}
          removeItem={removeItem}
        />
      )}
    </div>
  );
}
