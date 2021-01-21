// Helper Functions
import isValidNumber from "./isValidNumber.js";

function getErrors(k, value, currentErrors, pageRange, documentPages) {
  const { startError, endError } = currentErrors;

  // Is value a number.
  const isNumber = isValidNumber(value);

  let sError = startError; // Page number start error.
  let eError = endError; // Page number end error.
  let pageNumberStart = Number(pageRange.start);
  let pageNumberEnd = Number(pageRange.end);

  // Set up values based on what we have changed.
  if (k === "start" && isNumber === true) {
    pageNumberStart = Number(value);
  } else if (k === "end" && isNumber === true) {
    pageNumberEnd = Number(value);
  }

  if (pageNumberStart > documentPages) {
    sError = true;
  } else if (pageNumberEnd > documentPages) {
    eError = true;
  } else if (
    pageNumberEnd < pageNumberStart &&
    pageNumberStart <= documentPages
  ) {
    eError = true;
    sError = false;
  } else {
    sError = false;
    eError = false;
  }

  // If the value is not a number, error is true.
  if (isNumber === false && k === "start") {
    sError = true;
  } else if (isNumber === false && k === "end") {
    eError = true;
  }

  return { sError, eError };
}

export default getErrors;
