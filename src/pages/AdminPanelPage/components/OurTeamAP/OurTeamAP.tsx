import axios from "axios";
import styles from "./OurTeamAP.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import { Divider } from "@/components/Divider/Divider";
import { Button } from "@/components/Button/Button";
import classNames from "classnames";
import { CrossIcon, DeleteIcon, EditIcon } from "@assets/icons";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { TeamMember } from "./components/TeamMember";
import { SortableList } from "@/components/dnd/SortableList";
import { DragIcon } from "@assets/icons";
import { useMediaQuery } from 'react-responsive';
import { navigationVector } from '@/utils/textVectors';
import { API_BASE_URL } from "@/constants/api";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export type TeamMemberType = {
  _id: string;
  order: number;
  photo: string;
  name: string;
  position: string;
  description: string;
};

type ReorderItem = { id: string; order: number };

const fetchTeamMembers = async (): Promise<TeamMemberType[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/team-members`);
  return data;
};

const updateTeamMember = async (data: TeamMemberType) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/team-members/${data._id}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const deleteTeamMember = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/api/team-members/${id}`);
};

const updateTeamMembersOrder = async (updates: ReorderItem[]) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/team-members/reorder`,
    updates,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const createTeamMember = async (data: Omit<TeamMemberType, "_id">) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/team-members`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const OurTeamAP = () => {
  const queryClient = useQueryClient();

  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useQuery<TeamMemberType[]>({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
  });

  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["team-members"] }),
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["team-members"] }),
  });

  const { mutate: reorderMutate } = useMutation({
    mutationFn: updateTeamMembersOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["team-members"] }),
  });

  const handleReorder = (newOrder: TeamMemberType[]) => {
    const updates = newOrder.map((item, index) => ({
      id: item._id,
      order: index + 1,
    }));
    reorderMutate(updates);
  };

  const [formMode, setFormMode] = useState<"new" | "edit" | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(
    null
  );

  const handleAddNew = () => {
    setSelectedMember(null);
    setFormMode("new");
  };

  const handleEdit = (member: TeamMemberType) => {
    setSelectedMember(member);
    setFormMode("edit");
  };

  const handleDelete = (id: string) => {
    if (confirm("Ти впевнений, що хочеш видалити мембера?")) {
      deleteMutate(id);
    }
  };

  if (isLoading) return <p>Завантаження мемберів...</p>;
  if (isError) return <p>Помилка: {error.message}</p>;

  return (
    <div className={styles.ourTeam}>
      <div className={classNames(styles.titleContainer, "adminPanelMargin")}>
        <AdminPanelSectionTitle title="Наша команда" />
        <Button className={styles.btn} onClick={handleAddNew} variant="success">
          Додати
        </Button>
      </div>

      {members && (
        <SortableList
          items={[...members].sort((a, b) => a.order - b.order)}
          getId={(item) => item._id}
          onChange={handleReorder}
          renderItem={(member, { listeners, attributes }) => (
            <div className={styles.memberContainer}>
              <div className={styles.member}>
                <div className={styles.memberTitleContainer}>
                  <span
                    className={classNames(styles.number, {
                      [styles.editMode]:
                        formMode === "edit" &&
                        selectedMember?._id === member._id,
                    })}
                  >
                    #{member.order}
                    {formMode === "edit" &&
                      selectedMember?._id === member._id && (
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
                  <span className={styles.memberTitle}>{member.name}</span>
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
                  ) : selectedMember?._id === member._id ? (
                    <Button
                      className={styles.btnAction}
                      variant="cancel"
                      onClick={() => {
                        setSelectedMember(null);
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
                      onClick={() => handleEdit(member)}
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
                    onClick={() => handleDelete(member._id)}
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

              {formMode === "edit" && selectedMember?._id === member._id && (
                <div className={styles.teamMemberWrapper}>
                  <TeamMember
                    memberToEdit={selectedMember}
                    mode="edit"
                    onClose={() => {
                      setSelectedMember(null);
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
        <div className={styles.teamMemberWrapper}>
          <TeamMember
            memberToEdit={null}
            mode="new"
            onClose={() => setFormMode(null)}
            onSave={(data) => createMutate(data)}
          />
        </div>
      )}
    </div>
  );
};
