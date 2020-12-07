import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useFile, useFileUpdate } from "../../../Context/FileProvider";

// Sub Component 
import OpenButton from './subs/OpenButton';
import CloseButton from './subs/CloseButton';

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

export const StyledMenuItem = withStyles((theme) => ({
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
  const updateFile = useFileUpdate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        File
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <OpenButton openFile={updateFile.openFile} handleClose={handleClose} />
        <CloseButton
          closeFile={updateFile.closeFile}
          handleClose={handleClose}
          file={file}
        />
      </StyledMenu>
    </div>
  );
}

// const OpenButton = React.forwardRef(({ openFile, handleClose }, ref) => {
//   return (
//     <StyledMenuItem onClick={() => openFileAction(openFile, handleClose)}>
//       <ListItemIcon>
//         <FolderIcon fontSize="small" />
//       </ListItemIcon>
//       <ListItemText primary="Open" />
//     </StyledMenuItem>
//   );
// });

// const CloseButton = ({ closeFile, handleClose, file }) => {
//   const disabled =
//     file.name.length === 0 || file.blob.length === 0 ? true : false;
//   return (
//     <StyledMenuItem
//       onClick={() => closeFileAction(closeFile, handleClose)}
//       disabled={disabled}
//     >
//       <ListItemIcon>
//         <CloseIcon fontSize="small" />
//       </ListItemIcon>
//       <ListItemText primary="Exit" />
//     </StyledMenuItem>
//   );
// };
