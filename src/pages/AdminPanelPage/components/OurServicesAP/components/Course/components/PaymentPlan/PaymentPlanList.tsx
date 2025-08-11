import React, { useState } from "react";
import { PaymentPlanItem } from "./PaymentPlanItem";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { Button } from "@/components/Button/Button";

import styles from './PaymentPlanList.module.scss';

type AccordionItem = {
  title: string;
  description: string;
  accordionIcon?: any;
};

type Props = {
  paymentPlans: any[];
  control: any;
  editorStates: Record<string, string>;
  onEditorChange: (val: string, planIndex: number, itemIndex: number) => void;
  onAddAccordionItem: (planIndex: number) => void;
  onAccordionItemChange: (
    planIndex: number,
    itemIndex: number,
    field: keyof AccordionItem,
    value: string
  ) => void;
  onIconUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    planIndex: number,
    itemIndex: number
  ) => void;
  onIconRemove: (planIndex: number, itemIndex: number) => void;
  onAddPlan: () => void;
  onDeletePlan: (planIndex: number) => void;
  onDeleteAccordionItem: (planIndex: number, itemIndex: number) => void;
};

export const PaymentPlanList: React.FC<Props> = ({
  paymentPlans,
  control,
  editorStates,
  onEditorChange,
  onAddAccordionItem,
  onAccordionItemChange,
  onIconUpload,
  onIconRemove,
  onAddPlan,
  onDeletePlan,
  onDeleteAccordionItem
}) => {
  const [openPlanIndex, setOpenPlanIndex] = useState<number | null>(null);
  const [openItemIndexes, setOpenItemIndexes] = useState<
    Record<number, number | null>
  >({});

  const handlePlanToggle = (index: number) => {
    setOpenPlanIndex((prev) => (prev === index ? null : index));
  };

  const handleItemToggle = (planIndex: number, itemIndex: number) => {
    setOpenItemIndexes((prev) => ({
      ...prev,
      [planIndex]: prev[planIndex] === itemIndex ? null : itemIndex,
    }));
  };
  return (
    <div className="adminPanelMargin">
      <div className={styles.titleContainer}>
        <AdminPanelSectionTitle title="Тарифні плани" />
        <Button onClick={onAddPlan} variant="success">
          Новий план
        </Button>
      </div>

      {paymentPlans.map((plan, index) => (
        <PaymentPlanItem
          key={index}
          totalPlans={paymentPlans.length}
          plan={plan}
          planIndex={index}
          control={control}
          editorStates={editorStates}
          onEditorChange={onEditorChange}
          onAddAccordionItem={onAddAccordionItem}
          onAccordionItemChange={onAccordionItemChange}
          onIconUpload={onIconUpload}
          onIconRemove={onIconRemove}
          isPlanOpen={openPlanIndex === index}
          onPlanToggle={() => handlePlanToggle(index)}
          openItemIndex={openItemIndexes[index] ?? null}
          onItemToggle={(itemIndex) => handleItemToggle(index, itemIndex)}
          onDeletePlan={onDeletePlan}
          onDeleteAccordionItem={onDeleteAccordionItem}
        />
      ))}
    </div>
  );
};