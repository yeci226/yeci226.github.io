import styles from "../styles/live.module.css";

export default function VideoGrid({ videos }) {
  let gridClass, videoClass;

  switch (videos.length) {
    case 1:
      gridClass = styles.gridOne;
      videoClass = styles.video_container_one;
      break;
    case 2:
      gridClass = styles.gridTwo;
      videoClass = styles.video_container_two;
      break;
    case 4:
      gridClass = styles.gridFour;
      videoClass = styles.video_container_four;
      break;
    default:
      gridClass = styles.gridOne;
      videoClass = styles.video_container_one;
      break;
  }

  return (
    <div className={gridClass}>
      {videos.map((video, index) => (
        <div key={index} className={videoClass}>
          {video.title && (
            <div className={styles.overlayText}>▼ {video.title}</div>
          )}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
