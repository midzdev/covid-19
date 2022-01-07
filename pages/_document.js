import Document, { Html, Head, Main, NextScript } from "next/document";

export default class DOC extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://font.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon apple-touch-icon" type="image/x-icon" href="./image/icon.ico" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
