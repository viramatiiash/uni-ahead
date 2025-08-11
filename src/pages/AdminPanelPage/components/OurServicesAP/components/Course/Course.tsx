import styles from "./Course.module.scss";

import { CourseDetails } from "./components/CourseDetails/CourseDetails";
import { PaymentPlanList } from "./components/PaymentPlan/PaymentPlanList";
import { useEditorStates } from "@/pages/AdminPanelPage/hooks/useEditorStates";
import { useSaveService } from "@/pages/AdminPanelPage/hooks/useSaveService";

import { ServiceData } from "@/pages/AdminPanelPage/types";
import { usePlansHandlers } from "@/pages/AdminPanelPage/hooks/usePlanHandlers";
import { useIconUploader } from "@/pages/AdminPanelPage/hooks/useIconUploader";
import { Button } from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useIconRemover } from "@/pages/AdminPanelPage/hooks/useIconRemover";

export const Course: React.FC<{
  mode: "new" | "edit";
  courseToEdit: ServiceData | null;
  onClose: () => void;
}> = ({ mode, courseToEdit, onClose }) => {
  const { control, handleSubmit, setValue, getValues, watch, reset } =
    useForm<ServiceData>({
      defaultValues: {
        title: "",
        courseIcon: "",
        paymentPlans: [
          {
            title: "",
            price: 0,
            planIcon: "",
            description: "",
            accordionItems: [
              {
                title: "",
                description: "",
                accordionIcon: "",
              },
            ],
          },
        ],
      },
    });

  useEffect(() => {
    if (
      mode === "edit" &&
      courseToEdit &&
      courseToEdit.paymentPlans &&
      courseToEdit.paymentPlans.length > 0
    ) {
      reset(courseToEdit);
    }
  }, [mode, courseToEdit, reset]);

  const { editorStates, handleEditorChange } = useEditorStates(
    watch("paymentPlans")
  );

  useEffect(() => {
    const handleClose = () => {
      onClose();
    };

    window.addEventListener("closeCourseModal", handleClose);

    return () => {
      window.removeEventListener("closeCourseModal", handleClose);
    };
  }, [onClose]);

  const {
    handleAddPlan,
    handleAddAccordionItem,
    handleAccordionItemChange,
    handleDeletePlan,
    handleDeleteAccordionItem,
  } = usePlansHandlers({ getValues, setValue });

  const { handleIconUpload } = useIconUploader({ getValues, setValue });
  const { handleIconRemove, deleteIconsFromCloudinary } =
    useIconRemover<ServiceData>({
      getValues,
      setValue,
    });
  const { handleSave } = useSaveService(
    editorStates,
    deleteIconsFromCloudinary
  );
  return (
    <div className={styles.courseContainer}>
      <h2 className={styles.courseTitle}>
        {mode === "new" ? "Новий курс" : "Редагування курсу"}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
        <CourseDetails
          control={control}
          courseIcon={watch("courseIcon") ?? ""}
          onIconUpload={(e) => handleIconUpload(e, -1, -1)}
          onIconRemove={() => handleIconRemove(-1, -1)}
        />

        <PaymentPlanList
          paymentPlans={watch("paymentPlans")}
          control={control}
          editorStates={editorStates}
          onEditorChange={handleEditorChange}
          onAddAccordionItem={handleAddAccordionItem}
          onAccordionItemChange={handleAccordionItemChange}
          onIconUpload={handleIconUpload}
          onIconRemove={handleIconRemove}
          onAddPlan={handleAddPlan}
          onDeletePlan={handleDeletePlan}
          onDeleteAccordionItem={handleDeleteAccordionItem}
        />
        <div className={styles.buttonContainer}>
          {mode === "new" && (
            <Button
              className={styles.button}
              type="button"
              variant="cancel"
              onClick={onClose}
            >
              Скасувати
            </Button>
          )}
          <Button className={styles.button} type="submit" variant="success">
            Зберегти курс
          </Button>
        </div>
      </form>
    </div>
  );
};
