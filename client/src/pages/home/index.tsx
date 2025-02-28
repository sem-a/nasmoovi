import { useGetAllPortfolioQuery } from "../../app/services/portfolio";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";
import styles from "./index.module.css";
import { Container } from "../../components/container";
import NoData from "../../components/nodata";
import PhotoGallery from "../../components/gallery";

const Home: React.FC = () => {
  const { data: portfolio, isLoading, isError } = useGetAllPortfolioQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || portfolio?.success === false) {
    return <div>Ошибка</div>;
  }

  if (!portfolio || portfolio.portfolio === null) {
    return <NoData />;
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
        <PhotoGallery portfolio={portfolio.portfolio} />
        {/* <div className={styles.body}>
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div key={colIndex} className={styles.col}>
              {portfolio?.portfolio
                ?.filter((_, index) => index % 3 === colIndex)
                .map((item, index) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={`Photo ${index + 1 + colIndex}`}
                    className={styles.photo}
                  />
                ))}
            </div>
          ))}
        </div> */}
      </Container>
    </Layout>
  );
};

export default Home;
