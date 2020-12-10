import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function PageRangeFields({ rangeValue, formatHeaderTextOnRangeChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Page Range Options...</FormLabel>
      <RadioGroup
        aria-label="pagerange"
        name="pagerange"
        value={rangeValue}
        onChange={(e) => formatHeaderTextOnRangeChange(e.target.value)}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel
          value="Pages From"
          control={<Radio />}
          label="Pages From"
        />
        <FormControlLabel value="None" control={<Radio />} label="None" />
      </RadioGroup>
    </FormControl>
  );
}

export default PageRangeFields;
