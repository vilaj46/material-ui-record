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
  } else {
    // The value we changed is not a number.
    const notANumberErrors = valueIsNotANumber(k, sError, eError);
    return notANumberErrors;
  }

  const errors = {
    sError,
    eError,
  };
  const currentPageNumbers = {
    pageNumberStart,
    pageNumberEnd,
  };

  // Starting value should be less than or equal to ending value.
  // Ending value should be greater than or equal to starting value.

  // Starting value should be less than or equal to document page count.
  // Ending value should be less than or equal to document page count.
  const documentPagesErrors = checkAgainstDocumentPages(
    k,
    errors,
    currentPageNumbers,
    documentPages
  );

  sError = documentPagesErrors.sError;
  eError = documentPagesErrors.eError;

  return { sError, eError };
}

/**
 * @param {String} k - 'start' or 'end' from the Pages From input.
 * @param {Object} currentErrors - Object with sError and eError.
 * @param {Object} currentPageNumbers - Object with our current page numbers with the new number also.
 * @param {Number} documentPages - Page count of our PDF document.
 * @return {Object} New errors after checking.
 *
 * Check which value we are changing. Then check whether or not the page count is
 * over the document. If it is, set value to true because of the error.
 * If it isn't set document pages error to false.
 */
function checkAgainstDocumentPages(
  k,
  currentErrors,
  currentPageNumbers,
  documentPages
) {
  const { pageNumberStart, pageNumberEnd } = currentPageNumbers;

  if (k === "start" && pageNumberStart > documentPages) {
    currentErrors.sError = true;
  } else if (k === "start") {
    currentErrors.sError = false;
  } else if (k === "end" && pageNumberEnd > documentPages) {
    currentErrors.eError = true;
  } else if (k === "end") {
    currentErrors.eError = false;
  }

  return currentErrors;
}

/**
 * @param {String} k - Key: Either 'start' or 'end' in the Pages From inputs.
 * @param {Boolean} sError - Our current starting error.
 * @param {Boolean} eError - Our current ending error.
 * @return Object with the starting error and ending error.
 *
 * Since the value we changed is not a number, check to see which key we
 * changed and make the error to true. Then return the new error
 * and the current error of the other input.
 */
function valueIsNotANumber(k, sError, eError) {
  if (k === "start") {
    sError = true;
    return { sError, eError };
  } else {
    // k is 'end'
    eError = true;
    return { sError, eError };
  }
}

export default getErrors;
