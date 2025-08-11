import styles from './CourseDetails.module.scss';

import Input from "@/components/Input/Input";
import { UploadIcon } from '@/pages/AdminPanelPage/components/UploadIcon/UploadIcon';
import { Control } from "react-hook-form";
import classNames from "classnames";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";

interface Props {
  control: Control<any>;
  courseIcon: string;
  onIconUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconRemove: () => void;
}

export const CourseDetails: React.FC<Props> = ({
  control,
  courseIcon,
  onIconUpload,
  onIconRemove,
}) => {
  return (
    <div className="adminPanelMargin">
      <div className={styles.titleContainer}>
        <AdminPanelSectionTitle title="Деталі курсу" />
      </div>

      <div className={classNames(styles.courseTitle, "adminPanelMargin")}>
        <Input
          belongsTo="course"
          name="title"
          label="Назва курсу"
          control={control}
          placeholder="Введи назву курсу..."
          variant="adminPanel"
          defaultValue=""
          showCounter
          rules={{
            maxLength: { value: 20, message: "Максимум 30 символів" },
            required: "Це поле обов’язкове",
          }}
        />
      </div>

      <UploadIcon
        icon={courseIcon}
        onChange={onIconUpload}
        onRemove={onIconRemove}
        label="курсу"
        name="course-icon"
      />
    </div>
  );
};