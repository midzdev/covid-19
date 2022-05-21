import "../styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="shortcut icon" href="./image/favicon.png" />
        <link rel="apple-touch-icon" href="./image/apple-touch-icon.png" />
        <link rel="manifest" href="./manifest.json" />
        <title>Coronavirus Statistics</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}