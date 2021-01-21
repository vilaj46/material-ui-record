/**
 * @param {Number} potential
 * @return {Boolean}
 * Checks if the potential number is a number.
 */
function isValidNumber(potential) {
  if (Number(potential) === 0) {
    return false;
  }

  return true;
}

export default isValidNumber;
