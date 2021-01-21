import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

// Subs - some subs below.
import HeaderModal from "./modals/HeaderModal/HeaderModal";

// Custom Hooks
import useHeaders from "./hooks/useHeaders.js";

// Providers
import { useFileUpdate } from "../Context/FileProvider";
import { useModal, useModalUpdate } from "../Context/ModalProvider";

// OK Actions
import onOkHeaderClick from "./actions/onOkHeaderClick.js";

// CSS
import styles from "./Modal.module.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%",
    maxHeight: "65%",
    position: "absolute",
    top: "10%",
    overflow: "auto",
  },
}));

function OkButton({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      OK
    </Button>
  );
}

function CancelButton({ onClick }) {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Cancel
    </Button>
  );
}

function MyModal() {
  const modal = useModal();
  const headers = useHeaders();
  const { openModal } = useModalUpdate();
  const { updateFile } = useFileUpdate();
  const classes = useStyles();

  /**
   * Default action when the modal is faded off of or when we
   * click 'ok' or 'close'. Clear the header data.
   */
  function handleClose() {
    openModal("");
    if (modal === "headers") {
      headers.clear();
    }
  }

  /**
   * Once we click ok, perform the necessary action.
   */
  function onOkClick() {
    if (modal === "headers") {
      // Does not need to return pdf. We had const pdf = onOkHeaderClick(...)
      onOkHeaderClick(headers, updateFile, openModal);
      handleClose();
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal.length > 0}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableScrollLock={true}
        id="customStylesForScrolling"
      >
        <Fade in={modal.length > 0} id="modalFade">
          <div className={classes.paper}>
            {modal === "headers" && <HeaderModal headers={headers} />}
            <div className={styles.modalButtons}>
              <OkButton onClick={onOkClick} />
              <CancelButton onClick={handleClose} />
            </div>
            <CloseIcon
              onClick={handleClose}
              size="small"
              className={styles.headerX}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default MyModal;
