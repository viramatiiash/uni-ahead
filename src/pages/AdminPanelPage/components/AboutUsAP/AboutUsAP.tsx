import styles from "./AboutUsAP.module.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "@components/Input/Input";
import { useEffect } from "react";
import { Button } from "@/components/Button/Button";
import { toast } from "react-toastify";
import { AdminPanelSectionTitle } from "@/components/AdminPanelSectionTitle/AdminPanelSectionTitle";
import { TextEditor } from '@/components/TextEditor/TextEditor';
import { API_BASE_URL } from "@/constants/api";

type AboutUsType = {
  _id: string;
  miniTitle: string;
  text: string;
  videoUrl: string;
};

const fetchAboutUs = async (): Promise<AboutUsType> => {
  const res = await fetch(`${API_BASE_URL}/api/about-us`);
  return res.json();
};

const updateAboutUs = async (data: AboutUsType) => {
  const res = await fetch(`${API_BASE_URL}/api/about-us/${data._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const AboutUsAP = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["about_us"],
    queryFn: fetchAboutUs,
  });

  const { control, handleSubmit, reset } = useForm<AboutUsType>({
    defaultValues: {
      miniTitle: "",
      text: "",
      videoUrl: "",
      _id: "",
    },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateAboutUs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about_us"] });
      toast.success("Зміни збережено");
    },
  });

  const onSubmit: SubmitHandler<AboutUsType> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading || !data) return <div>Завантаження...</div>;

  return (
    <>
      <div className="adminPanelMargin">
        <AdminPanelSectionTitle title="Про нас" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          belongsTo="about"
          name="miniTitle"
          control={control}
          variant="adminPanel"
          label="Міні-заголовок"
          showCounter
          rules={{
            maxLength: { value: 30, message: "Максимум 30 символів" },
            required: "Це поле обов’язкове",
          }}
        />

        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <div>
              <p className={styles.label}>Текст</p>
              <TextEditor
                maxLength={500}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Input
          belongsTo="about"
          name="videoUrl"
          control={control}
          variant="adminPanel"
          label="Посилання на відео"
        />
        <Button className={styles.button} type="submit" variant="success">
          Зберегти
        </Button>
      </form>
    </>
  );
};
