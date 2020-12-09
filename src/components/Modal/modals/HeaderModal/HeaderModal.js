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

  // console.log(titlesList);
  /**
   * @param {String}
   * @param {String}
   * @param {Number}
   * 
   * A helper function for the below two functions.
   * 
   * First, we set the rValue (rangeValue). If our range parameter
   * is undefined that means it is either 'Pages From or None'. 
   * We need to give a value for range because if we update the input, our
   * state values will not be updated yet and we would be using the old value.
   * 
   * Same thing for the starting value. If we were to set our starting page
   * and try and use the state, it would not be updated. These two ternary operators
   * ensure we are using the most updated values.
   * 
   * Call changeHeaderText according to the range value. This is because
   * our All value should appear as <<1>> and the Pages From value should 
   * be the <<Starting Page>>.
   */
  const formatHeaderText = (value, range, start) => {
    // Range value (All, Pages From, None).
    const rValue = range === undefined ? rangeValue : range;

    // Starting page value.
    const startValue = start >= 1 ? start : pageRange.start;

    if (rValue === "All") {
      changeHeaderText(value, null, setHeaderText);
    } else if (rValue === "Pages From") {
      changeHeaderText(value, startValue, setHeaderText);
    }
  };

  /**
   * @param {String} value - All, Pages From, None. 
   * 
   * Since we are changing the range value, set the new state.
   * Then we format the header text. We use the headerText from
   * the state because we are not directly changing that. We will change it in the
   * formatHeaderText function. We do give formatHeaderText our new page range value
   * because we want it to have the most updated instead of relying on old state. 
   */
  const formatHeaderTextOnRangeChange = (value) => {
    setRangeValue(value);
    formatHeaderText(headerText, value);
  };

  /**
   * @param {Object} pr - {start: Number, end: Number} 
   * @param {Boolean} error - Whether or not there is a problem with our page range values.
   * 
   * Since we are changing the page range values, set the new state.
   * If we have an error we do not set the new headerText.
   * If our range is 'Pages From' and not 'All' and 'None',
   * then we can format our new headerText. We use the headerText
   * because it will be updated in the formatHeaderText function.
   * Since we are giving the function the page range starting value
   * it will know what to use.
   */
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
