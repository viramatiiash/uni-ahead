import axios from "axios";
import styles from "./Links.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { API_BASE_URL } from "@/constants/api";

export type ContactInfosType = {
  telegram: string;
  whatsapp: string;
  instagram: string;
  emailLink: string;
  phoneLink: string;
  emailText: string;
  phoneText: string;
};

const fetchContactInfos = async (): Promise<ContactInfosType> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/contact-infos`);
  return data;
};

const updateContactInfos = async (data: ContactInfosType) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/contact-infos`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const Links = () => {
  const queryClient = useQueryClient();

  const {
    data: contactInfos,
    isLoading,
  } = useQuery<ContactInfosType>({
    queryKey: ["contact-infos"],
    queryFn: fetchContactInfos,
  });

  const { control, handleSubmit, reset } = useForm<ContactInfosType>({
    defaultValues: {
      telegram: "",
      whatsapp: "",
      instagram: "",
      emailLink: "",
      phoneLink: "",
      emailText: "",
      phoneText: "",
    },
  });

  useEffect(() => {
    if (contactInfos) reset(contactInfos);
  }, [contactInfos]);

  const mutation = useMutation({
    mutationFn: updateContactInfos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-infos"] });
      toast.success("Контактна інформація збережена");
    },
    onError: () => {
      toast.error("Виникла помилка при збереженні");
    },
  });

  const onSubmit: SubmitHandler<ContactInfosType> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading || !contactInfos) return <div>Завантаження...</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.block}>
        <AdminPanelSectionTitle title="Соцмережі" />

        <Input
          belongsTo="contactInfos"
          name="telegram"
          control={control}
          variant="adminPanel"
          label="Telegram"
        />

        <Input
          belongsTo="contactInfos"
          name="whatsapp"
          control={control}
          variant="adminPanel"
          label="WhatsApp"
        />

        <Input
          belongsTo="contactInfos"
          name="instagram"
          control={control}
          variant="adminPanel"
          label="Instagram"
        />
      </div>

      <div className={styles.block}>
        <AdminPanelSectionTitle title="Імейл" />
        <Input
          belongsTo="contactInfos"
          name="emailLink"
          control={control}
          variant="adminPanel"
          label="Посилання"
          type="email"
          rules={{
            required: "Це поле обов’язкове",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некоректний email",
            },
          }}
        />
        <Input
          belongsTo="contactInfos"
          name="emailText"
          control={control}
          variant="adminPanel"
          label="Відображуваний текст"
        />
      </div>

      <div className={styles.block}>
        <AdminPanelSectionTitle title="Телефон" />
        <Input
          belongsTo="contactInfos"
          name="phoneLink"
          control={control}
          variant="adminPanel"
          label="Посилання"
          rules={{
            required: "Це поле обов’язкове",
            pattern: {
              value: /^\+?[0-9\s\-()]{6,20}$/,
              message: "Некоректний номер телефону",
            },
          }}
        />
        <Input
          belongsTo="contactInfos"
          name="phoneText"
          control={control}
          variant="adminPanel"
          label="Відображуваний текст"
        />
      </div>

      <Button className={styles.button} type="submit" variant="success">
        Зберегти
      </Button>
    </form>
  );
};
