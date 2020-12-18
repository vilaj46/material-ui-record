import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "./Dropdown.module.css";

import { useModalUpdate } from "../../../Context/ModalProvider";
import { useFile } from "../../../Context/FileProvider";

import openHeaders from "./actions/openHeaders.js";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Dropdown() {
  const file = useFile();
  const { openModal } = useModalUpdate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      data-testid="document-dropdown"
      className={anchorEl === null ? "closed" : "opened"}
    >
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={styles.menu}
        disabled={file.name.length > 0 ? false : true}
      >
        Document
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <HeaderButton openModal={openModal} handleClose={handleClose} />
      </StyledMenu>
    </div>
  );
}

const HeaderButton = React.forwardRef(({ openModal, handleClose }, ref) => {
  return (
    <StyledMenuItem onClick={() => openHeaders(openModal, handleClose)}>
      {/* <ListItemIcon>
        <CloseIcon fontSize="small" />
      </ListItemIcon> */}
      <ListItemText primary="Header" />
    </StyledMenuItem>
  );
});
