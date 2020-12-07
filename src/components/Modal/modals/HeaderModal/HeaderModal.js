import React, { useState } from "react";

import styles from "../../Modal.module.css";

// Sub Components
import PageNumberFields from "./subs/PageNumberFields";
import PageRangeFields from "./subs/PageRangeFields";
import HeaderModalText from "./subs/HeaderModalText";
import HeaderModalTabs from "./subs/HeaderModalTabs";
import TitlesList from "./subs/TitlesList";
import HeaderPositioning from "./subs/HeaderPositioning";

// Action Setters
import changeHeaderText from "./actions/changeHeaderText";

function HeaderModal() {
  const [tab, setTab] = useState(0);
  const [rangeValue, setRangeValue] = useState("");
  const [pageRange, setPageRange] = useState({ start: "1", end: "1" });
  const [headerText, setHeaderText] = useState("<<1>>");
  const [titlesList, setTitlesList] = useState([{ title: "", pageNumber: "" }]);

  const formatHeaderText = (value, range, start) => {
    const rValue = range === undefined ? rangeValue : range;
    const startValue = start >= 1 ? start : pageRange.start;
    if (rValue === "All") {
      changeHeaderText(value, null, setHeaderText);
    } else if (rValue === "Pages From") {
      changeHeaderText(value, startValue, setHeaderText);
    }
  };

  const formatHeaderTextOnRangeChange = (value) => {
    setRangeValue(value);
    formatHeaderText(headerText, value);
  };

  const formatHeaderTextOnNumberChange = (pr, error) => {
    setPageRange(pr);
    if (rangeValue === "Pages From" && error === false) {
      formatHeaderText(headerText, undefined, pr.start);
    }
  };

  return (
    <div id="headerModal">
      <HeaderModalTabs tab={tab} setTab={setTab} />
      {tab === 0 && (
        <PageNumbersTab
          rangeValue={rangeValue}
          formatHeaderTextOnNumberChange={formatHeaderTextOnNumberChange}
          pageRange={pageRange}
          headerText={headerText}
          formatHeaderText={formatHeaderText}
          formatHeaderTextOnRangeChange={formatHeaderTextOnRangeChange}
        />
      )}
      {tab === 1 && (
        <TitlesList titlesList={titlesList} setTitlesList={setTitlesList} />
      )}
      {tab === 2 && (
        <HeaderPositioning
          rangeValue={rangeValue}
          pageRange={pageRange}
          titlesList={titlesList}
          headerText={headerText}
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
      <HeaderModalText
        headerText={headerText}
        formatHeaderText={formatHeaderText}
        rangeValue={rangeValue}
      />
    </div>
  );
};

export default HeaderModal;
