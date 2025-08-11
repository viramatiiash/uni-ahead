// FaqItem.tsx
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FaqItem.module.scss";
import { Button } from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import classNames from "classnames";
import { FaqItemType } from '../FaqAP';
import { TextEditor } from '@/components/TextEditor/TextEditor';


type FaqItemProps =
  | {
      mode: "edit";
      faqItemToEdit: FaqItemType;
      onClose: () => void;
      onSave: (data: FaqItemType) => void;
    }
  | {
      mode: "new";
      faqItemToEdit: null;
      onClose: () => void;
      onSave: (data: Omit<FaqItemType, "_id">) => void;
    };

export const FaqItem: React.FC<FaqItemProps> = ({
  mode,
  faqItemToEdit,
  onClose,
  onSave,
}) => {
  const { control, handleSubmit, reset } =
    useForm<FaqItemType>({
      defaultValues: {
        _id: "",
        order: 0,
        title: "",
        description: "",
      },
      mode: "onBlur",
    });

  useEffect(() => {
    if (mode === "edit" && faqItemToEdit) {
      reset(faqItemToEdit);
    }
  }, [mode, faqItemToEdit, reset]);

  const onSubmit = (data: FaqItemType) => {
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
    <div className={styles.faqItemFormContainer}>
      <h3 className={styles.faqItemTitle}>
        {mode === "new" ? "Нове питання" : "Редагування питання"}
      </h3>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(styles.faqItems, "adminPanelMargin")}>
          <Input
            belongsTo="faq"
            name="title"
            label="Запитання"
            control={control}
            placeholder="Введіть запитання..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 100, message: "Максимум 100 символів" },
              required: "Це поле обов’язкове",
            }}
          />

          <Controller
            name="description"
            control={control}
            render={({ field}) => (
              <div className={styles.textEditorWrapper}>
                <p className={styles.label}>Відповідь</p>
                <TextEditor maxLength={300} value={field.value} onChange={field.onChange} />
              </div>
            )}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <Button type="submit" variant="success">
            Зберегти
          </Button>
          <Button type="button" variant="cancel" onClick={onClose}>
            Скасувати
          </Button>
        </div>
      </form>
    </div>
  );
};
