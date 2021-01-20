import { useState } from "react";

import changeHeaderText from "../modals/HeaderModal/actions/changeHeaderText";

export default function useHeaders() {
  const [tab, setTab] = useState(defaultValues.tab);
  const [rangeValue, setRangeValue] = useState(defaultValues.rangeValue);
  const [pageRange, setPageRange] = useState(defaultValues.pageRange);
  const [headerText, setHT] = useState(defaultValues.headerText);
  const [titlesList, setTitlesList] = useState(defaultValues.titlesList);
  const [position, setPosition] = useState(defaultValues.position);
  const [startingPageNumber, setSPN] = useState(
    defaultValues.startingPageNumber
  );

  /**
   * @param {String} - value: New header value set in the HeaderModalText component.
   * @param {String} - range
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

  function setHeaderText(value, range) {
    changeHeaderText(value, startingPageNumber, setHT);

    // Not sure if we need this...everything below.
    // // Range value (All, Pages From, None).
    // const rValue = range === undefined ? rangeValue : range;

    // if (rValue === "All") {
    //   changeHeaderText(value, startingPageNumber, setHT);
    // } else if (rValue === "Pages From") {
    //   changeHeaderText(value, startingPageNumber, setHT);
    // }
  }

  /**
   * @param {String} value - All, Pages From, None.
   *
   * Since we are changing the range value, set the new state.
   * Then we format the header text. We use the headerText from
   * the state because we are not directly changing that. We will change it in the
   * setHeaderText function. We do give setHeaderText our new page range value
   * because we want it to have the most updated instead of relying on old state.
   */
  const formatHeaderTextOnRangeChange = (value) => {
    setRangeValue(value);
    setHeaderText(headerText, value);
  };

  /**
   * @param {Object} pr - {start: Number, end: Number}
   * @param {Boolean} error - Whether or not there is a problem with our page range values.
   *
   * Since we are changing the page range values, set the new state.
   * If we have an error we do not set the new headerText.
   * If our range is 'Pages From' and not 'All' and 'None',
   * then we can format our new headerText. We use the headerText
   * because it will be updated in the setHeaderText function.
   * Since we are giving the function the page range starting value
   * it will know what to use.
   */
  const formatHeaderTextOnNumberChange = (pr, error) => {
    setPageRange(pr);
    if (rangeValue === "Pages From" && error === false) {
      setHeaderText(headerText, undefined, pr.start);
    }
  };

  function setStartingPageNumber(pageNumber) {
    setSPN(pageNumber);
    // Change header text.
    changeHeaderText(headerText, pageNumber, setHT);
  }

  function clear() {
    setTab(defaultValues.tab);
    setRangeValue(defaultValues.rangeValue);
    setPageRange(defaultValues.pageRange);
    setHT(defaultValues.headerText);
    setTitlesList(defaultValues.titlesList);
    setPosition(defaultValues.position);
    setSPN(defaultValues.startingPageNumber);
  }

  function wereChangesMade() {
    // Compare the values of our current headers to default values.

    // Check rangeValue
    if (rangeValue !== defaultValues.rangeValue && rangeValue !== "None") {
      return true;
    }
    // Check pageRange
    const defaultStart = defaultValues.pageRange.start;
    const defaultEnd = defaultValues.pageRange.end;
    if (
      (pageRange.start !== defaultStart || pageRange.end !== defaultEnd) &&
      rangeValue !== "None"
    ) {
      return true;
    }
    // Check headerText
    if (headerText !== defaultValues.headerText && rangeValue !== "None") {
      return true;
    }
    // Check titlesList
    const tiltesAreDifferent = compareTitlesList(
      titlesList,
      defaultValues.titlesList
    );

    if (tiltesAreDifferent) {
      return true;
    }

    // Check position
    if (position !== defaultValues.position) {
      return true;
    }
    // Check startingPageNumber
    if (startingPageNumber !== defaultValues.startingPageNumber) {
      return true;
    }

    return false;
  }

  function compareTitlesList(currTitlesList, defaultTitlesList) {
    if (currTitlesList.length === 0) {
      return false;
    }

    if (currTitlesList.length >= 1) {
      for (let i = 0; i < currTitlesList.length; i++) {
        const currTitle = currTitlesList[i];
        const currEntry = currTitle.entry.trim();
        const currPageNumber = currTitle.pageNumberInPdf.trim();
        const currEntryError = currTitle.textError;
        const currPageNumberError = currTitle.pageNumberError;
        const isError = currEntryError || currPageNumberError;

        // If the text is different and there are no errors.
        if ((currEntry !== "" || currPageNumber !== "") && isError === false) {
          return true;
        }
      }
    }

    return false;
  }

  return {
    // Values
    tab,
    position,
    pageRange,
    rangeValue,
    headerText,
    titlesList,
    startingPageNumber,

    // Setters
    setTab,
    setPosition,
    setPageRange,
    setRangeValue,
    setHeaderText,
    setTitlesList,
    setStartingPageNumber,

    // Helper & Custom functions.
    clear,
    wereChangesMade,
    setHeaderText,
    formatHeaderTextOnRangeChange,
    formatHeaderTextOnNumberChange,
  };
}

const defaultValues = {
  tab: 0,
  rangeValue: "",
  pageRange: { start: "1", end: "1" },
  headerText: "<<1>>",
  titlesList: [
    {
      entry: "",
      originalText: "",
      textError: true,
      pageNumberError: true,
      edits: [],
      pageNumberInPdf: "",
      pageNumberForMe: "",
      idNumber: Math.random(1000000),
    },
  ],
  position: "top",
  startingPageNumber: 1,
};
