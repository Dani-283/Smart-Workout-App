import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import BackIcon from "@mui/icons-material/KeyboardReturn";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Drawer, DrawerHeader } from "@components/Drawer/DrawerStyled";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import useHandleRouting from "@hooks/useHandleRouting";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { TABS } from "@features/Navigation/constants";
import { useRouter } from "next/router";

const NavDesktop = ({ setOpen, open, value, setValue, show }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const { upsertQueryParams } = useHandleRouting();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (show) {
      upsertQueryParams([{ key: "tab", value: newValue }]);
    }
  };

  return (
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
        {value && show ? (
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
  );
};

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

export default NavDesktop;
