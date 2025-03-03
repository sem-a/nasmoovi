import React, { useState } from "react";
import styles from "./index.module.css";
import { Video } from "@prisma/client";

const VideoGallery: React.FC<{ video: Video[] }> = ({ video }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const handleVideoClick = (index: number) => {
    setSelectedVideoIndex(index);
  };

  const closeModal = () => {
    setSelectedVideoIndex(null);
  };

  const nextVideo = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex((prevIndex) => {
        const index = prevIndex ?? 0;
        return (index + 1) % video.length;
      });
    }
  };

  const prevVideo = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex((prevIndex) => {
        const index = prevIndex ?? 0;
        return (index - 1 + video.length) % video.length;
      });
    }
  };

  return (
    <div className={styles.body}>
      {Array.from({ length: 3 }).map((_, colIndex) => (
        <div key={colIndex} className={styles.col}>
          {video
            ?.filter((_, index: number) => index % 3 === colIndex)
            .map((item, index) => {
              const videoIndex = index * 3 + colIndex;
              return (
                <video
                  key={videoIndex}
                  src={item.video}
                  className={styles.video}
                  onClick={() => handleVideoClick(videoIndex)}
                  controls
                />
              );
            })}
        </div>
      ))}

      {selectedVideoIndex !== null && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={closeModal}></button>
          <button className={styles.prevButton} onClick={prevVideo}></button>
          <video
            src={video[selectedVideoIndex].video}
            className={styles.modalVideo}
            controls
            autoPlay
          />
          <button className={styles.nextButton} onClick={nextVideo}></button>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;

// import React, { useRef, useEffect } from "react";
// import styles from "./index.module.css";
// import { H4 } from "../title";

// interface VideoPlayerProps {
//   videoSrc: string;
//   name: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, name }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (videoRef.current && containerRef.current) {
//         const aspectRatio = 16 / 9;
//         const container = videoRef.current.parentElement;

//         if (container) {
//           const screenWidth = window.innerWidth;
//           const screenHeight = window.innerHeight;

//           if (screenHeight <= screenWidth) {
//             videoRef.current.style.height = "60vh";
//             videoRef.current.style.width = "auto";
//           } else {
//             videoRef.current.style.width = "100%";
//             videoRef.current.style.height = "auto";

//             containerRef.current.style.height = "auto";
//             containerRef.current.style.marginTop = "42px"

//             const requiredHeight = screenWidth / aspectRatio;
//             if (requiredHeight <= screenHeight) {
//               videoRef.current.style.height = "auto";
//               videoRef.current.style.width = "100%";
//             } else {
//               videoRef.current.style.height = "100%";
//               videoRef.current.style.width = "auto";
//             }
//           }
//         }
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className={styles.container} ref={containerRef}>
//       <div>
//         <video ref={videoRef} controls>
//           <source src={videoSrc} type="video/mp4" />
//           Ваш браузер не поддерживает видео.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
