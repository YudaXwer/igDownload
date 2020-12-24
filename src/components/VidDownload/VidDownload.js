import React, { useState, useEffect } from "react";
import styles from "./VidDownload.module.css";
import axios from "axios";

import Search from "../SearchBar/Search";

const VidDownload = () => {
  const [search, setSearch] = useState(""); // to store the formated link user provided from search box
  const [prevLink, setPrevLink] = useState(""); //to store the image link to show preview
  const [dur, setDur] = useState("");
  const [followers, setFollowers] = useState("");
  const [views, setViews] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [videoType, setVideoType] = useState("");
  const [comment, setComment] = useState("");
  const [like, setLike] = useState("");

  const getLink = async (query) => {
    try {
      const check = await axios.get(`${query}`);
      const response = await axios.get(`${query + process.env.REACT_APP_KEY}`);
      if (response.status === 200 && check.status === 200) {
        const videoUrl = await response.data.graphql.shortcode_media.video_url;
        const duration = await response.data.graphql.shortcode_media
          .video_duration;
        const followerCount = await response.data.graphql.shortcode_media.owner
          .edge_followed_by.count;
        const viewsCount = await response.data.graphql.shortcode_media
          .video_view_count;
        const username = await response.data.graphql.shortcode_media.owner
          .username;
        const fullname = await response.data.graphql.shortcode_media.owner
          .full_name;
        const type = await response.data.graphql.shortcode_media.product_type;
        const comments = await response.data.graphql.shortcode_media
          .edge_media_to_parent_comment.count;
        const likes = await response.data.graphql.shortcode_media
          .edge_media_preview_like.count;
        //checking if videoUrl has the link. if not then it could be photo link
        if (videoUrl === undefined) {
          alert("Cannot get the video, this might be a picture link");
        } else {
          setPrevLink(videoUrl); // setting link to videoURL for preview
          setDur(duration);
          setFollowers(followerCount);
          setUserName(username);
          setFullName(fullname);
          setVideoType(type);
          setViews(viewsCount);
          setComment(comments);
          setLike(likes);
          return videoUrl; //returning picture url from CDN
        }
      }
    } catch (error) {
      console.log(error.name + ":" + error.message);
      alert("The link you provided is wrong");
    }
  };

  const igDown = async () => {
    try {
      let downloadLink = prevLink;
      const response = await fetch(`${downloadLink}`);

      const blob = await response.blob();
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search !== "" && search.length < 60) {
      var res = search.match(
        /(https?:\/\/(?:www\.)?instagram\.com\/p|reels?|tv\/).*/g
      );
      //checking if url is a valid video post url
      if (res !== null) {
        getLink(search);
      } else {
        alert("Please put a valid video link");
      }
    }
    if (search.length > 62) {
      alert("Cannot find the file, maybe the account is private");
    }
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>INSTAGRAM VIDEO DOWNLOADER</h1>
      </div>
      <Search onSubmit={setSearch} clear={setPrevLink} />

      {prevLink !== "" ? (
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p>
              <span className={styles.span}>Username:</span>
              {userName}
            </p>
            <p>
              <span className={styles.span}>Full Name: </span>
              {fullName}
            </p>
            <p>
              <span className={styles.span}>Followers:</span>
              {followers}
            </p>
            <p>
              <span className={styles.span}>Video Type:</span>
              {videoType}
            </p>
            <p>
              <span className={styles.span}>Duration:</span>
              {dur} seconds
            </p>
            <p>
              <span className={styles.span}>Views:</span>
              {views}
            </p>
            <p>
              <span className={styles.span}>Likes:</span>
              {like}
            </p>
            <p>
              <span className={styles.span}>Comments:</span>
              {comment}
            </p>
          </div>
          <video
            autoPlay
            muted
            className={styles.vid}
            src={prevLink}
            alt="preview"
          />
        </div>
      ) : (
        <div></div>
      )}

      {search !== "" && search.length < 60 && prevLink !== "" ? (
        <button onClick={igDown} className={styles.myButton}>
          DOWNLOAD VIDEO
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VidDownload;
