import "../styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>TechQuid | Covid Data</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
