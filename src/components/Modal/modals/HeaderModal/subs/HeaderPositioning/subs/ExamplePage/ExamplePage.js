import React from "react";

import styles from "./ExamplePage.module.css";

function ExamplePage({ position }) {
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
}

export default ExamplePage;
