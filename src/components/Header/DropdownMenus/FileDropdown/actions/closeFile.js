/**
 * @param {Function} closeFile 
 * @param {Function} handleClose 
 * 
 * closeFile is our action. If we click the exit button, close
 * the file by removing the name and blob from our state.
 * handleClose is given to us by material-ui. If we click off the modal,
 * it will hide it.
 */
export default function closeFileAction(closeFile, handleClose) {
  closeFile();
  handleClose();
}
