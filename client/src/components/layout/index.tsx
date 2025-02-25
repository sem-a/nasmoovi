import React from "react";
import { Header } from "../header";
import Footer from "../footer";

type PropsLayout = {
  children: React.ReactNode;
};

export const Layout: React.FC<PropsLayout> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
