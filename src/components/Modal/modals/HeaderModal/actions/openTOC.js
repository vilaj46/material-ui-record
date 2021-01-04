import importTocFile from "../../../../../api/importTocFile.js";

/**
 * @param {Function} openFile
 * @param {Function} handleClose
 *
 * openFile is our action. If we click the open button, open
 * the file by adding the name and blob to our state.
 * handleClose is given to us by material-ui. It will display the modal.
 */
export default function openTOC(setTitlesList) {
  setupFileInput(setTitlesList);
}

/**
 * @param {Function} openFile
 *
 * A helper function. This function will create an input with a type file.
 * This will not be added to the DOM but will instantly be clicked. If we open a file, using the
 * input we call our open file action.
 */
function setupFileInput(setTitlesList) {
  const input = document.createElement("input");

  input.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const titles = await importTocFile(file);
    setTitlesList(titles.entries);
  });

  input.setAttribute("type", "file");
  input.click();
  return input;
}
