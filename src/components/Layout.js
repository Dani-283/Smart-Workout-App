import Navigation from "@features/Navigation";
import Head from "next/head";
import PropTypes from "prop-types";

const Layout = ({ children, workout }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation content={children} workout={workout} />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
