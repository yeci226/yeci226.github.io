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
        <title>賽事說明</title>
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
        <h1 className={styles.title1}>賽事說明</h1>
        <p className={styles.text1}>
          參加AET2023的隊伍們，將會先隨機分在A、B二區，參加「資格賽」階段。透過三盤二勝（每盤三局二勝）決定出每區的前4強隊伍。
        </p>
        <p className={styles.text1}>
          再由一共8支脫穎而出的隊伍參加「決賽」，透過五盤三勝制（每盤三局二勝）的考驗，讓AET2023的冠軍隊伍誕生！
        </p>
        <p className={styles.title2}>比賽日期與時間</p>
        <p className={styles.text2}>
          A區資格賽 8月12日（六）14:30~17:00、19:30~22:00
        </p>
        <p className={styles.text2}>
          B區資格賽 8月13日（日）14:30~17:00、19:30~22:00
        </p>
        <p className={styles.text2}>決賽日期：8月19日（六）18:30 起</p>

        <div className={styles.buttonContainer}>
          <button onClick={RuleClick} className={styles.button}>
            完整賽規 <i class="fa fa-external-link" />
          </button>
        </div>
      </main>
    </div>
  );
}
