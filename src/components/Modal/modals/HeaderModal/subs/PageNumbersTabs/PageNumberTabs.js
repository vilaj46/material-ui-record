import React from "react";
import styles from "./PageNumberTabs.module.css";

// Subs
import PageRangeFields from "./subs/PageRangeFields/PageRangeFields";
import PageNumberFields from "./subs/PageNumberFields/PageNumberFields";
import HeaderModalText from "./subs/HeaderModalText/HeaderModalText";
import StartingPageNumber from "./subs/StartingPageNumber/StartingPageNumber";

function PageNumbersTab({ headers }) {
  return (
    <div className={styles.range}>
      <div className={styles.pageRanges}>
        <PageRangeFields headers={headers} />
        <PageNumberFields headers={headers} />
      </div>
      <div className={styles.numberFormatting}>
        <HeaderModalText headers={headers} />
        <StartingPageNumber headers={headers} />
      </div>
    </div>
  );
}

export default PageNumbersTab;
