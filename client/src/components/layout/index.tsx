import React from "react";
import { Header } from "../header";

type PropsLayout = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsLayout> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
