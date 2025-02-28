import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Container } from "../../components/container";
import styles from "./index.module.css";
import { useGetAllWeddingsQuery } from "../../app/services/wedding";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import WeddingPreview from "../../components/preview";
import { PATHS } from "../../paths";

const WeddingList = () => {
  const { data: weddings, isLoading, isError } = useGetAllWeddingsQuery();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !weddings?.wedding || weddings?.success === false) {
    return <div>Ошибка!</div>;
  }

  const weddingList = weddings.wedding.map((item, index) => {
    const isEven = index % 2 === 0;
    let alignItems = windowWidth < 500 ? "center" : "flex-start";
    if (isEven) {
      alignItems = windowWidth < 500 ? "center" : "flex-end";
    }

    return (
      <div className={styles.weddingsContainer} key={item.id}>
        <Link
          to={{
            pathname: `${PATHS.weddingOne}/${item.id}`,
          }}
        >
          <WeddingPreview
            id={item.id}
            name={item.name}
            alignItems={alignItems}
          />
        </Link>
      </div>
    );
  });

  return <div>{weddingList}</div>;
};

const Weddings = () => {
  return (
    <Layout>
      <Container>
        <WeddingList />
      </Container>
    </Layout>
  );
};

export default Weddings;
