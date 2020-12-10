import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "36px",
    },
  },
}));

function PageNumberFields({
  rangeValue,
  pageRange,
  formatHeaderTextOnNumberChange,
}) {
  // Test for the future.
  const documentPages = 1000;

  const classes = useStyles();
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const onChange = (e, k) => {
    const { value } = e.target;

    // Is value a number.
    const isNumber = isValidNumber(value);

    let sError = startError; // Page number start error.
    let eError = endError; // Page number end error.
    let pageNumberStart = Number(pageRange.start);
    let pageNumberEnd = Number(pageRange.end);

    // Set up values based on what we have changed.
    if (k === "start" && isNumber === true) {
      pageNumberStart = Number(value);
    } else if (k === "end" && isNumber === true) {
      pageNumberEnd = Number(value);
    }

    // If our starting value is < end value, we have an error.
    if (pageNumberStart > documentPages) {
      sError = true;
    } else if (pageNumberEnd > documentPages) {
      eError = true;
    } else if (pageNumberEnd < pageNumberStart) {
      eError = true;
    } else if (pageNumberStart <= pageNumberEnd) {
      sError = false;
      eError = false;
    }

    // If the value is not a number, error is true.
    if (isNumber === false && k === "start") {
      sError = true;
    } else if (isNumber === false && k === "end") {
      eError = true;
    }

    setStartError(sError);
    setEndError(eError);

    if (k === "start") {
      formatHeaderTextOnNumberChange({ ...pageRange, [k]: value }, sError);
    } else {
      formatHeaderTextOnNumberChange({ ...pageRange, [k]: value }, eError);
    }
  };

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

/**
 * @param {Number} potential
 * @return {Boolean}
 * Checks if the potential number is a number.
 */
function isValidNumber(potential) {
  if (Number(potential) === 0) {
    return false;
  }

  return true;
}

export default PageNumberFields;
