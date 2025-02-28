import React from "react";
import { useGetWeddingPreviewQuery } from "../../app/services/portfolio";
import styles from "./index.module.css";
import LoadingScreen from "../loading";
import { H4 } from "../title";

type Props = {
  id: string;
  name: string;
  alignItems?: string;
};

type WeddingPreviewImage = {
  id: string;
  image: string;
};

const WeddingPreview: React.FC<Props> = ({ id, name, alignItems }) => {
  const {
    data: weddingPreview,
    isLoading,
    isError,
  } = useGetWeddingPreviewQuery(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (
    isError ||
    weddingPreview?.success === false ||
    weddingPreview?.portfolio === null
  ) {
    return <div>Произошла ошибка при загрузке превью.</div>;
  }

  return (
    <div className={styles.weddingPreview} style={{ alignItems: alignItems }}>
      <div className={styles.imagesContainer}>
        {weddingPreview?.portfolio
          .slice(0, 3)
          .map((preview: WeddingPreviewImage) => (
            <img
              key={preview.id}
              src={`${preview.image}`}
              alt={`Фото свадьбы ${name}`}
              className={styles.previewImage}
            />
          ))}
      </div>
      <div className={styles.line}></div>
      <H4 textAlign="end">{name}</H4>
    </div>
  );
};

export default WeddingPreview;
