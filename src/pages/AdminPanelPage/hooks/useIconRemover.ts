import { useState } from "react";
import axios from "axios";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  Path,
} from "react-hook-form";
import { API_BASE_URL } from "@/constants/api";

interface UseIconRemoverProps<T extends FieldValues> {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}

export const useIconRemover = <T extends FieldValues>({
  getValues,
  setValue,
}: UseIconRemoverProps<T>) => {
  const [iconsToDelete, setIconsToDelete] = useState<string[]>([]);

  const extractPublicId = (url: string): string => {
    const parts = url.split("/upload/")[1];
    const withoutVersion = parts.split("/").slice(1).join("/");
    const publicIdWithExtension = withoutVersion.split(".")[0];
    return publicIdWithExtension;
  };

  const handleIconRemove = (planIndex: number, itemIndex: number) => {
    let currentIconUrl = "";

    const updatedPlans = [...getValues("paymentPlans" as Path<T>)] as any[];

    if (planIndex === -1 && itemIndex === -1) {
      currentIconUrl = getValues("courseIcon" as Path<T>) as string;
    } else if (itemIndex === -1) {
      currentIconUrl = updatedPlans[planIndex].planIcon;
    } else {
      currentIconUrl =
        updatedPlans[planIndex].accordionItems[itemIndex].accordionIcon;
    }

    if (!currentIconUrl) return;

    const publicId = extractPublicId(currentIconUrl);
    setIconsToDelete((prev) => [...prev, publicId]);

    if (planIndex === -1 && itemIndex === -1) {
      setValue("courseIcon" as Path<T>, "" as any);
    } else if (itemIndex === -1) {
      updatedPlans[planIndex].planIcon = "";
      setValue("paymentPlans" as Path<T>, updatedPlans as any);
    } else {
      updatedPlans[planIndex].accordionItems[itemIndex].accordionIcon = "";
      setValue("paymentPlans" as Path<T>, updatedPlans as any);
    }
  };

  const deleteIconsFromCloudinary = async () => {
    if (iconsToDelete.length === 0) return;

    try {
      await Promise.all(
        iconsToDelete.map((publicId) =>
          axios.post(`${API_BASE_URL}/delete-image`, { publicId })
        )
      );
      setIconsToDelete([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to delete images:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unknown error while deleting images:", error);
      }
    }
  };

  return { handleIconRemove, deleteIconsFromCloudinary };
};
