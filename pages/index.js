import Layout from "@components/Layout";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <Layout>
      <NextSeo
        title={"Strong"}
        openGraph={{
          title: "strong",
        }}
      />
    </Layout>
  );
}
