import axios from "axios";
import styles from "./FaqAP.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import classNames from "classnames";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { Button } from "@/components/Button/Button";
import { SortableList } from "@/components/dnd/SortableList";
import { CrossIcon, DeleteIcon, DragIcon, EditIcon } from "@assets/icons";
import { Divider } from "@/components/Divider/Divider";
import { FaqItem } from "./components/FaqItem";
import { toast } from "react-toastify";
import { navigationVector } from '@/utils/textVectors';
import { useMediaQuery } from 'react-responsive';
import { API_BASE_URL } from "@/constants/api";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export interface FaqItemType {
  _id: string;
  order: number;
  title: string;
  description: string;
  accordionIcon?: string;
}

type ReorderItem = { id: string; order: number };

const fetchFaqItems = async (): Promise<FaqItemType[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/faq`);
  return data;
};

const updateFaqItem = async (data: FaqItemType) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/faq/${data._id}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const deleteFaqItem = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/api/faq/${id}`);
};

const updateFaqItemsOrder = async (updates: ReorderItem[]) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/faq/reorder`,
    updates,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const createFaqItem = async (data: Omit<FaqItemType, "_id">) => {
  const response = await axios.post(`${API_BASE_URL}/api/faq`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const FaqAP = () => {
  const queryClient = useQueryClient();

  const {
    data: faqItems,
    isLoading,
    isError,
    error,
  } = useQuery<FaqItemType[]>({
    queryKey: ["faq-items"],
    queryFn: fetchFaqItems,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteFaqItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-items"] });
      toast.success("Питання видалено");
    },
    onError: () => {
      toast.error("Не вдалося видалити питання");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateFaqItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-items"] });
      toast.success("Питання успішно оновлено");
    },
    onError: () => {
      toast.error("Не вдалося оновити питання");
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: createFaqItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-items"] });
      toast.success("Питання успішно додано");
    },
    onError: () => {
      toast.error("Не вдалося додати питання");
    },
  });

  const { mutate: reorderMutate } = useMutation({
    mutationFn: updateFaqItemsOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-items"] });
      toast.success("Порядок питань оновлено");
    },
    onError: () => {
      toast.error("Не вдалося оновити порядок питань");
    },
  });

  const handleReorder = (newOrder: FaqItemType[]) => {
    const updates = newOrder.map((item, index) => ({
      id: item._id,
      order: index + 1,
    }));
    reorderMutate(updates);
  };

  const isDesktop = useMediaQuery({ query: "(max-width: 1280px)" });

  const [formMode, setFormMode] = useState<"new" | "edit" | null>(null);
  const [selectedFaqItem, setSelectedFaqItem] = useState<FaqItemType | null>(
    null
  );

  const handleAddNew = () => {
    setSelectedFaqItem(null);
    setFormMode("new");
  };

  const handleEdit = (faqItem: FaqItemType) => {
    setSelectedFaqItem(faqItem);
    setFormMode("edit");
  };

  const handleDelete = (id: string) => {
      deleteMutate(id);
  };

  if (isLoading) return <p>Завантаження питань...</p>;
  if (isError) return <p>Помилка: {error.message}</p>;

  return (
    <div className={styles.faq}>
      <div className={classNames(styles.titleContainer, "adminPanelMargin")}>
        <AdminPanelSectionTitle title="Поширені питання" />
        <Button
          className={styles.btn}
          onClick={handleAddNew}
          variant="success"
          disabled={!faqItems || faqItems.length >= 10}
        >
          Додати
        </Button>
      </div>

      {faqItems && (
        <SortableList
          items={[...faqItems].sort((a, b) => a.order - b.order)}
          getId={(item) => item._id}
          onChange={handleReorder}
          renderItem={(faqItem, { listeners, attributes }) => (
            <div className={styles.faqItemContainer}>
              <div className={styles.faqItem}>
                <div className={styles.faqItemTitleContainer}>
                  <span
                    className={classNames(styles.number, {
                      [styles.editMode]:
                        formMode === "edit" &&
                        selectedFaqItem?._id === faqItem._id,
                    })}
                  >
                    #{faqItem.order}
                    {formMode === "edit" &&
                      selectedFaqItem?._id === faqItem._id && (
                        <Suspense fallback={null}>
                          <TextVector
                            viewBox={navigationVector.viewBox}
                            d={navigationVector.d}
                            stroke={navigationVector.stroke}
                            strokeWidth={navigationVector.strokeWidth}
                            customClass={styles.navigationVector}
                            transitionDuration="0.3"
                          />
                        </Suspense>
                      )}
                  </span>
                  <span className={styles.faqItemTitle}>{faqItem.title}</span>
                </div>

                <div className={styles.buttons}>
                  {formMode === "new" ? (
                    <Button
                      className={styles.btnAction}
                      variant="disabled"
                      disabled
                    >
                      {isDesktop ? (
                        <EditIcon className={styles.btnIcon} />
                      ) : (
                        "Змінити"
                      )}
                    </Button>
                  ) : selectedFaqItem?._id === faqItem._id ? (
                    <Button
                      className={styles.btnAction}
                      variant="cancel"
                      onClick={() => {
                        setSelectedFaqItem(null);
                        setFormMode(null);
                      }}
                    >
                      {isDesktop ? (
                        <CrossIcon className={styles.crossIcon} />
                      ) : (
                        "Скасувати"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={styles.btnAction}
                      variant="change"
                      onClick={() => handleEdit(faqItem)}
                    >
                      {isDesktop ? (
                        <EditIcon className={styles.btnIcon} />
                      ) : (
                        "Змінити"
                      )}
                    </Button>
                  )}

                  <Button
                    className={styles.btnAction}
                    variant="error"
                    onClick={() => handleDelete(faqItem._id)}
                  >
                    {isDesktop ? (
                      <DeleteIcon className={styles.btnIcon} />
                    ) : (
                      "Видалити"
                    )}
                  </Button>

                  <span {...attributes} {...listeners}>
                    <DragIcon className={styles.dragIcon} />
                  </span>
                </div>
              </div>
              <Divider />

              {formMode === "edit" && selectedFaqItem?._id === faqItem._id && (
                <div className={styles.faqItemWrapper}>
                  <FaqItem
                    faqItemToEdit={selectedFaqItem}
                    mode="edit"
                    onClose={() => {
                      setSelectedFaqItem(null);
                      setFormMode(null);
                    }}
                    onSave={(data) => updateMutate(data)}
                  />
                </div>
              )}
            </div>
          )}
        />
      )}
      {formMode === "new" && (
        <div className={styles.faqItemWrapper}>
          <FaqItem
            faqItemToEdit={null}
            mode="new"
            onClose={() => setFormMode(null)}
            onSave={(data) => createMutate(data)}
          />
        </div>
      )}
    </div>
  );
};
