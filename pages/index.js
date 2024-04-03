import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RandomVideo from "../js/randomBg";

export default function Home() {
  const router = useRouter();
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const loggedInUserCookie = cookies.find((cookie) =>
      cookie.startsWith("loggedInUser=")
    );
    const loggedInUser = loggedInUserCookie
      ? loggedInUserCookie.split("=")[1]
      : null;
    setLoggedInUsername(loggedInUser);
  });

  const handleBrowseBooksClick = () => {
    router.push("/books");
  };

  const handleMyBooksClick = () => {
    router.push("/list");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>土撥鼠圖書館</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="description" content="土撥鼠第一次用刷子洗澡" />
        <meta property="og:image" content="/icon.png" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
        <noscript>
          <p>
            此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟
            JavaScript。
          </p>
        </noscript>
      </Head>

      <div className={styles.background_video}>
        <RandomVideo />
      </div>

      <Header />
      <Footer />
      <div className={styles.title}>
        <h1>歡迎來到土撥鼠圖書館</h1>
        <p>有兩件事可以改變我們的生活：你遇見什麼人，以及你讀什麼書</p>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleBrowseBooksClick} className={styles.booksBtn}>
          瀏覽書籍
        </button>
        {loggedInUsername && (
          <button onClick={handleMyBooksClick} className={styles.myBooksBtn}>
            我的書籍
          </button>
        )}
      </div>
    </div>
  );
}
