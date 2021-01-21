import React from "react";

// Subs
import PageRangeFields from "./subs/PageRangeFields/PageRangeFields";
import HeaderModalText from "./subs/HeaderModalText/HeaderModalText";
import PageNumberFields from "./subs/PageNumberFields/PageNumberFields";
import StartingPageNumber from "./subs/StartingPageNumber/StartingPageNumber";

// CSS
import styles from "./PageNumberTabs.module.css";

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
