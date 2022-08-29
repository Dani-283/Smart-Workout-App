import { signIn } from "next-auth/react";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { Typography } from "@mui/material";

export default function AccessDenied() {
  const classes = useStyles();

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(180deg, rgba(10, 39, 51, 0.8), rgba(10, 39, 51, 0.8))",
      }}
    >
      <div className={classes.wrapper} />
      <div className={classes.content}>
        <div className={classes.cardWrapper}>
          <Image src="/logo.png" width={280} height={60} alt="App Logo" />
          <div className={classes.cardContent}>
            <Typography component="p" variant="h4">
              Think less. Lift more.
            </Typography>
            <div className={classes.hr} />

            <div style={{ marginBottom: 0 }}>
              <button onClick={() => signIn("google")}>
                Click here to Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img
        src="/login_image.jpg"
        alt="Pattern Background"
        layout="fill"
        className={classes.styledPattern}
      /> */}
      <div
        src="/login_image.jpg"
        alt="Pattern Background"
        layout="fill"
        className={classes.styledPattern}
      />
    </div>
    // <div style={{ position: "fixed", width: "100%", height: "100%" }}>
    //   <h1>Access Denied</h1>
    //   <p>
    //     <a
    //       href="/api/auth/signin"
    //       onClick={(e) => {
    //         e.preventDefault();
    //         signIn();
    //       }}
    //     >
    //       You must be signed in to view this page
    //     </a>
    //   </p>
    // </div>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    transform: "rotate(11deg) translate(-20%, -10%)",
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "70%",
    height: "150%",
    backgroundColor: "#010d19",
    zIndex: 2,

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      left: "-50px",
      width: "80%",
    },

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      width: "200%",
      backgroundColor: "unset",
    },
  },
  hr: {
    width: "98%",
    height: "1px",
    marginInline: "auto",
    background: "#ffffff4d",
  },
  content: {
    position: "relative",
    display: "flex",
    padding: "30px",
    width: "100%",
    height: "100vh",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2,
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      justifyContent: "center",
    },
  },
  cardWrapper: {
    display: "flex",
    width: "100%",
    maxWidth: "400px",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    marginLeft: "15%",
    fontSize: "1.2rem",
    zIndex: 3,

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      marginLeft: "0px",
    },
  },
  cardContent: {
    width: "100%",
    background: "#010d194d",
    borderRadius: "4px",
    padding: "24px",
    margin: "16px",

    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      background: "#ffffff0d",
    },

    "& p": {
      color: "white",
      marginBottom: 24,
    },

    "& button": {
      lineHeight: 1.5715,
      position: "relative",
      display: "inline-block",
      fontWeight: 400,
      textAlign: "center",
      border: "1px solid transparent",
      boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
      touchAction: "manipulation",
      height: "42px",
      padding: "4px 15px",
      fontSize: "16px",
      borderRadius: "4px",
      color: "white",
      background: theme.palette.primary.blue,
      width: "100%",
      marginTop: 24,
      fontWeight: 600,
    },
  },

  styledPattern: {
    position: "absolute",
    objectFit: "cover",
    minWidth: "100%",
    minHeight: "100%",
    top: "0",
    right: "0",
    zIndex: 1,
    backgroundImage:
      'linear-gradient(180deg, rgba(10, 39, 51, 0.8), rgba(10, 39, 51, 0.8)), url("/login_image.jpg")',
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      backgroundPositionY: "top",
      backgroundPositionX: "46%",
    },
  },
}));
