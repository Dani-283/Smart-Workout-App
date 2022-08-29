import Navigation from "@features/Navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const Layout = ({ children, workout }) => {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // const ref = useRef();

  // if (typeof window !== "undefined" && status === "loading") return null;

  // useEffect(() => {
  //   ref.current = true;
  // }, []);

  // if (!session && ref.current) {
  //   router.push("/auth/signIn");
  // }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation content={children} workout={workout} />

      {/* <main>{children}</main> */}
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
