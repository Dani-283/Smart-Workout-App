import { useState } from "react";

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
import ListItemText from "@mui/material/ListItemText";

import { Drawer, DrawerHeader, AppBar } from "@components/Drawer/DrawerStyled";
import { ITEMS } from "./constants";

import { Tab, Tabs } from "@mui/material";

const DrawerComponent = ({ content }) => {
  const theme = useTheme();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              paddingLeft: theme.spacing(3),
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            STRONG APP
          </Typography>
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
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            classes={{ indicator: classes.indicator, root: classes.root }}
          >
            {/* <List>
              <Tab label={<div>baaa</div>} />
              <Tab label={<div>bubuubub</div>} />
            </List> */}
            {/* <List> */}
            {ITEMS.map((item, index) => (
              <Tab
                classes={{ selected: classes.selected }}
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
            {/* </List> */}
          </Tabs>
        </Box>
      </Drawer>
      <main style={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {ITEMS.map((current) => current.id === value && current.component)}
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
}));
