import { useState } from "react";

import changeHeaderText from "../modals/HeaderModal/actions/changeHeaderText";

export default function useHeaders() {
  const [tab, setTab] = useState(0);
  const [rangeValue, setRangeValue] = useState("");
  const [pageRange, setPageRange] = useState({ start: "1", end: "1" });
  const [headerText, setHeaderText] = useState("<<1>>");
  const [titlesList, setTitlesList] = useState([
    {
      entry: "",
      originalText: "",
      textError: false,
      pageNumberError: false,
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
    setTab(0);
    setRangeValue("");
    setPageRange({ start: "1", end: "1" });
    setHeaderText("<<1>>");
    setTitlesList([
      {
        entry: "",
        originalText: "",
        textError: false,
        pageNumberError: false,
        edits: [],
        pageNumberInPdf: "",
        pageNumberForMe: "",
        idNumber: Math.random(1000000),
      },
    ]);
    setPosition("top");
    setSPN(1);
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
  };
}
