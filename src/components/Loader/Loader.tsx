import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import { OwlIcon } from "@assets/icons";

export const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <OwlIcon className={styles.owl} />
      <div className={styles.progressText}>{progress}%</div>
    </div>
  );
};
