import React from "react";
import styles from "./index.module.css";

type PropsContainer = {
  children: React.ReactNode;
  paddingTop?: string;
};

export const Container: React.FC<PropsContainer> = ({
  children,
  paddingTop = "0px",
}) => {
  return (
    <div style={{ paddingTop }} className={styles.container}>
      {children}
    </div>
  );
};
