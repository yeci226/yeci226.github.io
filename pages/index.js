import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AET 2023</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Header />

      <main>
        <h1 className={styles.title}>This is AET 2023</h1>

        <p className={styles.description}>Hello</p>

        <div className={styles.grid}>
          <a href="/" className={styles.card}>
            <h3>a</h3>
            <p>description</p>
          </a>

          <a href="/" className={styles.card}>
            <h3>a</h3>
            <p>description</p>
          </a>

          <a href="/" className={styles.card}>
            <h3>a</h3>
            <p>description</p>
          </a>

          <a href="/" className={styles.card}>
            <h3>a</h3>
            <p>description</p>
          </a>
        </div>
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
          color: inherit;
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
          background: url("/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          filter: grayscale(75%);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
