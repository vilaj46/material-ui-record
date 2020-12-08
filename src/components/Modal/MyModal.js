import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import { useModal, useModalUpdate } from "../Context/ModalProvider";

import HeaderModal from "./modals/HeaderModal/HeaderModal";

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

export default function MyModal() {
  const modal = useModal();
  const { openModal } = useModalUpdate();
  const classes = useStyles();

  const handleClose = () => {
    openModal("");
  };

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
            {modal === "headers" && <HeaderModal />}
            <div className={styles.modalButtons}>
              <Button variant="contained" color="primary">
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
