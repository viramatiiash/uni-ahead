import axios from "axios";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

interface UsePhotoUploaderProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
}

export const usePhotoUploader = <T extends FieldValues>({
  setValue,
}: UsePhotoUploaderProps<T>) => {
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uni-ahead");
    formData.append("folder", "team-members");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfxxhionq/upload",
        formData
      );
      const imageUrl = response.data.secure_url;

      setValue("photo" as Path<T>, imageUrl as any);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return { handlePhotoUpload };
};
