import React, { useState } from "react";
import styles from "./Search.module.css";

import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const [innerSearch, setInnerSearch] = useState("");

  function isValidURL(string) {
    var res = string.match(
      /(https?:\/\/(?:www\.)?instagram\.com\/([^/?#&]+)).*/g
    );
    return res !== null;
  }

  function checkQuery(string) {
    var res = string.match(/([?])/g);
    return res !== null;
  }

  const submitHandler = () => {
    if (isValidURL(innerSearch)) {
      if (checkQuery(innerSearch)) {
        props.onSubmit(innerSearch.substring(0, innerSearch.indexOf("?")));
      } else {
        props.onSubmit(innerSearch);
      }
    } else {
      alert("ENTER VALID LINK");
    }
  };

  const resetHandler = async () => {
    setInnerSearch("");
    props.onSubmit("");
    props.clear("");
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="search"
        type="text"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
        placeholder="Enter the link https://www.instagram.com/..."
      />

      <button className={styles.btn} type="button" onClick={submitHandler}>
        Check
      </button>
      <button
        className={(styles.btn, styles.btnClear)}
        type="button"
        onClick={resetHandler}
      >
        Clear
      </button>
      <Link className={styles.btn} to="/">
        Home
      </Link>
    </div>
  );
};

export default SearchBar;
