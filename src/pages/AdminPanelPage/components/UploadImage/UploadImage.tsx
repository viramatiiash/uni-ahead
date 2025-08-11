import styles from "./UploadImage.module.scss";
import { useRef } from "react";
import PreviewFallback from "@assets/icons/image-fallback.svg?url";
import { Button } from "@/components/Button/Button";
import { useMediaQuery } from 'react-responsive';
import { DeleteIcon, EditIcon } from '@assets/icons';

interface UploadImageProps {
  label?: string;
  image?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  name?: string;
  banner?: boolean;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label = "Фото",
  image,
  onChange,
  onRemove,
  name = "upload-image",
  banner = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className={styles.uploadWrapper}>
      {label && <h4 className={styles.label}>{label}</h4>}

      <div className={banner ? styles.bannerContainer : ""}>
        <div
          className={
            image && banner
              ? styles.previewWrapperBanner
              : image && !banner
              ? styles.previewWrapper
              : styles.previewFallbackWrapper
          }
        >
          <img
            src={image || PreviewFallback}
            alt="image preview"
            className={image ? styles.previewImage : styles.fallback}
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

        <div className={banner ? styles.buttonGroupBanner : styles.buttonGroup}>
          {!image ? (
            <Button onClick={handleUploadClick} variant="success">
              Завантажити
            </Button>
          ) : (
            <>
              <Button
                className={styles.btnAction}
                onClick={handleUploadClick}
                variant="change"
              >
                {isTablet && banner ? (
                  <EditIcon className={styles.btnIcon} />
                ) : (
                  "Змінити"
                )}
              </Button>
              <Button
                className={styles.btnAction}
                onClick={onRemove}
                variant="error"
              >
                {isTablet && banner ? (
                  <DeleteIcon className={styles.btnIcon} />
                ) : (
                  "Видалити"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
