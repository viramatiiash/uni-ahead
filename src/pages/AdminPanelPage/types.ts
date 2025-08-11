export type AccordionItem = {
  title: string;
  description: string;
  accordionIcon?: string;
};

export type PaymentPlan = {
  title: string;
  price: number;
  planIcon?: string;
  description: string;
  accordionItems: AccordionItem[];
};

export type ServiceData = {
  _id?: string;
  title: string;
  courseIcon?: string;
  paymentPlans: PaymentPlan[];
};
