import React, { useState, useEffect } from "react";
import styles from "./ImgDownload.module.css";
import axios from "axios";

import Search from "../SearchBar/Search";

const ImgDownload = () => {
  const [search, setSearch] = useState(""); // to store the formated link user provided from search box
  const [prevLink, setPrevLink] = useState(""); //to store the image link to show preview
  const [followers, setFollowers] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [comment, setComment] = useState("");
  const [like, setLike] = useState("");

  const getLink = async (query) => {
    try {
      const check = await axios.get(`${query}`);
      const response = await axios.get(`${query + process.env.REACT_APP_KEY}`);
      if (response.status === 200 && check.status === 200) {
        const pictureUrl = await response.data.graphql.shortcode_media
          .display_url;
        const followerCount = await response.data.graphql.shortcode_media.owner
          .edge_followed_by.count;
        const username = await response.data.graphql.shortcode_media.owner
          .username;
        const fullname = await response.data.graphql.shortcode_media.owner
          .full_name;
        const comments = await response.data.graphql.shortcode_media
          .edge_media_to_parent_comment.count;
        const likes = await response.data.graphql.shortcode_media
          .edge_media_preview_like.count;
        if (pictureUrl === undefined) {
          alert("Cannot get the picture, this might be the wrong link");
        } else {
          setPrevLink(pictureUrl); // setting link to pictureURL for preview
          setFollowers(followerCount);
          setUserName(username);
          setFullName(fullname);
          setComment(comments);
          setLike(likes);
          return pictureUrl; //returning picture url from CDN
        }
      } else {
        alert("Cannot get the picture, this might be the wrong link");
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
      a.download = "photo.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.message);
    }

    // fetch(`${link}`).then((response) => {
    //   response.blob().then((blob) => {
    //     let url = window.URL.createObjectURL(blob);
    //     console.log(url);
    //     let a = document.createElement("a");
    //     a.href = url;
    //     a.download = "ok.jpg";
    //     a.click();
    //   });
    //   //window.location.href = response.url;
    // });
  };

  useEffect(() => {
    // for preview , fetching the image from url prehand
    if (search !== "" && search.length < 60) {
      var res = search.match(
        /(https?:\/\/(?:www\.)?instagram\.com\/p|reels?|tv\/).*/g
      );
      //checking if url is a valid post url
      if (res !== null) {
        getLink(search);
      } else {
        alert("Please put a valid photo link");
      }
    }
    if (search.length > 62) {
      alert("Cannot find the file, maybe the account is private");
    }
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>INSTAGRAM PHOTO DOWNLOADER</h1>
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
              <span className={styles.span}>Full Name </span>
              {fullName}
            </p>
            <p>
              <span className={styles.span}>Followers:</span>
              {followers}
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
          <img className={styles.img} src={prevLink} alt="preview" />
        </div>
      ) : (
        <div></div>
      )}

      {search !== "" && search.length < 60 && prevLink !== "" ? (
        <button onClick={igDown} className={styles.myButton}>
          DOWNLOAD IMAGE
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ImgDownload;
