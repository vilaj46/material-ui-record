import applyHeaders from "../../../api/applyHeaders";

/**
 * onOkHeaderClick
 *
 * @param {Hook} headers - Current headers hook.
 * @param {Function} updateFile - Update file function in the FileProvider.
 * @param {Function} openModal - Open modal function in the ModalProvider.
 *
 * Check for any changes in the headers hook.
 * If there are changes then we can make the api call applyHeaders.
 *
 * If there are not any changes we need to return ___________.
 */
export default function onOkHeaderClick(headers, updateFile) {
  const changesWereMade = headers.wereChangesMade();
  if (changesWereMade) {
    const pdf = applyHeaders(headers);
    // handle errors here.
    pdf
      .then((res) => {
        const { blob } = res;
        updateFile(blob);
      })
      .catch((err) => {
        console.log(err);
        console.log(headers);
      });
  }
}
