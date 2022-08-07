import Overview from "@features/Drawer/Drawer";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import Exercises from "@features/Exercises";
import DrawerComponent from "@features/Drawer/Drawer";

export default function Home() {
  return (
    <Layout>
      <NextSeo
        title={"Strong"}
        openGraph={{
          title: " strong",
        }}
      />
      {/* <Overview /> */}
      {/* <Exercises /> */}
      {/* <DrawerComponent /> */}
    </Layout>
  );
}
