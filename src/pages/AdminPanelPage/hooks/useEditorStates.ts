import { useEffect, useState } from "react";
import { ServiceData } from "./../types";

export const useEditorStates = (paymentPlans: ServiceData["paymentPlans"]) => {
  const [editorStates, setEditorStates] = useState<Record<string, string>>({});

  useEffect(() => {
    const newStates: Record<string, string> = {};

    paymentPlans.forEach((plan, planIndex) => {
      plan.accordionItems.forEach((item, itemIndex) => {
        const key = `${planIndex}-${itemIndex}`;
        newStates[key] = item.description || "Default description";
      });
    });

    setEditorStates((prev) => ({ ...newStates, ...prev }));
  }, [paymentPlans]);

  const handleEditorChange = (
    value: string,
    planIndex: number,
    itemIndex: number
  ) => {
    const key = `${planIndex}-${itemIndex}`;
    setEditorStates((prev) => ({ ...prev, [key]: value }));
  };

  return { editorStates, handleEditorChange };
};
