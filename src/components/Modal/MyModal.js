import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import { useModal, useModalUpdate } from "../Context/ModalProvider";

import HeaderModal from "./modals/HeaderModal/HeaderModal";
import useHeaders from "./hooks/useHeaders.js";

import styles from "./Modal.module.css";
import applyHeaders from "../../api/applyHeaders";

import { useFileUpdate } from "../Context/FileProvider";

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

export default function MyModal() {
  const modal = useModal();
  const headers = useHeaders();
  const { openModal } = useModalUpdate();
  const { updateFile } = useFileUpdate();
  const classes = useStyles();

  const handleClose = () => {
    openModal("");
    if (modal === "headers") {
      // clear the header data.
      headers.clear();
    }
  };

  function onOkClick() {
    if (modal === "headers") {
      const pdf = applyHeaders(headers);
      pdf
        .then((res) => {
          console.log(res);
          const { blob } = res;
          updateFile(blob);
          openModal("");
        })
        .catch((err) => {
          console.log(err);
          console.log(headers);
        });
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
              <Button variant="contained" color="primary" onClick={onOkClick}>
                OK
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
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
