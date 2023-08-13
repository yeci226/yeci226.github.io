import Head from "next/head";
import styles from "../styles/live.module.css";
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";
import { useEffect, useState } from "react";
import { isMobileDevice } from "../js/cookiesocute";

export default function Live() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  let videoGroups = [];

  if (isMobile) {
    videoGroups = [
      [{ id: "emVpc3haECg", title: "B1下午" }],
      [{ id: "5-rvZQOhE9g", title: "B2下午" }],
      [{ id: "zI8MnNIdGQU", title: "B1晚上" }],
      [{ id: "T5KGzNhnE9g", title: "B2晚上" }],
      [{ id: "hcu-gAr6BUg", title: "A1下午" }],
      [{ id: "LISblyDvkQM", title: "A2下午" }],
      [{ id: "hr4d6M5tuTU", title: "A1晚上" }],
      [{ id: "7jQdrfaxOmo", title: "A2晚上" }],
      [{ id: "839mmf-5800", title: "資格賽抽籤" }],
      [{ id: "VC6zQ3jP7JY", title: "獎品說明" }],
    ];
  } else {
    videoGroups = [
      [
        { id: "emVpc3haECg", title: "B1下午" },
        { id: "5-rvZQOhE9g", title: "B2下午" },
      ],
      [
        { id: "", title: "B1晚上" },
        { id: "T5KGzNhnE9g", title: "B2晚上" },
      ],
      [
        { id: "hcu-gAr6BUg", title: "A1下午" },
        { id: "LISblyDvkQM", title: "A2下午" },
      ],
      [
        { id: "w_RK7odz7TU", title: "A1晚上" },
        { id: "7jQdrfaxOmo", title: "A2晚上" },
      ],
      [
        { id: "839mmf-5800", title: "資格賽抽籤" },
        { id: "VC6zQ3jP7JY", title: "獎品說明" },
      ],
    ];
  }

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
        ></video>
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
