import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styles from "../../../Modal.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function TitlesList({ titlesList, setTitlesList }) {
  const classes = useStyles();

  const addItem = () => {
    let newTitlesList = titlesList;
    newTitlesList.push({ title: "", pageNumber: "" });
    setTitlesList([...titlesList]);
    setTimeout(() => {
      const modalFade = document.getElementById("modalFade");
      modalFade.scrollTop = modalFade.scrollHeight;
    }, 50);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {titlesList.map((t, i) => {
        return (
          <TitleItem
            title={t.title}
            pageNumber={t.pageNumber}
            key={i}
            index={i}
            setTitlesList={setTitlesList}
            titlesList={titlesList}
          />
        );
      })}
      <div className={styles.addTitleButton}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={addItem}
        >
          Add Title
        </Button>
      </div>
    </form>
  );
}

const TitleItem = ({ title, pageNumber, titlesList, index, setTitlesList }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber);
  const [timer, setTimer] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [pageNumberError, setPageNumberError] = useState(false);
  const DELAY = 500;
  const documentPages = 1000; // Just for testing.

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
      updatedList[index] = { ...updatedList[index], [k]: v };
      setTitlesList(updatedList);
    }, DELAY);
    setTimer(currentTimer);
  };

  return (
    <div className={styles.titleItem}>
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
    </div>
  );
};
