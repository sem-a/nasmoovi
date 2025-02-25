import { useEffect } from "react";
import { useGetAllPortfolioQuery } from "../../app/services/portfolio";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";
import styles from "./index.module.css";
import { Container } from "../../components/container";

const Home: React.FC = () => {
  const { data: portfolio, isLoading, isError } = useGetAllPortfolioQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || portfolio?.success === false) {
    return <div>Ошибка</div>;
  }

  return (
    <Layout>
      <div className={styles.welcome}>
        <video className={styles.videoBackground} autoPlay loop muted>
          <source src={require("../../img/video.mp4")} type="video/mp4" />
        </video>
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Настя Соколова</h1>
            <h2 className={styles.subtitle}>Ваш свадебный фотограф</h2>
            <div className={styles.arrow}></div>
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.body}>
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div key={colIndex} className={styles.col}>
              {portfolio?.portfolio
                ?.slice(colIndex * 10, (colIndex + 1) * 10)
                .map((item, index) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={`Photo ${index + 1 + colIndex * 10}`}
                    className={styles.photo}
                  />
                ))}
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
