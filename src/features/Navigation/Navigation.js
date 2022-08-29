import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import LogoutIcon from "@mui/icons-material/Logout";
import { DrawerHeader, AppBar } from "@components/Drawer/DrawerStyled";
import { TABS, TABNAMES } from "./constants";

import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import NavDesktop from "@features/Navigation/NavDesktop";
import clsx from "clsx";
import NavMobile from "./NavMobile";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import AccessDenied from "@components/AccessDenied";

const Navigation = ({ content, workout }) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = typeof window !== "undefined" && status === "loading";
  const show = session && status !== "loading" && typeof window !== "undefined";
  console.log(show, "ss");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const def = router.route === "/" && TABNAMES.OVERVIEW;
    if (router.isReady) setValue(router.query?.tab || def);
  }, [router.query.tab, router.isReady]);

  return (
    <Box sx={{ display: "flex" }}>
      {show && (
        <AppBar position="fixed" open={open} className={classes.appBar}>
          <Toolbar disableGutters className={classes.toolbar}>
            <div className={classes.desktopHidden}>
              <NavMobile
                setOpen={setOpen}
                open={open}
                value={value}
                setValue={setValue}
                show={!workout}
              />
            </div>
            <IconButton
              color="info"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.mobileHidden}
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

            {show && (
              <Button
                onClick={() => signOut()}
                variant="outlined"
                className={clsx(classes.profileButton, classes.mobileHidden)}
              >
                <LogoutIcon sx={{ fill: "#0288d1" }} />
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
      {show && (
        <div className={classes.drawerHide}>
          <NavDesktop
            setOpen={setOpen}
            open={open}
            value={value}
            setValue={setValue}
            show={!workout}
          />
        </div>
      )}
      <main style={{ flexGrow: 1, p: 3 }}>
        {session && <DrawerHeader />}
        {workout ? (
          content
        ) : loading ? null : show ? ( // TABS.map((current) => current.id === value && current.component)
          TABS.map((current) => current.id === value && current.component)
        ) : (
          <AccessDenied />
        )}
      </main>
    </Box>
  );
};

export default Navigation;

const useStyles = makeStyles((theme) => ({
  appBar: {
    overflow: "visible",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      top: "auto",

      bottom: 0,
      background: "white",
    },
  },

  toolbar: {
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      paddingInline: 24,
    },
  },

  mobileHidden: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      display: "none",
    },
  },

  desktopHidden: {
    width: "100%",
    overflow: "visible",
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      display: "none",
    },
  },

  drawerHide: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      display: "none",
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

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      display: "none",
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
