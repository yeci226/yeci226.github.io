import Head from "next/head";
import styles from "../styles/about.module.css";
import Header from "../components/Header";
import { useState } from "react";

export default function About() {
  const [staffMembers, setStaffMembers] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>AET 2023 | 關於 AET</title>
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

        <img src="/logoNText.png" className={styles.logo} draggable="false" />
        <img src="/logo2022.png" className={styles.logo} draggable="false" />
        <img src="/logo2021.png" className={styles.logo} draggable="false" />

        <h1 className={styles.title}>AET 荒野亂鬥亞洲交流錦標賽</h1>

        <div className={styles.about_textSpace}>
          AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。迄今已連續舉辦三屆，每屆都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！
        </div>
        <div className={styles.staffContainer}>
          <h1>工作人員</h1>
          <div className={styles.staffList}>
            {staffMembers.map((staff) => (
              <div key={staff.id} className={styles.staffMember}>
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className={styles.avatar}
                  draggable="false"
                />
                <h3 className={styles.staffname}>{staff.name}</h3>
                <p className={styles.staffjob}>{staff.job}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
