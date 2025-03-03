import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { Portfolio } from "@prisma/client";

const PhotoGallery: React.FC<{ portfolio: Portfolio[] }> = ({ portfolio }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => {
        const index = prevIndex ?? 0;
        return (index + 1) % portfolio.length;
      });
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => {
        const index = prevIndex ?? 0;
        return (index - 1 + portfolio.length) % portfolio.length;
      });
    }
  };

  return (
    <div className={styles.body}>
      {Array.from({ length: 3 }).map((_, colIndex) => (
        <div key={colIndex} className={styles.col}>
          {portfolio
            ?.filter((_, index: number) => index % 3 === colIndex)
            .map((item, index) => {
              const imgIndex = index * 3 + colIndex;
              return (
                <img
                  key={imgIndex}
                  src={item.image}
                  alt={`${index + 1 + colIndex}`}
                  className={styles.photo}
                  onClick={() => handleImageClick(imgIndex)}
                />
              );
            })}
        </div>
      ))}

      {selectedImageIndex !== null && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={closeModal}></button>
          <button className={styles.prevButton} onClick={prevImage}></button>
          <img
            src={portfolio[selectedImageIndex].image}
            alt="Selected"
            className={styles.modalImage}
          />
          <button className={styles.nextButton} onClick={nextImage}></button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
