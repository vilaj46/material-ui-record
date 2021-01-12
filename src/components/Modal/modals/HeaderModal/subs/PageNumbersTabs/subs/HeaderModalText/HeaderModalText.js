import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function HeaderModalText({ headers }) {
  const { headerText, formatHeaderText, rangeValue } = headers;
  const classes = useStyles();
  // If we have 'All' or 'Pages From' selected.
  const isDisabled =
    rangeValue !== "All" && rangeValue !== "Pages From" ? true : false;
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Header Text"
        value={headerText}
        onChange={(e) => formatHeaderText(e.target.value)}
        disabled={isDisabled}
      />
    </form>
  );
}

export default HeaderModalText;
