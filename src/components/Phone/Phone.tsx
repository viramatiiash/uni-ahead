import { PhoneIcon } from '@assets/icons';
import styles from './phone.module.scss';
import { useState, useEffect, useRef } from 'react';
import { PhoneModal } from './components/PhoneModal';

export const Phone = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.phoneModalContainer} ${isOpen ? styles.active : ""}`}
      onClick={!isOpen ? handleOpen : handleClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className={styles.phone}>
        <PhoneIcon />
      </div>

      <div
        ref={modalRef}
        className={`${styles.modalWrapper} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <PhoneModal />
      </div>
    </div>
  );
};

