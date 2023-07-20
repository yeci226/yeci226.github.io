import Head from "next/head";
import styles from "../styles/rule.module.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { isMobileDevice, RuleClick } from "../js/cookiesocute";

export default function Rule() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>賽制介紹</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
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

      <main>
        <Header />
        <h1 className={styles.title}>賽規</h1>

        <div className={styles.text}>
          AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。迄今已連續舉辦三屆，每屆都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={RuleClick} className={styles.button}>
            完整賽規 <i class="fa fa-external-link" />
          </button>
        </div>
      </main>
    </div>
  );
}
