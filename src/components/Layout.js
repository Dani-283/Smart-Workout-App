import DrawerComponent from "@features/Drawer/Drawer";
import Head from "next/head";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DrawerComponent content={children} />
      {/* <main>{children}</main> */}
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
