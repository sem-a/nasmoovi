import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "../container";
import styles from "./index.module.css";
import { PATHS } from "../../paths";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight - 65) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const headerClass =
    location.pathname === "/"
      ? isScrolled
        ? styles.scrolled
        : styles.transparent
      : styles.scrolled;

  return (
    <header className={headerClass}>
      <Container>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link to={PATHS.home}>ГЛАВНАЯ</Link>
          </li>
          <li className={styles.item}>
            <Link to={PATHS.weddings}>СВАДЕБНЫЕ КАДРЫ</Link>
          </li>
          <li className={styles.item}>
            <h2 className={styles.logo}>NASMOOVI</h2>
          </li>
          <li className={styles.item}>
            <Link to={PATHS.video}>СВАДЕБНЫЕ ВИДЕО</Link>
          </li>
          <li className={styles.item}>
            <Link to={PATHS.contact}>КОНТАКТЫ</Link>
          </li>
          <li className={styles.burger}></li>
        </ul>
        <div className={styles.line}></div>
      </Container>
    </header>
  );
};
