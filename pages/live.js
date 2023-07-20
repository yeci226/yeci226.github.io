import Head from "next/head";
import styles from "../styles/live.module.css";
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";
import { useEffect, useState } from "react";
import { isMobileDevice } from "../js/cookiesocute";

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const videoGroups = [
    [{ id: "VC6zQ3jP7JY", title: "獎品說明" }],
    [{ id: "VU2TBiHB_u8", title: "握襙 符玄" }, { id: "VIDEO_ID_5" }],
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>比賽直播</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
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
        <h1 className={styles.title}>直播</h1>
        {videoGroups.map((videos, index) => (
          <VideoGrid key={index} videos={videos} />
        ))}
      </main>
    </div>
  );
}
