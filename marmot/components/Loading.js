import React from 'react';
import styles from "../styles/Home.module.css";


const Loading = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader_logo}>
        <div className={styles.spinner}/>
      </div>
    </div>
  );
};

export default Loading;