import React from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import ImgDownload from "./components/ImgDownload/ImgDownload";
import VidDownload from "./components/VidDownload/VidDownload";
import ProfileDownload from "./components/ProfileDownload/ProfileDownload";

require("dotenv").config();

const App = () => {
  return (
    <div className={styles.img}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/downimg">
            <ImgDownload />
          </Route>
          <Route path="/downvid">
            <VidDownload />
          </Route>
          <Route path="/downprof">
            <ProfileDownload />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
