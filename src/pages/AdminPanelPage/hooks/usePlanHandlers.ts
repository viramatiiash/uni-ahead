export const usePlansHandlers = ({ getValues, setValue }: any) => {
  const handleAddPlan = () => {
    const currentPlans = getValues("paymentPlans") || [];
    const newPlan = {
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
    };
    setValue("paymentPlans", [...currentPlans, newPlan]);
  };

  const handleDeletePlan = (planIndex: number) => {
    const currentPlans = getValues("paymentPlans") || [];
    if (currentPlans.length > 1) {
      const updatedPlans = currentPlans.filter(
        (_: any, index: number) => index !== planIndex
      );
      setValue("paymentPlans", updatedPlans);
    }
  };

  const handleAddAccordionItem = (planIndex: number) => {
    const currentPlans = getValues("paymentPlans");
    const updatedAccordionItems = [
      ...(currentPlans[planIndex].accordionItems || []),
      { title: "", description: "", accordionIcon: "" },
    ];
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].accordionItems = updatedAccordionItems;
    setValue("paymentPlans", updatedPlans);
  };

  const handleDeleteAccordionItem = (planIndex: number, itemIndex: number) => {
    const currentPlans = getValues("paymentPlans");
    const accordionItems = currentPlans[planIndex].accordionItems || [];

    if (accordionItems.length > 1) {
      const updatedAccordionItems = accordionItems.filter(
        (_: any, index: number) => index !== itemIndex
      );
      const updatedPlans = [...currentPlans];
      updatedPlans[planIndex].accordionItems = updatedAccordionItems;
      setValue("paymentPlans", updatedPlans);
    }
  };

  const handleAccordionItemChange = (
    planIndex: number,
    itemIndex: number,
    field: string,
    value: string
  ) => {
    const currentPlans = getValues("paymentPlans");
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].accordionItems[itemIndex][field] = value;
    setValue("paymentPlans", updatedPlans);
  };

  return {
    handleAddPlan,
    handleDeletePlan,
    handleAddAccordionItem,
    handleDeleteAccordionItem,
    handleAccordionItemChange,
  };
};
