import React from "react";
import styles from "./index.module.css";
import { Layout } from "antd";
import { CustomCard } from "../form";
import MenuAdmin from "../menu-admin";
import { H4 } from "../title";
import Loading from "../loading";
import { useCurrentQuery } from "../../app/services/auth";

type Props = {
  children: React.ReactNode;
  paddingTop?: string;
};

export const Container: React.FC<Props> = ({
  children,
  paddingTop = "0px",
}) => {
  return (
    <div style={{ paddingTop }} className={styles.container}>
      {children}
    </div>
  );
};

export const AdminContainer: React.FC<Props> = ({ children }) => {
  const { data: user, isLoading, isError } = useCurrentQuery();

  const isAdmin = !user ? false : user.admin;

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Ошибка</h1>;
  }

  return (
    <Layout>
      <Container>
        <div className={styles.adminUser}>
          <CustomCard backgroundColor="#f6f6f4">
            <div className={styles.sidebar}>
              <H4 color="#776F60">Администратор:</H4>
              <H4 color="#776F60">{user?.name}</H4>
              <MenuAdmin isAdmin={isAdmin} />
            </div>
          </CustomCard>
          <CustomCard backgroundColor="#f6f6f4">{children}</CustomCard>
        </div>
      </Container>
    </Layout>
  );
};
