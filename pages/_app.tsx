import "../styles/globals.css";
import "../styles/resposive.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Genesys IA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/genesys.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
