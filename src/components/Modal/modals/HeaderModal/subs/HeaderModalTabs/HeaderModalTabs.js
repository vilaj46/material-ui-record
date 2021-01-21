import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

// Subs
import TabPanel from "./subs/TabPanel";
import a11yProps from "./subs/a11yProps";
import LinkTab from "./subs/LinkTab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeaderModalTabs({ headers }) {
  const classes = useStyles();
  const { tab, setTab } = headers;

  function handleChange(e, tab) {
    setTab(tab);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Numbers" {...a11yProps(0)} />
          <LinkTab label="Titles" {...a11yProps(1)} />
          <LinkTab label="Positioning" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/** Adds spacing below. */}
      <TabPanel value={tab} index={0}></TabPanel>
      <TabPanel value={tab} index={1}></TabPanel>
      <TabPanel value={tab} index={2}></TabPanel>
    </div>
  );
}
