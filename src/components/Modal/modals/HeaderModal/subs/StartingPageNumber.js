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

function StartingPageNumber({
  startingPageNumber,
  setStartingPageNumber,
  rangeValue,
}) {
  const classes = useStyles();
  const [error, setError] = useState(false);

  function onChange(e) {
    const { value } = e.target;
    const strippedValue = Number(value.trim());

    if (strippedValue >= 0) {
      setStartingPageNumber(String(strippedValue));

      if (error) {
        setError(false);
      }
    } else {
      setError(true);
    }
  }

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
          disabled={rangeValue === "None" || rangeValue === ""}
        />
      </div>
    </form>
  );
}

export default StartingPageNumber;
