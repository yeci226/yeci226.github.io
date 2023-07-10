import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import BackgroundVideo from "../components/bg";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About AET</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <BackgroundVideo />
      <Header />

      <main>
        <h1>關於 AET</h1>

        <p>
          AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。
        </p>
        <p>
          迄今已連續舉辦三屆，每屆舉辦都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！
        </p>
      </main>

      <footer>
        <a
          href="https://github.com/yeci226"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Yeci
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h1 {
          font-size: 60px;
          color: #fff;
        }
        p {
          margin-bottom: 1px;
          font-size: 24px;
          color: #fff;
        }
        footer {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: #fff;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Lilita One, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          position: relative;
          overflow: hidden;
        }

        body::after {
          content: "";
          background: url("/background.gif") no-repeat center center fixed;
          background-size: cover;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
