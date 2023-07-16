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

  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/crew.json');
        const data = await response.json();
        setStaffMembers(data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchData();
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
        <div className={styles.video}>
          <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/bg.webm" type="video/webm"/>
          </video>
        </div>
      )}

      <Header />

      <main>
        <div className={styles.about_container}>
          <img src="/logoNText.png" className={styles.about_logo} />
          <img src="/logo2022.png" className={styles.about_logo} />
          <img src="/logo2021.png" className={styles.about_logo} />
          <h1 className={styles.about_title}>AET 荒野亂鬥亞洲交流錦標賽</h1>
          <div className={styles.about_textSpace}>
          AET集結來自東亞各處熱愛《荒野亂鬥》的玩家，舉辦一年一次的交流錦標賽。迄今已連續舉辦三屆，每屆都受到廣大玩家的熱情支持。馬上加入，和我們一同享受亂鬥的樂趣！
          </div>
          <div className={styles.about_videoContainer}>
          
          </div>
          <div className={styles.staffContainer}>
        <h1>工作人員</h1>
        <br/>
        <br/>
        <div className={styles.staffList}>
          {staffMembers.map((staff) => (
            <div key={staff.id} className={styles.staffMember}>
              <img src={staff.avatar} alt={staff.name} className={styles.avatar} />
              <h3>{staff.name}</h3>
              <p>{staff.job}</p>
            </div>
          ))}
          </div>
          </div>
        </div>
        
      </main>

      

    <footer/>
      
    </div>
  );
}
