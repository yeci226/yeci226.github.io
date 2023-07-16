import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { SignUpClick, isMobileDevice } from '../js/cookiesocute';

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    
    
    <div className={styles.container}>
      
      <Head>
        <title>AET 2023</title>
        <link rel="icon" href="/icon.ico" />
        <meta name="description" content="AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。迄今已連續舉辦三屆，每屆都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！"/>
        <meta name="keywords" content="AET, 荒野亂鬥, 荒野比賽, 荒野亂鬥比賽"/>
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0"/>
        <noscript>
          <p>此網頁需要支援 JavaScript 才能正確運行，請先至你的瀏覽器設定中開啟 JavaScript。</p>
        </noscript>
      </Head>

      {isMobile ? (
        <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: -1, backgroundImage: 'url(/bg_img.png)' }}/>
      ) : (
        <div className={styles.video}>
          <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/bg.webm" type="video/webm"/>
          </video>
        </div>
      )}

      
      
      <Header />

      <main>

        <div className={styles.logoContainer}>
          <img src="/AET2023-1.png" alt="Logo" className={styles.logo} />
        </div>
        
        <div className={styles.buttonContainer}>
          <button onClick={SignUpClick} className={styles.button}>
            立即報名
          </button>
        </div>
        

      </main>

      <footer>
       
      </footer>

      
    </div>
  );
}
