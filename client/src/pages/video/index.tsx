import React from "react";
import { Layout } from "../../components/layout";
import { Container } from "../../components/container";
import { useGetAllVideoQuery } from "../../app/services/video";
import Loading from "../../components/loading";
import ServerError from "../../components/error";
import NoData from "../../components/nodata";
import VideoGallery from "../../components/video";

const Video = () => {
  const { data: videos, isLoading, isError } = useGetAllVideoQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || videos?.success === false) {
    return <ServerError />;
  }

  if (
    videos?.video.length === 0 ||
    videos?.video === null ||
    videos?.video === undefined
  ) {
    return <NoData />;
  }

  return (
    <Layout>
      <Container paddingTop="79px">
        <VideoGallery video={videos?.video} />
      </Container>
    </Layout>
  );
};

export default Video;
