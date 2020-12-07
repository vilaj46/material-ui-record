import React from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";

import { StyledMenuItem } from '../FileDropdown';

import closeFileAction from "../actions/closeFile";

export default function CloseButon({ closeFile, handleClose, file }) {
    // Disables close button if we have no file opened.
    const disabled =
      file.name.length === 0 || file.blob.length === 0 ? true : false;

    return (
      <StyledMenuItem
        onClick={() => closeFileAction(closeFile, handleClose)}
        disabled={disabled}
      >
        <ListItemIcon>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Exit" />
      </StyledMenuItem>
    );
  };
