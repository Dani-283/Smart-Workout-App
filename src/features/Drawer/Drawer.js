import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import BackIcon from "@mui/icons-material/KeyboardReturn";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { Drawer, DrawerHeader, AppBar } from "@components/Drawer/DrawerStyled";
import { TABS, TABNAMES } from "./constants";

import { Button, Tab, Tabs } from "@mui/material";
import useHandleRouting from "@hooks/useHandleRouting";
import { useRouter } from "next/router";
import Image from "next/image";

const DrawerComponent = ({ content, workout }) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const { upsertQueryParams } = useHandleRouting();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (!workout) {
      setValue(newValue);
      upsertQueryParams([{ key: "tab", value: newValue }]);
    }
  };

  useEffect(() => {
    if (router.isReady) setValue(router.query?.tab || TABNAMES.OVERVIEW);
  }, [router.query.tab, router.isReady]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="info"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              paddingLeft: theme.spacing(2.5),
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Button
            onClick={() => router.push("/new-workout")}
            className={classes.workout}
            variant="contained"
          >
            + NEW WORKOUT
          </Button>
          <Button variant="outlined" className={classes.profileButton}>
            <PersonOutlineIcon sx={{ fill: "#0288d1" }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              padding: theme.spacing(1, 2),
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="white" />
            ) : (
              <ChevronLeftIcon color="info" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 224,
          }}
        >
          {value && !workout ? (
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              classes={{ indicator: classes.indicator, root: classes.root }}
            >
              {TABS.map((item, index) => (
                <Tab
                  key={index}
                  classes={{ selected: classes.selected }}
                  value={item.id}
                  label={
                    <ListItem
                      key={item.title}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  }
                />
              ))}
            </Tabs>
          ) : (
            <ListItem
              className={classes.root}
              onClick={() => router.back()}
              key={"back"}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 5,
                  py: 2.5,
                }}
              >
                <BackIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                />
                <ListItemText primary="BACK" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </Drawer>
      <main style={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {workout
          ? content
          : TABS.map((current) => current.id === value && current.component)}
      </main>
    </Box>
  );
};

export default DrawerComponent;

const useStyles = makeStyles((theme) => ({
  indicator: {
    background: theme.palette.primary.blue,
    marginRight: 1,
    width: 3,
  },
  selected: {},
  root: {
    background: theme.palette.background.secondary,

    "& .MuiListItemText-root": {
      color: "white",
    },

    "& svg": {
      fill: theme.palette.common.white,
    },
    "& $selected": {
      "& .MuiListItemText-root": {
        color: theme.palette.primary.blue,
      },
      "& svg": {
        fill: theme.palette.primary.blue,
      },
    },
  },

  workout: {
    marginLeft: "auto",
    color: "white",
    fontWeight: 700,
    background: theme.palette.primary.blue,
    borderRadius: 20,

    "&:hover": {
      background: theme.palette.primary.blue,
      opacity: 0.95,
    },
  },

  profileButton: {
    borderRadius: "50%",
    borderColor: theme.palette.primary.blue,
    borderWidth: "2px",
    padding: 5,
    width: "fit-content",
    minWidth: "unset",
    marginInline: theme.spacing(3),

    "&:hover": {
      borderColor: theme.palette.primary.blue,
      borderWidth: "2px",
      background: `${theme.palette.primary.blue}33`,
    },
  },
}));
