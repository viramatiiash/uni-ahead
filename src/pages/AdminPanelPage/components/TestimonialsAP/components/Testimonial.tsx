import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Testimonial.module.scss";
import { Button } from "@/components/Button/Button";
import { TestimonialType } from "../TestimonialsAP";
import Input from "@/components/Input/Input";
import classNames from "classnames";
import { StarOutlinedIcon, StarFilledIcon } from "@assets/icons";

type TestimonialProps =
  | {
      mode: "edit";
      testimonialToEdit: TestimonialType;
      onClose: () => void;
      onSave: (data: TestimonialType) => void;
    }
  | {
      mode: "new";
      testimonialToEdit: null;
      onClose: () => void;
      onSave: (data: Omit<TestimonialType, "_id">) => void;
    };

export const Testimonial: React.FC<TestimonialProps> = ({
  mode,
  testimonialToEdit,
  onClose,
  onSave,
}) => {
  const { control, handleSubmit, setValue, watch, reset } =
    useForm<TestimonialType>({
      defaultValues: {
        name: "",
        text: "",
        order: 1,
        _id: "",
        stars: 1,
      },
      mode: "onBlur",
    });

  const stars = watch("stars");

  useEffect(() => {
    if (mode === "edit" && testimonialToEdit) {
      reset(testimonialToEdit);
    }
  }, [mode, testimonialToEdit, reset]);

  const onSubmit = (data: TestimonialType) => {
    data.order = Number(data.order);
    if (mode === "new") {
      const { _id, ...newData } = data;
      onSave(newData);
    } else {
      onSave(data);
    }

    onClose();
  };

  const handleStarClick = (index: number) => {
    setValue("stars", index + 1);
  };

  return (
    <div className={styles.testimonialContainer}>
      <h3 className={styles.testimonialTitle}>
        {mode === "new" ? "Новий відгук" : "Редагування відгуку"}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(styles.testimonials, "adminPanelMargin")}>
          <Input
            belongsTo="testimonial"
            name="name"
            label="Ім’я"
            control={control}
            placeholder="Введіть ім’я..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 20, message: "Максимум 20 символів" },
            }}
          />

          <Input
            belongsTo="testimonial"
            name="text"
            textarea
            label="Відгук"
            control={control}
            placeholder="Введіть відгук..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 250, message: "Максимум 250 символів" },
            }}
          />

          <div className={styles.starContainer}>
            <label className={styles.starLabel}>Оцінка:</label>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={styles.star}
                  onClick={() => handleStarClick(i)}
                >
                  {i < stars ? (
                    <StarFilledIcon className={styles.starIcon} />
                  ) : (
                    <StarOutlinedIcon className={styles.starIcon} />
                  )}
                </span>
              ))}
            </div>
          </div>
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
