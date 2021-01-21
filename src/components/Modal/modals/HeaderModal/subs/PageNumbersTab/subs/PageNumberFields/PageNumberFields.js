import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// Provider Hook
import { useFile } from "../../../../../../../Context/FileProvider";

// // Helper Functions
// import isValidNumber from "./helpers/isValidNumber.js";
import getErrors from "./helpers/getErrors.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "36px",
    },
  },
}));

function PageNumberFields({ headers }) {
  const file = useFile();
  const classes = useStyles();
  const documentPages = file.pageCount;
  const { rangeValue, pageRange, setPageRange } = headers;

  const [endError, setEndError] = useState(false);
  const [startError, setStartError] = useState(false);

  // const onChange = (e, k) => {
  function onChange(e, k) {
    const { value } = e.target;

    // Is value a number.
    // const isNumber = isValidNumber(value);

    // let sError = startError; // Page number start error.
    // let eError = endError; // Page number end error.
    // let pageNumberStart = Number(pageRange.start);
    // let pageNumberEnd = Number(pageRange.end);

    // // Set up values based on what we have changed.
    // if (k === "start" && isNumber === true) {
    //   pageNumberStart = Number(value);
    // } else if (k === "end" && isNumber === true) {
    //   pageNumberEnd = Number(value);
    // }

    // // If our starting value is < end value, we have an error.
    // if (pageNumberStart > documentPages) {
    //   sError = true;
    // } else if (pageNumberEnd > documentPages) {
    //   eError = true;
    // } else if (
    //   pageNumberEnd < pageNumberStart &&
    //   pageNumberStart <= documentPages
    // ) {
    //   eError = true;
    //   sError = false;
    // } else {
    //   sError = false;
    //   eError = false;
    // }

    // // If the value is not a number, error is true.
    // if (isNumber === false && k === "start") {
    //   sError = true;
    // } else if (isNumber === false && k === "end") {
    //   eError = true;
    // }

    const currentErrors = { startError, endError };
    const { sError, eError } = getErrors(
      k,
      value,
      currentErrors,
      pageRange,
      documentPages
    );

    setStartError(sError);
    setEndError(eError);

    if (k === "start") {
      setPageRange({ ...pageRange, [k]: value }, sError);
    } else {
      setPageRange({ ...pageRange, [k]: value }, eError);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-number"
          label="Start"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={pageRange.start}
          onChange={(e) => onChange(e, "start")}
          disabled={rangeValue === "Pages From" ? false : true}
          error={startError}
        />
        <TextField
          id="standard-number"
          label="End"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={pageRange.end}
          onChange={(e) => onChange(e, "end")}
          disabled={rangeValue === "Pages From" ? false : true}
          error={endError}
        />
      </div>
    </form>
  );
}

export default PageNumberFields;
