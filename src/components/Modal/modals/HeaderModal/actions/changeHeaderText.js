/**
 * @param {String} value - New Header Text value.
 * @param {Number} start - Could also be null, if we have 'All' selected.
 * @param {Function} callback - Hook action, setHeaderText
 *
 * @return {String}
 *
 * Check if the << and >> are there. If they are not, reset with the appropriate number.
 *
 */
export default function changeHeaderText(value, start, callback) {
  let openBracketsIndex = value.indexOf("<<");
  let closeBracketsIndex = value.indexOf(">>");
  let number = start !== null ? start : 1;

  // If we clear the entire line, just reset it.
  if (openBracketsIndex === -1 && closeBracketsIndex === -1) {
    callback(`<<${number}>>`);
    return;
  }

  // Could not find the <<
  if (openBracketsIndex === -1) {
    const newValue = findAndFixOpenBrackets(
      value,
      number,
      openBracketsIndex,
      closeBracketsIndex
    );

    callback(newValue);
  } else if (closeBracketsIndex === -1) {
    // Could not find the >>
    const newValue = findAndFixCloseBrackets(
      value,
      number,
      openBracketsIndex,
      closeBracketsIndex
    );

    callback(newValue);
  } else {
    // Everything was good!
    const openBrackets = value.slice(openBracketsIndex, openBracketsIndex + 2);
    const closeBrackets = value.slice(closeBracketsIndex);
    const newValue =
      value.slice(0, openBracketsIndex) + openBrackets + number + closeBrackets;

    callback(newValue);
  }
}

/**
 * @param {String} value
 * @param {String} number
 * @param {Number} openBracketsIndex
 * @param {Number} closeBracketsIndex
 *
 * @return {String} - The new value.
 *
 * This function only happens if we cannot find the >>.
 *
 * First thing we do is check for the >.
 * If we don't have the bracket at all, meaning we deleted them both,
 * search for the open brackets then complete our string.
 *
 * If we do have the single bracket, meaning we only deleted the one,
 * just add one of the >.  Our regex in the else statement is used
 * when we put a value inbetween the double brackets which we don't want.
 *
 * Finally, set the correct number, whether it is 1 or the Pages From start value.
 */
function findAndFixCloseBrackets(
  value,
  number,
  openBracketsIndex,
  closeBracketsIndex
) {
  let temp = "";
  // Could not find the >>
  closeBracketsIndex = value.indexOf(">");

  // If we still can't find a >.
  if (closeBracketsIndex === -1) {
    // Find the <<${number} index.
    const regex = /<<\d+/;
    closeBracketsIndex = value.search(regex);
    const numLength = number === 1 ? 1 : number.length;
    temp =
      value.slice(closeBracketsIndex, closeBracketsIndex + 2 + numLength) +
      ">>" +
      value.slice(closeBracketsIndex + 2 + numLength);
    closeBracketsIndex = temp.indexOf(">>");
  } else {
    // Temp will be for example: <<1>>
    temp =
      value.slice(0, closeBracketsIndex) +
      ">" +
      value.slice(closeBracketsIndex);
    const regex = />.>/;
    temp = temp.replace(regex, ">");
  }

  // This part is used to set the correct number.
  const openBrackets = temp.slice(openBracketsIndex, openBracketsIndex + 2);
  const closeBrackets = temp.slice(closeBracketsIndex);
  const newValue =
    temp.slice(0, openBracketsIndex) + openBrackets + number + closeBrackets;

  return newValue;
}

/**
 * @param {String} value
 * @param {String} number
 * @param {Number} openBracketsIndex
 * @param {Number} closeBracketsIndex
 *
 * @return {String} - The new value.
 *
 * This function only happens if we cannot find the <<.
 *
 * First thing we do is check for the <.
 * If we don't have the bracket at all, meaning we deleted them both,
 * search for the close brackets then complete our string.
 *
 * If we do have the single bracket, meaning we only deleted the one,
 * just add one of the <.
 *
 * Finally, set the correct number, whether it is 1 or the Pages From start value.
 */
function findAndFixOpenBrackets(
  value,
  number,
  openBracketsIndex,
  closeBracketsIndex
) {
  let temp = "";
  openBracketsIndex = value.indexOf("<");

  // If we still can't find a <.
  if (openBracketsIndex === -1) {
    // Find the ${number}>> index.
    const regex = /\d+>>/;
    openBracketsIndex = value.search(regex);
    temp =
      value.slice(0, openBracketsIndex) +
      "<<" +
      value.slice(openBracketsIndex + 1);
  } else {
    temp =
      value.slice(0, openBracketsIndex + 1) +
      "<" +
      value.slice(openBracketsIndex + 1);
  }

  // This part is used to set the correct number.
  const openBrackets = temp.slice(openBracketsIndex, openBracketsIndex + 2);
  const closeBrackets = temp.slice(closeBracketsIndex + 1);
  const newValue =
    temp.slice(0, openBracketsIndex) + openBrackets + number + closeBrackets;
  return newValue;
}
