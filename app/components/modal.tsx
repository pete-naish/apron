import { FC, ReactNode } from "react";

import styles from "./modal.module.css";
import CloseIcon from "./icons/close-icon";
import IconButton from "./icon-button";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <section className={styles.modal_backdrop}>
      <IconButton onClick={onClose} classes={styles.modal_close}>
        <CloseIcon />
      </IconButton>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </section>
  );
};

export default Modal;
