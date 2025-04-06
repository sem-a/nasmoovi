import React from "react";
import { Layout } from "../../components/layout";
import { Container } from "../../components/container";
import styles from "./index.module.css";
import { H4 } from "../../components/title";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";

const Contact = () => {
  return (
    <Layout>
      <Container>
        <div className={styles.body}>
          <div className={styles.content}>
            <img src={require("../../img/contact.jpeg")} alt="contact" />
            <H4 textAlign="center">Настя Соколова</H4>
            <p className={styles.subtitle}>ваш свадебный фотограф</p>
            <div className={styles.buttons}>
              <Link to="https://t.me/nas_sokolova">
                <Button>telegram</Button>
              </Link>
              <Link to="https://vk.com/nasmoovi">
                <Button>вконтакте</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Contact;
