import React from 'react';
import styles from './index.module.css'

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};

export default Loading