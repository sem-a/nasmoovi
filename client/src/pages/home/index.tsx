import { Layout } from "../../components/layout";
import styles from "./index.module.css";

const Home: React.FC = () => {
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
      <div className={styles.body}>
        
      </div>
    </Layout>
  );
};

export default Home;
