import React from "react";
import { Container } from "../container";
import styles from "./index.module.css";

export const Header = () => {
  return (
    <header>
      <Container>
        <ul className={styles.menu}>
          <li className={styles.item}>ГЛАВНАЯ</li>
          <li className={styles.item}>СВАДЕБНЫЕ КАДРЫ</li>
          <li className={styles.item}>
            <h2 className={styles.logo}>NASMOOVI</h2>
          </li>
          <li className={styles.item}>СВАДЕБНЫЕ ВИДЕО</li>
          <li className={styles.item}>КОНТАКТЫ</li>
        </ul>
        <div className={styles.line}></div>
      </Container>
    </header>
  );
};
