import Layout from "@components/Layout";
import { NextSeo } from "next-seo";

export default function Home() {
  // const { token, setToken } = useToken();
  // console.log(token);

  // if (!token) {
  //   return <Login setToken={setToken} />;
  //   // router.push("/login");
  // }
  // console.log(token, "ttttttttt");

  return (
    <Layout>
      <NextSeo
        title={"Strong"}
        openGraph={{
          title: "strong",
        }}
      />
      {/* <Overview /> */}
      {/* <Exercises /> */}
      {/* <DrawerComponent /> */}
    </Layout>
  );
}
