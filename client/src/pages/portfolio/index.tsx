import { useParams } from "react-router-dom";
import { useGetForIdPortfolioQuery } from "../../app/services/portfolio";
import LoadingScreen from "../../components/loading";
import { Layout } from "../../components/layout";
import { Container } from "../../components/container";
import ServerError from "../../components/error";
import NoData from "../../components/nodata";
import PhotoGallery from "../../components/gallery";
import styles from "./index.module.css";

const PortfolioList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: portfolio,
    isLoading,
    isError,
  } = useGetForIdPortfolioQuery(id!);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || portfolio?.success === false) {
    return <ServerError />;
  }

  if (
    !portfolio ||
    portfolio.portfolio?.length === 0 ||
    portfolio.portfolio === null
  ) {
    return <NoData />;
  }

  return <PhotoGallery portfolio={portfolio.portfolio} />;
};

const PortfolioPage = () => {
  return (
    <Layout>
      <Container paddingTop="79px">
        <PortfolioList />
      </Container>
    </Layout>
  );
};

export default PortfolioPage;
