import styles from "./UploadIcon.module.scss";
import { useRef } from "react";
import PreviewFallback from "@assets/icons/image-fallback.svg?url";
import { Button } from '@/components/Button/Button';

interface UploadIconProps {
  label?: string;
  icon?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  previewSize?: number;
  name?: string;
}

export const UploadIcon: React.FC<UploadIconProps> = ({
  label = "Іконка",
  icon,
  onChange,
  onRemove,
  name = "upload-icon",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {label && <h4 className={styles.label}>Іконка {label}</h4>}

      <div className={styles.previewWrapper}>
        <img
          src={icon || PreviewFallback}
          alt="icon preview"
          className={styles.previewImage}
        />
      </div>

      <input
        id={name}
        name={name}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onChange}
      />

      <div className={styles.buttonGroup}>
        {!icon ? (
          <Button onClick={handleUploadClick} variant="success">
            Завантажити
          </Button>
        ) : (
          <>
            <Button onClick={handleUploadClick} variant="change">
              Змінити
            </Button>
            <Button onClick={onRemove} variant="error">
              Видалити
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
