import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/prize.module.css";
import Header from "../components/Header";
import Loading from '../components/Loading';


export default function Prize() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/prize/2.png",
    "/prize/3.png",
    "/prize/4.png",
    "/prize/5.png",
    "/prize/6.png",
    "/prize/7.png",
    "/prize/8.png",
    "/prize/9.png",
  ];

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  // const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []);
  
  {loading && <Loading />}*/

  return (
    <div className={styles.container}>
    
      <Head>
        <title>AET 2023 | 獎品</title>
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
        <h1 className={styles.title}>獎品</h1>

        <div className={styles.mainContainer}>
          <div className={styles.album}>
            <button onClick={handlePrev}>❮</button>
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {images.map((img, index) => (
                <img key={index} src={img} alt="Prize" />
              ))}
            </div>
            <div className={styles.indicatorContainer}>
              {images.map((_, index) => (
                <div
                  className={`${styles.indicator} ${
                    index === currentImage ? styles.activeIndicator : ""
                  }`}
                  key={index}
                />
              ))}
            </div>

            <button onClick={handleNext}>❯</button>
          </div>

          <div className={styles.staticImagesContainer}>
            <img src="/prize/0.png" />
            <img src="/prize/1.png" />
          </div>
        </div>
      </main>
    </div>
  );
}
