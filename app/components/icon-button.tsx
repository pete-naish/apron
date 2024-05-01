import { FC, ReactNode } from "react";

import styles from "./icon-button.module.css";

interface IconButtonProps {
  onClick: () => void;
  classes?: string;
  children?: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({ onClick, classes, children }) => {
  return (
    <button className={`${styles.icon_button} ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
