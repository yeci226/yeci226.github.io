import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { isMobileDevice, ChangeClick } from "../js/cookiesocute";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>AET 2023 | 主頁</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="description"
          content="AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。迄今已連續舉辦三屆，每屆都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！"
        />
        <meta property="og:image" content="/logoNText.png" />
        <meta name="keywords" content="AET, 荒野亂鬥, 荒野比賽, 荒野亂鬥比賽" />
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

      {isMobile ? (
        <div
          className={styles.background_image}
          style={{ backgroundImage: "url(/bg_img.png)" }}
        />
      ) : (
        <div className={styles.background_video}>
          <video
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/bg.webm" type="video/webm" />
          </video>
        </div>
      )}

      <Header />


        <div className={styles.logoContainer}>
          <img
            src="/AET2023-1.png"
            alt="Logo"
            draggable="false"
            className={styles.logo}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={ChangeClick} className={styles.button}>
            修改報名資料
          </button>
        </div>

    </div>
  );
}
