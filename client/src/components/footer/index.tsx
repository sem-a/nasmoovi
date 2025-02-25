import React from "react";
import { Container } from "../container";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={styles.body}>
          <p className="text">сайт от <Link target="_blank" to="https://t.me/sem_a03">sem-a</Link></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
