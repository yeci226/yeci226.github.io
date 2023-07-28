import Head from "next/head";
import styles from "../styles/live.module.css";
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";

export default function Live() {

  const videoGroups = [[{ id: "VC6zQ3jP7JY", title: "獎品說明" }]];

  return (
    <div className={styles.container}>
      <Head>
        <title>AET 2023 | 比賽直播</title>
        <link rel="icon" href="/icon.ico" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
      </Head>

      <div className={styles.background_video}>
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/bg.mp4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
          </video>
        </div>

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
