import LoadingIcon from "./icons/loading-icon";

import styles from "./circular-progress.module.css";

const CircularProgress = () => {
  return (
    <div className={styles.circular_progress}>
      <LoadingIcon />
    </div>
  );
};

export default CircularProgress;
