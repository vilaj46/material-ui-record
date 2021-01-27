import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "./TitlesList.module.css";

import TitleItem from "./subs/TitleItem/TitleItem";
import ImportTOC from "./subs/ImportTOC/ImportTOC";
import AddPageRangesButton from "./subs/AddPageRangesButton/AddPageRangesButton";

import { defaultValues } from "../../../../hooks/useHeaders.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function TitlesList({ headers }) {
  const { titlesList, setTitlesList } = headers;
  const classes = useStyles();

  /**
   * Adds blank item to the new list and sets the list.
   *
   * Since we are waiting for the hook to update, we set a 50ms
   * delay to scroll to the bottom where we added the new item.
   *
   * __NEEDS BETTER ANIMATION__
   */
  function addItem() {
    const newList = [...titlesList];
    const defaultItem = { ...defaultValues.titlesList[0] };
    defaultItem.idNumber = Math.random(1000000);

    newList.push(defaultItem);

    setTitlesList(newList);

    setTimeout(() => {
      const modalFade = document.getElementById("modalFade");
      modalFade.scrollBehavior = "smooth";
      modalFade.scrollTop = modalFade.scrollHeight;
    }, 50);
  }

  /**
   * @param {Number} id - Identification of item in the titles list.
   *
   * Find the index of the item we are inserting.
   *
   * If we find the item, insert the new item above it.
   */
  function insertItemAbove(id) {
    let indexOf = null;
    for (let i = 0; i < titlesList.length; i++) {
      const currentItem = titlesList[i];
      if (currentItem.idNumber === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const defaultItem = { ...defaultValues.titlesList[0] };
      defaultItem.idNumber = Math.random(1000000);
      const newList = [...titlesList];
      newList.splice(indexOf, 0, defaultItem);
      setTitlesList(newList);
    }
  }

  /**
   * @param {Number} id - Identification of item in the titles list.
   *
   * Find the index of the item we are inserting.
   *
   * If we find the item, insert the new item below it.
   */
  function insertItemBelow(id) {
    let indexOf = null;

    for (let i = 0; i < titlesList.length; i++) {
      const currentItem = titlesList[i];
      if (currentItem.idNumber === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const defaultItem = { ...defaultValues.titlesList[0] };
      defaultItem.idNumber = Math.random(1000000);
      const newList = [...titlesList];
      newList.splice(indexOf + 1, 0, defaultItem);
      setTitlesList(newList);
    }
  }

  /**
   * @param {Number} id - Identification of selected item.
   *
   * Find the item in the titles list and remove it.
   */
  function removeItem(id) {
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
  }

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

export default TitlesList;
