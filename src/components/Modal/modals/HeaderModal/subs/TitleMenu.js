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
  let item = null;
  if (props.myid >= 0) {
    item = document.getElementById(`${props.myid}Menu`).parentElement;
  }

  let calculatedX = 0;
  if (item !== null) {
    calculatedX = Number(item.offsetWidth) - Number(props.x);
  }

  return (
    <Menu
      elevation={0}
      anchorPosition={{ left: props.x, top: props.y }}
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
  insertAbove,
}) {
  const [loaded, setLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (!loaded) {
      const ele = document.getElementById(`${id}Menu`);
      setAnchorEl(ele);
      setLoaded(true);
    }
  }, [loaded, setLoaded, setAnchorEl, anchorEl, id, menuPosition]);

  return (
    <div id={`${id}Menu`}>
      {loaded && (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={displayMenu}
          onClose={() => closeMenu()}
          x={menuPosition[0]}
          y={menuPosition[1]}
          myid={id}
        >
          <InsertAbove insertAbove={insertAbove} id={id} />
          <InsertBelow />
          <RemoveItem />
        </StyledMenu>
      )}
    </div>
  );
}

const InsertAbove = React.forwardRef((props, ref) => {
  return (
    <StyledMenuItem onClick={() => props.insertAbove(props.id)}>
      <ListItemText primary="Insert Above" />
    </StyledMenuItem>
  );
});

const InsertBelow = React.forwardRef((props, ref) => {
  return (
    <StyledMenuItem>
      <ListItemText primary="Insert Below" />
    </StyledMenuItem>
  );
});

const RemoveItem = React.forwardRef((props, ref) => {
  return (
    <StyledMenuItem>
      <ListItemText primary="Remove Item" />
    </StyledMenuItem>
  );
});
