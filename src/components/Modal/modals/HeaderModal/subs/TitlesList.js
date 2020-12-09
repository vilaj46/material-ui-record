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
    let newTitlesList = [...titlesList];
    newTitlesList.push({ title: "", pageNumber: "" });
    setTitlesList([...newTitlesList]);
    setTimeout(() => {
      const modalFade = document.getElementById("modalFade");
      modalFade.scrollTop = modalFade.scrollHeight;
    }, 50);
  };


  const insertAbove = (index) => {
    const newItem = { title: "", pageNumber: "" };
    let newTitlesList = [...titlesList];
    newTitlesList.splice(index, 0, newItem);
    setTitlesList(newTitlesList);
  };

  const insertBelow = (index) => {
    const newItem = { title: "", pageNumber: "" };
    let newTitlesList = [...titlesList];
    newTitlesList.splice(index + 1, 0, newItem);
    setTitlesList(newTitlesList);
  }

  const remove = (index) => {
    let newTitlesList = [...titlesList];
    newTitlesList.splice(index, 1);
    setTitlesList(newTitlesList);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {titlesList.map((t, i) => {
        return (
          <TitleItem
            title={t.title}
            pageNumber={t.pageNumber}
            key={i}
            id={i}
            setTitlesList={setTitlesList}
            titlesList={titlesList}
            insertAbove={insertAbove}
            insertBelow={insertBelow}
            remove={remove}
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
