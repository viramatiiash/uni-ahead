import axios from "axios";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  Path,
} from "react-hook-form";

interface UseIconUploaderProps<T extends FieldValues> {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}

export const useIconUploader = <T extends FieldValues>({
  getValues,
  setValue,
}: UseIconUploaderProps<T>) => {
  const handleIconUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    planIndex: number,
    itemIndex: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uni-ahead");
    formData.append("folder", "icons");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfxxhionq/upload",
        formData
      );
      const imageUrl = response.data.secure_url;

      const updatedPlans = [...getValues("paymentPlans" as Path<T>)] as any[];

      if (planIndex === -1 && itemIndex === -1) {
        setValue("courseIcon" as Path<T>, imageUrl as any);
      } else if (itemIndex === -1) {
        updatedPlans[planIndex].planIcon = imageUrl;
        setValue("paymentPlans" as Path<T>, updatedPlans as any);
      } else {
        updatedPlans[planIndex].accordionItems[itemIndex].accordionIcon =
          imageUrl;
        setValue("paymentPlans" as Path<T>, updatedPlans as any);
      }
    } catch (error) {
      console.error("Error uploading icon:", error);
    }
  };

  return { handleIconUpload };
};
