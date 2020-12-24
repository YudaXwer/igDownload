import React, { useState, useEffect } from "react";
import styles from "./ProfileDownload.module.css";
import axios from "axios";

import Search from "../SearchBar/Search";

const ProfileDownload = () => {
  const [search, setSearch] = useState("");
  const [prevLink, setPrevLink] = useState("");
  const [bio, setBio] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const getLink = async (query) => {
    try {
      const check = await axios.get(`${query}`);
      const response = await axios.get(`${query + process.env.REACT_APP_KEY}`);
      if (response.status === 200 && check.status === 200) {
        const pictureUrl = await response.data.graphql.user.profile_pic_url_hd;
        const biography = await response.data.graphql.user.biography;
        const followersCount = await response.data.graphql.user.edge_followed_by
          .count;
        const followingCount = await response.data.graphql.user.edge_follow
          .count;
        const username = await response.data.graphql.user.username;
        const fullname = await response.data.graphql.user.full_name;

        if (pictureUrl === undefined) {
          alert("Cannot get the profile, this might be the wrong link");
        } else {
          setPrevLink(pictureUrl);
          setFollowers(followersCount);
          setFollowing(followingCount);
          setUserName(username);
          setBio(biography);
          setFullName(fullname);
          return pictureUrl;
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
      a.download = "dp.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search !== "" && search.length < 65) {
      var res = search.match(
        /(https?:\/\/(?:www\.)?instagram\.com\/p|reels?\/).*/g
      );
      if (res === null) {
        getLink(search);
      } else {
        alert("Please put a valid profile link");
      }
    }
    if (search.length > 60) {
      alert("The link you provided does not belongs to any profile");
    }
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>INSTAGRAM DP DOWNLOADER</h1>
      </div>
      <Search onSubmit={setSearch} clear={setPrevLink} />

      {prevLink !== "" ? (
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p>
              <span className={styles.span}>Biography:</span>
              <p>{bio}</p>
            </p>
            <p>
              <span className={styles.span}>username: </span>
              {userName}
            </p>
            <p>
              <span className={styles.span}>Full Name:</span>
              {fullName}
            </p>
            <p>
              <span className={styles.span}>Following:</span>
              {following}
            </p>
            <p>
              <span className={styles.span}>Followers:</span>
              {followers}
            </p>
          </div>

          <img className={styles.img} src={prevLink} alt="preview" />
        </div>
      ) : (
        <div></div>
      )}

      {search !== "" && prevLink !== "" ? (
        <button onClick={igDown} className={styles.myButton}>
          DOWNLOAD PROFILE IMAGE
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProfileDownload;
