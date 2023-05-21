import React from "react";
import NavBar from "../navigation/Nav";
import styles from "./Home.module.css";

function Home() {
  return (
    <div
      style={{
        background: "rgb(243 244 246)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar />
      <div className={styles.home}></div>
    </div>
  );
}
export default Home;
