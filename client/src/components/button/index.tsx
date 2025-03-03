import React from "react";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
