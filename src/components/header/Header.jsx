import React from "react";
import styles from "./header.module.css";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <header className={styles.Header}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles.logoContainer}>
        <Link to="/">{/* <img src={logo} alt="logo" /> */}</Link>
      </div>
    </header>
  );
}
