import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../../Modal.module.css";

import TitleItem from "./TitleItem";
import ImportTOC from "./ImportTOC";
import AddPageRangesButton from "./AddPageRangesButton";

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

  /**
   * Needs fixing on the animation / timeout.
   */
  const addItem = () => {
    const newList = [...titlesList];
    newList.push({
      entry: "",
      originalText: "",
      textError: false,
      pageNumberError: false,
      edits: [],
      pageNumberInPdf: "",
      pageNumberForMe: "",
      idNumber: Math.random(1000000),
    });

    setTitlesList(newList);
    setTimeout(() => {
      const modalFade = document.getElementById("modalFade");
      modalFade.scrollTop = modalFade.scrollHeight;
    }, 500);
  };

  const insertItemAbove = (id) => {
    let indexOf = null;
    for (let i = 0; i < titlesList.length; i++) {
      const currentItem = titlesList[i];
      if (currentItem.idNumber === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const newItem = {
        entry: "",
        originalText: "",
        textError: false,
        pageNumberError: false,
        edits: [],
        pageNumberInPdf: "",
        pageNumberForMe: "",
        idNumber: Math.random(1000000),
      };
      const newList = [...titlesList];
      newList.splice(indexOf, 0, newItem);
      setTitlesList(newList);
    }
  };

  const insertItemBelow = (id) => {
    let indexOf = null;

    for (let i = 0; i < titlesList.length; i++) {
      const currentItem = titlesList[i];
      if (currentItem.idNumber === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const newItem = {
        entry: "",
        originalText: "",
        textError: false,
        pageNumberError: false,
        edits: [],
        pageNumberInPdf: "",
        pageNumberForMe: "",
        idNumber: Math.random(1000000),
      };
      const newList = [...titlesList];
      newList.splice(indexOf + 1, 0, newItem);
      setTitlesList(newList);
    }
  };

  const removeItem = (id) => {
    let indexOf = null;

    for (let i = 0; i < titlesList.length; i++) {
      const currentItem = titlesList[i];
      if (currentItem.idNumber === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const newList = [...titlesList];
      newList.splice(indexOf, 1);
      setTitlesList(newList);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={styles.titlesButtons}>
        <ImportTOC setTitlesList={setTitlesList} />
        <AddPageRangesButton
          titlesList={titlesList}
          setTitlesList={setTitlesList}
        />
      </div>
      {titlesList.map((t, i) => {
        return (
          <TitleItem
            title={t.entry}
            pageNumber={t.pageNumberInPdf}
            key={i}
            id={t.idNumber}
            t={t}
            setTitlesList={setTitlesList}
            titlesList={titlesList}
            insertItemAbove={insertItemAbove}
            insertItemBelow={insertItemBelow}
            removeItem={removeItem}
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
