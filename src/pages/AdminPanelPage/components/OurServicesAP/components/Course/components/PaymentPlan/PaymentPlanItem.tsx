import styles from "./PaymentPlanItem.module.scss";
import { Control } from "react-hook-form";
import { TextEditor } from "@/components/TextEditor/TextEditor";
import { UploadIcon } from "../../../../../UploadIcon/UploadIcon";
import Input from "@/components/Input/Input";
import classNames from "classnames";
import { Button } from "@/components/Button/Button";
import { ArrowIcon_2, DeleteIcon } from "@assets/icons";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";


type AccordionItem = {
  title: string;
  description: string;
  accordionIcon?: any;
};

type PaymentPlan = {
  title: string;
  price: number;
  planIcon?: any;
  description: string;
  accordionItems: AccordionItem[];
};

type Props = {
  plan: PaymentPlan;
  planIndex: number;
  totalPlans: number;
  control: Control<any>;
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
    event: React.ChangeEvent<HTMLInputElement>,
    planIndex: number,
    itemIndex: number
  ) => void;
  onIconRemove: (planIndex: number, itemIndex: number) => void;
  isPlanOpen: boolean;
  onPlanToggle: () => void;
  openItemIndex: number | null;
  onItemToggle: (itemIndex: number) => void;
  onDeletePlan: (planIndex: number) => void;
  onDeleteAccordionItem: (planIndex: number, itemIndex: number) => void;
};

export const PaymentPlanItem: React.FC<Props> = ({
  plan,
  planIndex,
  totalPlans,
  control,
  onEditorChange,
  onAddAccordionItem,
  onIconUpload,
  onIconRemove,
  isPlanOpen,
  onPlanToggle,
  openItemIndex,
  onItemToggle,
  onDeletePlan,
  onDeleteAccordionItem,
}) => {


  return (
    <>
      <div
        className={styles.planContainer}
        style={isPlanOpen ? { marginBottom: "30px" } : undefined}
        onClick={onPlanToggle}
      >
        <div className={styles.expandContainer}>
          <ArrowIcon_2
            className={classNames(styles.expand, isPlanOpen && styles.open)}
          />

          <h4 className={styles.planNumber}>{plan.title}</h4>
        </div>

        <Button
          className={styles.btnAction}
          onClick={(e) => {
            e.stopPropagation();
            onDeletePlan(planIndex);
          }}
          variant={totalPlans === 1 ? "disabled" : "error-small"}
          disabled={totalPlans === 1}
        >
          <DeleteIcon className={styles.btnIcon} />
        </Button>
      </div>

      <div
        className={classNames(styles.content, isPlanOpen && styles.contentOpen)}
      >
        <div className={classNames(styles.plans, "adminPanelMargin")}>
          <Input
            belongsTo="plan"
            name={`paymentPlans.${planIndex}.title`}
            label="Назва тарифного плану"
            control={control}
            placeholder="Введи назву плану..."
            variant="adminPanel"
            showCounter
            rules={{
              maxLength: { value: 20, message: "Максимум 20 символів" },
              required: "Це поле обов’язкове",
            }}
          />

          <Input
            belongsTo="plan"
            name={`paymentPlans.${planIndex}.price`}
            label="Ціна тарифного плану"
            control={control}
            placeholder="Введи ціну тарифного плану..."
            variant="adminPanel"
            type="number"
          />

          <Input
            belongsTo="plan"
            name={`paymentPlans.${planIndex}.description`}
            label="Опис тарифного плану"
            control={control}
            placeholder="Введи опис тарифного плану..."
            variant="adminPanel"
            textarea
            showCounter
            rules={{
              maxLength: { value: 200, message: "Максимум 200 символів" },
              required: "Це поле обов’язкове",
            }}
          />

          <UploadIcon
            label="тарифного плану"
            icon={plan.planIcon}
            onChange={(e) => onIconUpload(e, planIndex, -1)}
            onRemove={() => onIconRemove(planIndex, -1)}
            name={`plan-${planIndex}`}
          />
        </div>

        <div className={styles.accordion}>
          <div className={styles.titleContainer}>
            <AdminPanelSectionTitle title="Пункти плану" />
            <div className={styles.buttonWrapper}>
              <Button
                onClick={() => onAddAccordionItem(planIndex)}
                variant="success"
              >
                Новий пункт
              </Button>
            </div>
          </div>

          {plan.accordionItems.map((item, itemIndex) => {
            const key = `${planIndex}-${itemIndex}`;
            const isItemOpen = openItemIndex === itemIndex;

            return (
              <div key={key} className={styles.accordionItem}>
                <div
                  className={classNames(
                    styles.planContainer,
                    styles.accordionItemContainer
                  )}
                  style={isItemOpen ? { marginBottom: "30px" } : undefined}
                  onClick={() => onItemToggle(itemIndex)}
                >
                  <div className={styles.expandContainer}>
                    <ArrowIcon_2
                      className={classNames(
                        styles.expand,
                        isItemOpen && styles.open
                      )}
                    />
                    <h5 className={styles.planNumber}>{item.title}</h5>
                  </div>
                  <Button
                    className={styles.btnAction}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAccordionItem(planIndex, itemIndex);
                    }}
                    variant={
                      plan.accordionItems.length === 1
                        ? "disabled"
                        : "error-tiny"
                    }
                    disabled={plan.accordionItems.length === 1}
                  >
                    <DeleteIcon className={styles.btnIcon} />
                  </Button>
                </div>

                <div
                  style={
                    isItemOpen
                      ? { marginBottom: "50px", paddingBottom: "15px" }
                      : undefined
                  }
                  className={classNames(
                    styles.content,
                    isItemOpen && styles.contentOpen,
                    styles.accordionContent
                  )}
                >
                  <Input
                    belongsTo="accordion"
                    name={`paymentPlans.${planIndex}.accordionItems.${itemIndex}.title`}
                    label={`Заголовок пункту`}
                    control={control}
                    placeholder="Введи назву пункту..."
                    variant="adminPanel"
                    showCounter
                    rules={{
                      maxLength: {
                        value: 50,
                        message: "Максимум 50 символів",
                      },
                      required: "Це поле обов’язкове",
                    }}
                  />

                  <TextEditor
                    maxLength={1500}
                    value={
                      item.description ??
                      plan.accordionItems[itemIndex]?.description ??
                      ""
                    }
                    onChange={(val) =>
                      onEditorChange(val, planIndex, itemIndex)
                    }
                  />

                  <UploadIcon
                    label="пункту плану"
                    icon={item.accordionIcon}
                    onChange={(e) => onIconUpload(e, planIndex, itemIndex)}
                    onRemove={() => onIconRemove(planIndex, itemIndex)}
                    name={`plan-description-${itemIndex}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
