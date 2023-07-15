import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { isMobileDevice } from '../js/cookiesocute';


export default function About() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>關於 AET</title>
        <link rel="icon" href="/icon.ico" />
      </Head>

      {isMobile ? (
        <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: -1, backgroundImage: 'url(/bg_img.png)' }}/>
      ) : (
        <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: -1 }}>
          <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/bg.webm" type="video/webm"/>
          </video>
        </div>
      )}

      <Header />

      <main>
        <div className={styles.about_container}>
          <img src="/logoNText.png" className={styles.about_logo} />
          <h1 className={styles.about_title}>AET 2023</h1>
          <div className={styles.about_textSpace}>
            hi
          </div>
          <div className={styles.about_videoContainer}>
            {/* Add your YouTube video embed codes here */}
          </div>
        </div>
      </main>

      <footer/>
      
    </div>
  );
}
