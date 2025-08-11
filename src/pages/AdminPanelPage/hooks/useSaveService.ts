import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ServiceData } from "../types";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/constants/api";

export const useSaveService = (
  editorStates: Record<string, string>,
  deleteIconsFromCloudinary: () => Promise<void>
) => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: ServiceData) => {
      const hasId = Boolean(data._id);

      const url = hasId
        ? `${API_BASE_URL}/api/services/${data._id}`
        : `${API_BASE_URL}api/services`;

      const method = hasId ? "put" : "post";

      return axios[method](url, data);
    },
  });

const handleSave = async (data: ServiceData) => {
  const updatedData = {
    ...data,
    paymentPlans: data.paymentPlans.map((plan, planIndex) => ({
      ...plan,
      accordionItems: plan.accordionItems.map((item, itemIndex) => {
        const key = `${planIndex}-${itemIndex}`;
        const description = editorStates[key]?.trim() || item.description;
        return {
          ...item,
          description: description || "Default description",
        };
      }),
    })),
  };

  try {
    await deleteIconsFromCloudinary();

    const response = await mutateAsync(updatedData);
    toast.success(`Курс "${updatedData.title}" успішно збережено`);

    if (typeof window !== "undefined") {
      const event = new CustomEvent("closeCourseModal");
      window.dispatchEvent(event);
    }

    console.log("Service saved:", response.data);
  } catch (error: any) {
    console.error("Error saving service:", error.response?.data || error);
    toast.error("Помилка при збереженні курсу");
  }
};

  return { handleSave };
};
