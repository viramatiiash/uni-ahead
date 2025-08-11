import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./TeamMember.module.scss";
import { Button } from "@/components/Button/Button";
import { useIconRemover } from "@/pages/AdminPanelPage/hooks/useIconRemover";
import { TeamMemberType } from "../OurTeamAP";
import Input from "@/components/Input/Input";
import { usePhotoUploader } from "@/pages/AdminPanelPage/hooks/usePhotoUploader";
import { UploadImage } from "../../UploadImage/UploadImage";
import classNames from "classnames";

type TeamMemberProps =
  | {
      mode: "edit";
      memberToEdit: TeamMemberType;
      onClose: () => void;
      onSave: (data: TeamMemberType) => void;
    }
  | {
      mode: "new";
      memberToEdit: null;
      onClose: () => void;
      onSave: (data: Omit<TeamMemberType, "_id">) => void;
    };

export const TeamMember: React.FC<TeamMemberProps> = ({
  mode,
  memberToEdit,
  onClose,
  onSave,
}) => {
  const { control, handleSubmit, setValue, watch, reset } =
    useForm<TeamMemberType>({
      defaultValues: {
        photo: "",
        name: "",
        position: "",
        description: "",
        order: 0,
        _id: "",
      },
      mode: "onBlur",
    });

  useEffect(() => {
    if (mode === "edit" && memberToEdit) {
      reset(memberToEdit);
    }
  }, [mode, memberToEdit, reset]);

  const { handlePhotoUpload } = usePhotoUploader({ setValue });

  const { handleIconRemove } = useIconRemover({
    getValues: () => watch(),
    setValue,
  });

  const onSubmit = (data: TeamMemberType) => {
    data.order = Number(data.order);
    if (mode === "new") {
      const { _id, ...newData } = data;
      onSave(newData);
    } else {
      onSave(data);
    }

    onClose();
  };

  return (
    <div className={styles.teamMemberContainer}>
      <h3 className={styles.teamMemberTitle}>
        {mode === "new" ? "Новий мембер" : "Редагування мембера"}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(styles.teamMembers, "adminPanelMargin")}>
          <Input
            belongsTo="teamMember"
            name="name"
            label="Ім’я"
            control={control}
            placeholder="Введіть ім’я..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 25, message: "Максимум 25 символів" },
            }}
          />

          <Input
            belongsTo="teamMember"
            name="position"
            label="Посада"
            control={control}
            placeholder="Введіть посаду..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 30, message: "Максимум 30 символів" },
            }}
          />

          <Input
            belongsTo="teamMember"
            name="description"
            textarea
            label="Опис"
            control={control}
            placeholder="Введіть опис..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 80, message: "Максимум 80 символів" },
            }}
          />

          <UploadImage
            label="Фото"
            image={watch("photo")}
            onChange={handlePhotoUpload}
            onRemove={() => setValue("photo", "")}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button variant="cancel" type="button" onClick={onClose}>
            Скасувати
          </Button>
          <Button variant="success" type="submit">
            Зберегти
          </Button>
        </div>
      </form>
    </div>
  );
};
