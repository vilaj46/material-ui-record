export default function addPageRanges(titlesList) {
  const newTitlesList = titlesList.map((title, i) => {
    // Get the page number of the current title.
    const fromPageNumber = title.pageNumberInPdf;
    let toPageNumber = null;
    let range = "";

    // Get the page number of the next title if it exists and subtract 1.
    try {
      toPageNumber = Number(titlesList[i + 1].pageNumberInPdf);

      // Check the difference, if its one do not add the page range.

      if (toPageNumber === null) {
        return title;
      } else {
        const difference = toPageNumber - Number(fromPageNumber);

        // Create the page range [pages _-_]
        if (difference > 1) {
          range = ` [pages ${fromPageNumber}-${toPageNumber - 1}]`;
          const newEntry = title.entry + range;
          const newTitle = { ...title, entry: newEntry };
          return newTitle;
        } else {
          return title;
        }
      }
    } catch (err) {
      //   toPageNumber = null;
      return title;
    }
  });

  return newTitlesList;
}
