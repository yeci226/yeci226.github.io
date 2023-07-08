import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About AET</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Header />

      <main>
        <h1>關於 AET</h1>

        <p>我玩原神，原神怎麼了你？</p>
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
