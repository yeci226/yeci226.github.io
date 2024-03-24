import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const videos = [
  "/bath.mp4",
  "/both.mp4",
  "/cake.mp4",
  "/corn.mp4",
  "/cotton.mp4",
  "/food.mp4",
  "/friend.mp4",
  "/looking.mp4",
  "/prairie.mp4",
  "/watermelon.mp4",
];

const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
};

export default function RandomVideo() {
  useEffect(() => {
    const video = document.getElementById("background-video");
    const randomVideo = getRandomVideo();
    video.src = randomVideo;
    video.load();
  }, []);

  return (
    <div className={styles.background_video}>
      <video
        id="background-video"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      ></video>
    </div>
  );
}
