import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../../Modal.module.css";

import TitleItem from "./TitleItem";

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
      title: "",
      pageNumber: "",
      id: Math.random(1000),
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
      if (currentItem.id === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const newItem = {
        title: "",
        pageNumber: "",
        id: Math.random(1000),
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
      if (currentItem.id === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf >= 0) {
      const newItem = {
        title: "",
        pageNumber: "",
        id: Math.random(1000),
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
      if (currentItem.id === id) {
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
      {titlesList.map((t, i) => {
        return (
          <TitleItem
            title={t.title}
            pageNumber={t.pageNumber}
            key={i}
            id={t.id}
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
