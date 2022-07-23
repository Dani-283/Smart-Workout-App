import Overview from "@features/Drawer/Drawer";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";

export default function Home() {
  return (
    <Layout>
      <NextSeo
        title={"Strong"}
        openGraph={{
          title: " strong",
        }}
      />
      <Overview />
    </Layout>
  );
}
