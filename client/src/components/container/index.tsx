import React from "react";
import styles from "./index.module.css";

type PropsContainer = {
  children: React.ReactNode;
};

export const Container: React.FC<PropsContainer> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};