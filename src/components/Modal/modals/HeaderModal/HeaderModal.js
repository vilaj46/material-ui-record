import React from "react";

import styles from "../../Modal.module.css";

// Sub Components
import PageNumberFields from "./subs/PageNumberFields";
import PageRangeFields from "./subs/PageRangeFields";
import HeaderModalText from "./subs/HeaderModalText";
import HeaderModalTabs from "./subs/HeaderModalTabs";
import TitlesList from "./subs/TitlesList";
import HeaderPositioning from "./subs/HeaderPositioning";
import StartingPageNumber from "./subs/StartingPageNumber";

function HeaderModal({ headers }) {
  return (
    <div id="headerModal">
      <HeaderModalTabs tab={headers.tab} setTab={headers.setTab} />
      {headers.tab === 0 && (
        <PageNumbersTab
          rangeValue={headers.rangeValue}
          formatHeaderTextOnNumberChange={
            headers.formatHeaderTextOnNumberChange
          }
          pageRange={headers.pageRange}
          headerText={headers.headerText}
          formatHeaderText={headers.formatHeaderText}
          formatHeaderTextOnRangeChange={headers.formatHeaderTextOnRangeChange}
          startingPageNumber={headers.startingPageNumber}
          setStartingPageNumber={headers.setStartingPageNumber}
        />
      )}
      {headers.tab === 1 && (
        <TitlesList
          titlesList={headers.titlesList}
          setTitlesList={headers.setTitlesList}
        />
      )}
      {headers.tab === 2 && (
        <HeaderPositioning
          rangeValue={headers.rangeValue}
          pageRange={headers.pageRange}
          titlesList={headers.titlesList}
          headerText={headers.headerText}
          position={headers.position}
          setPosition={headers.setPosition}
        />
      )}
    </div>
  );
}

const PageNumbersTab = ({
  rangeValue,
  formatHeaderTextOnNumberChange,
  pageRange,
  formatHeaderTextOnRangeChange,
  headerText,
  formatHeaderText,
  startingPageNumber,
  setStartingPageNumber,
}) => {
  return (
    <div className={styles.range}>
      <div className={styles.pageRanges}>
        <PageRangeFields
          rangeValue={rangeValue}
          formatHeaderTextOnRangeChange={formatHeaderTextOnRangeChange}
        />
        <PageNumberFields
          rangeValue={rangeValue}
          pageRange={pageRange}
          formatHeaderTextOnNumberChange={formatHeaderTextOnNumberChange}
        />
      </div>
      <div className={styles.numberFormatting}>
        <HeaderModalText
          headerText={headerText}
          formatHeaderText={formatHeaderText}
          rangeValue={rangeValue}
        />
        <StartingPageNumber
          startingPageNumber={startingPageNumber}
          setStartingPageNumber={setStartingPageNumber}
          rangeValue={rangeValue}
        />
      </div>
    </div>
  );
};

export default HeaderModal;
