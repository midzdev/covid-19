import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MainDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://font.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          ></meta>
          <title>TechQuid | Covid Data</title>
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
