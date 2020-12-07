import React from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";

import { StyledMenuItem } from '../FileDropdown';

import openFileAction from "../actions/openFile";

const OpenButton = React.forwardRef(({ openFile, handleClose }, ref) => {
    return (
      <StyledMenuItem onClick={() => openFileAction(openFile, handleClose)}>
        <ListItemIcon>
          <FolderIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Open" />
      </StyledMenuItem>
    );
  });

  export default OpenButton;