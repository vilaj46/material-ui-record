import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => {
  let calculatedX = 0;

  // Given the position of the right click
  // calculate the position of the menu.
  // menupositio = [x, y, target, width of target].
  if (props.menuposition[2] === "Title") {
    calculatedX = props.menuposition[3] - props.menuposition[0];
  } else {
    calculatedX = props.menuposition[0];
  }

  return (
    <Menu
      elevation={0}
      anchorPosition={{
        left: props.menuposition[0],
        top: props.menuposition[1],
      }}
      getContentAnchorEl={null}
      {...props}
      style={{ top: "5px", left: `-${calculatedX}px` }}
    />
  );
});

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

export default function TitleMenu({
  displayMenu,
  menuPosition,
  closeMenu,
  id,
  insertItemAbove,
  insertItemBelow,
  removeItem,
}) {
  const [loaded, setLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const element = document.getElementById(`${id}Menu`);
    setAnchorEl(element);
    setLoaded(true);
  }, [loaded, setLoaded, setAnchorEl, anchorEl, id]);

  return (
    <div id={`${id}Menu`}>
      {loaded && (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={displayMenu}
          onClose={() => closeMenu()}
          menuposition={menuPosition}
          myid={id}
        >
          <InsertAbove
            id={id}
            insertItemAbove={insertItemAbove}
            closeMenu={closeMenu}
          />
          <InsertBelow
            id={id}
            insertItemBelow={insertItemBelow}
            closeMenu={closeMenu}
          />
          <RemoveItem id={id} removeItem={removeItem} closeMenu={closeMenu} />
        </StyledMenu>
      )}
    </div>
  );
}

const InsertAbove = React.forwardRef((props, ref) => {
  const onClick = () => {
    props.insertItemAbove(props.id);
    props.closeMenu();
  };
  return (
    <StyledMenuItem onClick={onClick}>
      <ListItemText primary="Insert Above" />
    </StyledMenuItem>
  );
});

const InsertBelow = React.forwardRef((props, ref) => {
  const onClick = () => {
    props.insertItemBelow(props.id);
    props.closeMenu();
  };
  return (
    <StyledMenuItem onClick={onClick}>
      <ListItemText primary="Insert Below" />
    </StyledMenuItem>
  );
});

const RemoveItem = React.forwardRef((props, ref) => {
  const onClick = () => {
    props.removeItem(props.id);
    props.closeMenu();
  };
  return (
    <StyledMenuItem onClick={onClick}>
      <ListItemText primary="Remove Item" />
    </StyledMenuItem>
  );
});
