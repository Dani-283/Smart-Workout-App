import React, { useEffect } from "react";
import { TABS } from "@features/Navigation/constants";
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useHandleRouting from "@hooks/useHandleRouting";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";

const NavMobile = ({ value, show, open, setOpen, setValue }) => {
  const classes = useStyles();
  const router = useRouter();

  const { upsertQueryParams } = useHandleRouting();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (show) {
      upsertQueryParams([{ key: "tab", value: newValue }]);
    } else {
      router.push(`/?tab=${newValue}`);
    }
  };

  return (
    <Tabs
      orientation="horizontal"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      classes={{ root: classes.root, flexContainer: classes.flexContainer }}
    >
      {TABS.slice(0, 2).map((item, index) => (
        <Tab
          key={index}
          classes={{ selected: classes.selected, root: classes.tabButton }}
          value={item.id}
          label={
            <>
              <div>{item.icon}</div>
              <Typography>{item.title}</Typography>
            </>
          }
        />
      ))}
      <Button
        onClick={() => router.push("/new-workout")}
        className={classes.workout}
        variant="contained"
      >
        +
      </Button>
      {TABS.slice(2, 4).map((item, index) => (
        <Tab
          key={index}
          classes={{ selected: classes.selected, root: classes.tabButton }}
          value={item.id}
          label={
            <>
              <div>{item.icon}</div>
              <Typography>{item.title}</Typography>
            </>
          }
        />
      ))}
    </Tabs>
  );
};

const useStyles = makeStyles((theme) => ({
  workout: {
    position: "relative",
    top: -18,
    color: "white",
    fontWeight: 700,
    background: theme.palette.primary.blue,
    borderRadius: "50%",
    zIndex: 999,
    fontSize: 28,

    "&:hover": {
      background: theme.palette.primary.blue,
    },
  },
  selected: {},
  root: {
    paddingInline: 0,
    overflow: "visible",

    "& div": {
      overflow: "visible",
    },
    "& >span": {
      color: "white",
    },

    "& svg": {
      fill: theme.palette.common.white,
    },
    "& $selected": {
      "& p": {
        color: theme.palette.primary.blue,
      },
      "& svg": {
        fill: theme.palette.primary.blue,
      },
    },
  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    background: "#010510d9",
  },

  tabButton: {
    border: "none",
    background: "none",
    color: "white",
    padding: theme.spacing(1),
    minWidth: "unset",
    width: 60,

    "& svg": {
      fontSize: 22,
    },
    "& p": {
      fontSize: 14,
    },
  },
}));

export default NavMobile;
