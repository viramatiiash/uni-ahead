import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import styles from "./OurServicesAP.module.scss";
import { Course } from "./components/Course/Course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/Button/Button";
import classNames from "classnames";
import { CrossIcon, DeleteIcon, EditIcon, DragIcon } from "@assets/icons";
import { Divider } from "@/components/Divider/Divider";
import React, { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { SortableList } from "@/components/dnd/SortableList";
import { navigationVector } from "@/utils/textVectors";
import { API_BASE_URL } from "@/constants/api";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

interface AccordionItem {
  title: string;
  description: string;
  accordionIcon?: string;
  order: number;
}

interface PaymentPlan {
  title: string;
  planIcon?: string;
  price: number;
  description: string;
  accordionItems: AccordionItem[];
  order: number;
}

interface Service {
  _id: string;
  title: string;
  courseIcon?: string;
  paymentPlans: PaymentPlan[];
  order: number;
}

type ReorderItem = { id: string; order: number };

const fetchServices = async (): Promise<Service[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/services`);
  return data;
};

const updateServicesOrder = async (updates: ReorderItem[]) => {
  return axios.patch(`${API_BASE_URL}/api/services/reorder`, updates);
};

const deleteService = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/api/services/${id}`);
};

export const OurServicesAP = () => {
  const queryClient = useQueryClient();
  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { mutate: deleteCourseMutate } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Курс успішно видалено");
    },
  });

  const { mutate: reorderServices } = useMutation({
    mutationFn: updateServicesOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Порядок успішно оновлено");
    },
  });

  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const [formMode, setFormMode] = useState<"new" | "edit" | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Service | null>(null);

  const handleAddNewCourse = () => {
    setSelectedCourse(null);
    setFormMode("new");
  };

  const handleEditCourse = (course: Service) => {
    setSelectedCourse(course);
    setFormMode("edit");
  };

  const handleDeleteCourse = (id: string) => {
    deleteCourseMutate(id);
  };

  const handleReorder = (newOrder: Service[]) => {
    const updates = newOrder.map((item, index) => ({
      id: item._id,
      order: index + 1,
    }));
    reorderServices(updates);
  };

  if (isLoading) return <p>Завантаження курсів...</p>;
  if (isError) return <p>Сталася помилка: {error.message}</p>;

  return (
    <div className={styles.ourServices}>
      <div className={classNames(styles.titleContainer, "adminPanelMargin")}>
        <AdminPanelSectionTitle title="Курси" />
        <Button
          className={styles.btn}
          onClick={handleAddNewCourse}
          variant="success"
        >
          Додати
        </Button>
      </div>

      <SortableList
        items={[...(services ?? [])].sort((a, b) => a.order - b.order)}
        getId={(item) => item._id}
        onChange={handleReorder}
        renderItem={(service, { listeners, attributes }) => (
          <div>
            <div className={styles.courseContainer}>
              <div className={styles.course}>
                <div className={styles.courseTitleContainer}>
                  <span
                    className={classNames(styles.number, {
                      [styles.editMode]:
                        formMode === "edit" &&
                        selectedCourse?._id === service._id,
                    })}
                  >
                    #{service.order}
                    {formMode === "edit" &&
                      selectedCourse?._id === service._id && (
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
                  <span className={styles.courseTitle}>{service.title}</span>
                </div>
                <div className={styles.buttons}>
                  {formMode === "new" ? (
                    <Button variant="disabled" disabled>
                      {isTablet ? (
                        <EditIcon className={styles.btnIcon} />
                      ) : (
                        "Змінити"
                      )}
                    </Button>
                  ) : selectedCourse?._id === service._id ? (
                    <Button
                      className={styles.btnAction}
                      variant="cancel"
                      onClick={() => {
                        setSelectedCourse(null);
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
                      onClick={() => handleEditCourse(service)}
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
                    onClick={() => handleDeleteCourse(service._id)}
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
            </div>

            {formMode === "edit" && selectedCourse?._id === service._id && (
              <div className={styles.courseWrapper}>
                <Course
                  courseToEdit={selectedCourse}
                  mode="edit"
                  onClose={() => {
                    setSelectedCourse(null);
                    setFormMode(null);
                  }}
                />
              </div>
            )}
          </div>
        )}
      />

      {formMode === "new" && (
        <div className={styles.courseWrapper}>
          <Course
            courseToEdit={null}
            mode="new"
            onClose={() => setFormMode(null)}
          />
        </div>
      )}
    </div>
  );
};
