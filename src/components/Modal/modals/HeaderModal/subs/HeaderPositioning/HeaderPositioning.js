import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import styles from "./HeaderPositioning.module.css";

import ExamplePage from "./subs/ExamplePage/ExamplePage";

function HeaderPositioning({ headers }) {
  const { position, setPosition } = headers;
  return (
    <div className={styles.headerPositioningWrapper}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Position</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position1"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        >
          <FormControlLabel value="top" control={<Radio />} label="Top" />
          <FormControlLabel
            value="bottom"
            control={<Radio />}
            label="Bottom"
            disabled
          />
        </RadioGroup>
      </FormControl>
      <ExamplePage position={position} />
    </div>
  );
}

export default HeaderPositioning;
