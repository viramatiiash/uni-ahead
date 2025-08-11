import axios from "axios";
import styles from "./TestimonialsAP.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import classNames from "classnames";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { Button } from "@/components/Button/Button";
import { SortableList } from "@/components/dnd/SortableList";
import {
  CrossIcon,
  DeleteIcon,
  DragIcon,
  EditIcon,
} from "@assets/icons";
import { Divider } from "@/components/Divider/Divider";
import { Testimonial } from "./components/Testimonial";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { navigationVector } from '@/utils/textVectors';
import { API_BASE_URL } from "@/constants/api";
const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export type TestimonialType = {
  _id: string;
  order: number;
  name: string;
  text: string;
  stars: number;
};

type ReorderItem = { id: string; order: number };

const fetchTestimonials = async (): Promise<TestimonialType[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/testimonials`);
  return data;
};

const updateTestimonial = async (data: TestimonialType) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/testimonials/${data._id}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const deleteTestimonial = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/api/testimonials/${id}`);
};

const updateTestimonialsOrder = async (updates: ReorderItem[]) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/testimonials/reorder`,
    updates,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const createTestimonial = async (data: Omit<TestimonialType, "_id">) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/testimonials`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const TestimonialsAP = () => {
  const queryClient = useQueryClient();
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const {
    data: testimonials,
    isLoading,
    isError,
    error,
  } = useQuery<TestimonialType[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Відгук успішно додано");
    },
    onError: () => {
      toast.error("Не вдалося видалити відгук");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Відгук успішно оновлено");
    },
    onError: () => {
      toast.error("Не вдалося оновити відгук");
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Відгук успішно створено");
    },
    onError: () => {
      toast.error("Не вдалося створити відгук");
    },
  });

  const { mutate: reorderMutate } = useMutation({
    mutationFn: updateTestimonialsOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Послідовність відгуків успішно оновлено");
    },
    onError: () => {
      toast.error("Не вдалося оновити послідовність відгуків");
    },
  });

  const handleReorder = (newOrder: TestimonialType[]) => {
    const updates = newOrder.map((item, index) => ({
      id: item._id,
      order: index + 1,
    }));
    reorderMutate(updates);
  };

  const [formMode, setFormMode] = useState<"new" | "edit" | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialType | null>(null);

  const handleAddNew = () => {
    setSelectedTestimonial(null);
    setFormMode("new");
  };

  const handleEdit = (review: TestimonialType) => {
    setSelectedTestimonial(review);
    setFormMode("edit");
  };

  const handleDelete = (id: string) => {
    if (confirm("Ти впевнений, що хочеш видалити відгук?")) {
      deleteMutate(id);
    }
  };

  if (isLoading) return <p>Завантаження відгуків...</p>;
  if (isError) return <p>Помилка: {error.message}</p>;
  return (
    <div className={styles.testimonials}>
      <div className={classNames(styles.titleContainer, "adminPanelMargin")}>
        <AdminPanelSectionTitle title="Відгуки" />
        <Button className={styles.btn} onClick={handleAddNew} variant="success">
          Додати
        </Button>
      </div>

      {testimonials && (
        <SortableList
          items={[...testimonials].sort((a, b) => a.order - b.order)}
          getId={(item) => item._id}
          onChange={handleReorder}
          renderItem={(testimonial, { listeners, attributes }) => (
            <div className={styles.testimonialContainer}>
              <div className={styles.testimonial}>
                <div className={styles.testimonialTitleContainer}>
                  <span
                    className={classNames(styles.number, {
                      [styles.editMode]:
                        formMode === "edit" &&
                        selectedTestimonial?._id === testimonial._id,
                    })}
                  >
                    #{testimonial.order}
                    {formMode === "edit" &&
                      selectedTestimonial?._id === testimonial._id && (
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
                  <span className={styles.testimonialTitle}>
                    {testimonial.name}
                  </span>
                </div>

                <div className={styles.buttons}>
                  {formMode === "new" ? (
                    <Button
                      className={styles.btnAction}
                      variant="disabled"
                      disabled
                    >
                      {isTablet ? (
                        <EditIcon className={styles.btnIcon} />
                      ) : (
                        "Змінити"
                      )}
                    </Button>
                  ) : selectedTestimonial?._id === testimonial._id ? (
                    <Button
                      className={styles.btnAction}
                      variant="cancel"
                      onClick={() => {
                        setSelectedTestimonial(null);
                        setFormMode(null);
                      }}
                    >
                      {isTablet ? (
                        <CrossIcon className={styles.crossIcon} />
                      ) : (
                        "Скасувати"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={styles.btnAction}
                      variant="change"
                      onClick={() => handleEdit(testimonial)}
                    >
                      {isTablet ? (
                        <EditIcon className={styles.btnIcon} />
                      ) : (
                        "Змінити"
                      )}
                    </Button>
                  )}

                  <Button
                    className={styles.btnAction}
                    variant="error"
                    onClick={() => handleDelete(testimonial._id)}
                  >
                    {isTablet ? (
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
              {formMode === "edit" &&
                selectedTestimonial?._id === testimonial._id && (
                  <div className={styles.testimonialWrapper}>
                    <Testimonial
                      testimonialToEdit={selectedTestimonial}
                      mode="edit"
                      onClose={() => {
                        setSelectedTestimonial(null);
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
        <div className={styles.testimonialWrapper}>
          <Testimonial
            testimonialToEdit={null}
            mode="new"
            onClose={() => setFormMode(null)}
            onSave={(data) => createMutate(data)}
          />
        </div>
      )}
    </div>
  );
};
