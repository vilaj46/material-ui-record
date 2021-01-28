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
  const { titlesList, setTitlesList, addItem, insertItemAbove, insertItemBelow, removeItem } = headers;
  const classes = useStyles();

  /**
   * Adds the item then scrolls down on the list.
   */
  function customAddItem() {
    addItem();
    setTimeout(() => {
      const modalFade = document.getElementById("modalFade");
      modalFade.scrollBehavior = "smooth";
      modalFade.scrollTop = modalFade.scrollHeight;
    }, 50);
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
            // title={t.entry}
            // pageNumber={t.pageNumberInPdf}
            key={i}
            // id={t.idNumber}
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
          onClick={customAddItem}
        >
          Add Title
        </Button>
      </div>
    </form>
  );
}

export default TitlesList;
