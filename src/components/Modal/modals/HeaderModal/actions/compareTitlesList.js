/**
 * @param {Array} currTitlesList
 * @return {Boolean} Whether or not there have been changes to the titles list.
 *
 * Iterate over the current titles list.
 * If the entry text or page number have changed, there is a difference.
 *
 * There is no difference if there are currently errors in that title
 * since we will not be placing them on the page even if we hit 'OK'.
 */
export default function compareTitlesList(currTitlesList) {
  if (currTitlesList.length === 0) {
    return false;
  }

  if (currTitlesList.length >= 1) {
    for (let i = 0; i < currTitlesList.length; i++) {
      const currTitle = currTitlesList[i];
      const currEntry = currTitle.entry.trim();
      const currPageNumber = String(currTitle.pageNumberInPdf).trim();
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
