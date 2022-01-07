import "../styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="shortcut icon" href="./image/favicon.ico" />
        <link rel="shortcut icon apple-touch-icon" type="image/x-icon" href="./image/icon.ico" />
        <title>Coronavirus Statistics - TechQuid</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}