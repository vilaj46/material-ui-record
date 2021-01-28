import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import styles from "./TitleItem.module.css";

import TitleMenu from "./subs/TitleMenu";

import { useFile } from "../../../../../../../Context/FileProvider";

export default function TitleItem({
  titlesList,
  setTitlesList,
  insertItemAbove,
  insertItemBelow,
  removeItem,
  t,
}) {
  const { entry, pageNumberInPdf, idNumber} = t;
  // Reassigning names. This should be switched.
  // We call them titles on the front end and entries on the backend. Confusing!
  const title = entry;
  const pageNumber = pageNumberInPdf;
  const id = idNumber;

  const [loaded, setLoaded] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState([0, 0, "", 0]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber);
  const [timer, setTimer] = useState(null);
  const [titleError, setTitleError] = useState(t.textError);
  const [pageNumberError, setPageNumberError] = useState(t.pageNumberError);
  const DELAY = 500;

  const file = useFile();
  const documentPages = file.pageCount;

  const handleChange = (e) => {
    clearTimeout(timer);
    const { placeholder, value } = e.target;

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

      // Was getting an error putting this in the 'if' statement below.
      // Coerce the int on this line then check the length.
      const temp = String(currentPageNumber).trim();

      if (
        temp.length === 0 ||
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

    if (placeholder === "Title") {
      setCurrentTitle(value);
      callTimeout("entry", value, tError, pnError);
    } else {
      // placeholder is Page Number
      setCurrentPageNumber(value);
      callTimeout("pageNumberInPdf", value, tError, pnError);
    }
  };

  /**
   * @param {String} k - The key we are changing.
   * @param {String} v - The value we are changing.
   *
   * Sets a timer when we start typing in one of the inputs.
   * If we stop typing, it will save and update after the delay.
   */
  const callTimeout = (k, v, tError, pnError) => {
    const currentTimer = setTimeout(() => {
      const updatedList = [...titlesList];
      let indexOf = null;
      for (let i = 0; i < updatedList.length; i++) {
        const currItem = updatedList[i];
        if (currItem.idNumber === id) {
          indexOf = i;
          break;
        }
      }

      updatedList[indexOf] = {
        ...updatedList[indexOf],
        [k]: v,
        textError: tError,
        pageNumberError: pnError,
      };
      setTitlesList(updatedList);
    }, DELAY);
    setTimer(currentTimer);
  };

  useEffect(() => {
    // Was having a bug where new items added would have a same value.
    // Could not figure out why.
    if (title !== currentTitle) {
      setCurrentTitle(title);
      setCurrentPageNumber(pageNumber);
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
