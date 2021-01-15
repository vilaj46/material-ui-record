import { useState } from "react";

import changeHeaderText from "../modals/HeaderModal/actions/changeHeaderText";

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

export default function useHeaders() {
  // Change these values to defaultValues.
  const [tab, setTab] = useState(0);
  const [rangeValue, setRangeValue] = useState("");
  const [pageRange, setPageRange] = useState({ start: "1", end: "1" });
  const [headerText, setHeaderText] = useState("<<1>>");
  const [titlesList, setTitlesList] = useState([
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
  ]);
  const [position, setPosition] = useState("top");
  const [startingPageNumber, setSPN] = useState(1);

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
    // const startValue = start >= 1 ? start : pageRange.start;

    if (rValue === "All") {
      changeHeaderText(value, startingPageNumber, setHeaderText);
    } else if (rValue === "Pages From") {
      changeHeaderText(value, startingPageNumber, setHeaderText);
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

  function setStartingPageNumber(pageNumber) {
    setSPN(pageNumber);
    // Change header text.
    changeHeaderText(headerText, pageNumber, setHeaderText);
  }

  function clear() {
    setTab(defaultValues.tab);
    setRangeValue(defaultValues.rangeValue);
    setPageRange(defaultValues.pageRange);
    setHeaderText(defaultValues.headerText);
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
    tab,
    setTab,
    rangeValue,
    setRangeValue,
    pageRange,
    setPageRange,
    headerText,
    setHeaderText,
    titlesList,
    setTitlesList,
    position,
    setPosition,
    formatHeaderText,
    formatHeaderTextOnRangeChange,
    formatHeaderTextOnNumberChange,
    startingPageNumber,
    setStartingPageNumber,
    clear,
    wereChangesMade,
  };
}
