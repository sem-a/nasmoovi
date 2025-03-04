import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "../container";
import styles from "./index.module.css";
import { PATHS } from "../../paths";

const menu = [
  {
    name: "ГЛАВНАЯ",
    path: PATHS.home,
  },
  {
    name: "СВАДЕБНЫЕ КАДРЫ",
    path: PATHS.weddings,
  },
  {
    name: "NASMOOVI",
    path: "",
  },
  {
    name: "СВАДЕБНЫЕ ВИДЕО",
    path: PATHS.video,
  },
  {
    name: "КОНТАКТЫ",
    path: PATHS.contact,
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = (isMenuOpen: boolean) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClass =
    location.pathname === "/"
      ? isScrolled
        ? styles.scrolled
        : styles.transparent
      : styles.scrolled;

  return (
    <header className={headerClass}>
      <Container>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
          {menu.map((item) => {
            return item.name !== "NASMOOVI" || !isMenuOpen ? (
              <li className={styles.item} key={item.path}>
                {item.name === "NASMOOVI" ? (
                  <h2 className={styles.logo}>{item.name}</h2>
                ) : (
                  <Link to={item.path}>{item.name}</Link>
                )}
              </li>
            ) : null;
          })}
          <li
            className={styles.burger}
            onClick={() => {
              toggleMenu(isMenuOpen);
            }}
          >
            <div className={styles.burgerLine}></div>
          </li>
        </ul>
        <div className={styles.line}></div>
      </Container>
    </header>
  );
};
