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
          <script
            src="https://kit.fontawesome.com/f86cbebdfa.js"
            crossOrigin="anonymous"
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
