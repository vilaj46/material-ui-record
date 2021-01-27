import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function StartingPageNumber({ headers }) {
  const { startingPageNumber, setStartingPageNumber, rangeValue } = headers;
  const classes = useStyles();
  const [error, setError] = useState(false);

  /**
   * @param {Object} e - Event object.
   *
   * Trim the input to make sure it isn't blank. If it
   * isn't blank, check whether it's less than one and set errors.
   */
  function onChange(e) {
    const { value } = e.target;
    const strippedValue = Number(value.trim());

    setStartingPageNumber(String(strippedValue));

    if (strippedValue <= 0 && error === false) {
      setError(true);
    } else if (error === true && strippedValue >= 1) {
      setError(false);
    }
  }

  // Disable if our page range options unselected or None.
  const isDisabled = rangeValue === "None" || rangeValue === "";

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-number"
          label="Starting Page Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={startingPageNumber}
          onChange={(e) => onChange(e)}
          error={error}
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}

export default StartingPageNumber;
