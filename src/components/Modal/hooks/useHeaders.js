import { useState } from "react";

import changeHeaderText from "../modals/HeaderModal/actions/changeHeaderText";
import compareTitlesList from "../modals/HeaderModal/actions/compareTitlesList";

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
   *
   * Simplified like crazy! We no longer need the ranges.
   * All we do now is check to make sure we have the brackets
   * with the changeHeaderText function; then we set the new value!
   */
  function setHeaderText(value) {
    const newHeaderText = changeHeaderText(value, startingPageNumber);
    setHT(newHeaderText);
  }

  /**
   * @param {String} pageNumber - String from the Starting Page Number.
   *
   * Set the starting page number no matter what so the user gets feedback.
   * We also change the headerText value and input.
   */
  function setStartingPageNumber(pageNumber) {
    setSPN(pageNumber);
    // Change header text.
    const newHeaderText = changeHeaderText(headerText, pageNumber);
    setHT(newHeaderText);
  }

  /**
   * Clear all the values and set to initial value.
   */
  function clear() {
    setTab(defaultValues.tab);
    setRangeValue(defaultValues.rangeValue);
    setPageRange(defaultValues.pageRange);
    setHT(defaultValues.headerText);
    setTitlesList(defaultValues.titlesList);
    setPosition(defaultValues.position);
    setSPN(defaultValues.startingPageNumber);
  }

  /**
   * Compare the values of our current headers to default values.
   */
  function wereChangesMade() {
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
    const tiltesAreDifferent = compareTitlesList(titlesList);
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
  };
}

export const defaultValues = {
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
  startingPageNumber: "1",
};
