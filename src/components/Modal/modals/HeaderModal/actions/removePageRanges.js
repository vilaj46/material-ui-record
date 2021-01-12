export default function removePageranges(titlesList) {
  const newTitlesList = titlesList.map((title, i) => {
    const regex = /\[pages \d+-\d+\]/gi;
    const entry = title.entry;

    const startIndex = entry.search(regex);

    if (startIndex !== -1) {
      // Found it! Replace the entry.
      // Find the index of ] and remove everything in between.
      const endIndex = entry.indexOf("]", startIndex);
      const newEntry = removeIndexRange(entry, startIndex, endIndex);
      const newTitle = { ...title, entry: newEntry };
      return newTitle;
    } else {
      return title;
    }
  });

  return newTitlesList;
}

function removeIndexRange(str, start, end) {
  let newString = "";
  for (let i = 0; i < str.length; i++) {
    if (i >= start && i <= end) {
      continue;
    } else {
      newString += str[i];
    }
  }
  return newString;
}
