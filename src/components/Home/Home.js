import React from "react";
import styles from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>INSTAGRAM MEDIA DOWNLOADER</h1>
      </div>

      <div className={styles.links}>
        <div className={styles.card}>
          <Link to="/downprof" className={styles.btn}>
            DOWNLOAD IG DP & PROFILE INFO
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/downimg" className={styles.btn}>
            DOWNLOAD IG PHOTOS AND POSTS
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/downvid" className={styles.btn}>
            DOWNLOAD IG TV , VIDEOS & REELS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
