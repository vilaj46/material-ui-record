import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import styles from "../../../Modal.module.css";

function HeaderPositioning({ position, setPosition }) {
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
          <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
        </RadioGroup>
      </FormControl>
      <ExamplePage position={position} />
    </div>
  );
}

const ExamplePage = ({ position }) => {
  return (
    <div className={styles.examplePageWrapper}>
      <div
        className={`${styles.examplePage} ${
          position === "top" ? styles.examplePageTop : styles.examplePageBottom
        }`}
      >
        <p className={styles.examplePageNumber}>1</p>
        <p className={styles.examplePageText}>HeaderText</p>
      </div>
      <div className={styles.sampleTextWrapper}>
        <p className={styles.sampleText}>Sample Text</p>
      </div>
    </div>
  );
};

export default HeaderPositioning;
