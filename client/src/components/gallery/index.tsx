import React from "react";
import styles from "./index.module.css";
import { Portfolio } from "@prisma/client";

const PhotoGallery: React.FC<{ portfolio: Portfolio[] }> = ({ portfolio }) => {
  return (
    <div className={styles.body}>
      {Array.from({ length: 3 }).map((_, colIndex) => (
        <div key={colIndex} className={styles.col}>
          {portfolio
            ?.filter((_, index: number) => index % 3 === colIndex)
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
    </div>
  );
};

export default PhotoGallery;
