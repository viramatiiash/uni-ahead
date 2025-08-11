import { useForm } from "react-hook-form";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormWrapper } from "@/components/Form/FormWrapper";
import Input from "@/components/Input/Input";
import styles from "./LoginPage.module.scss";
import { Button } from "@/components/Button/Button";
import { API_BASE_URL } from "@/constants/api";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const loginUser = (
  loginData: LoginFormInputs
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>(`${API_BASE_URL}/api/login`, loginData);
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      navigate("/admin-panel");
      toast.success("Вхід виконано успішно");
    },
    onError: () => {
      toast("Помилка входу у систему. Перевірте введені дані.");
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <div className={styles.pageWrapper}>
      <FormWrapper className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Вхід у систему</h2>

          <div className={styles.fields}>
            <Input<LoginFormInputs>
              belongsTo="login"
              name="email"
              label="Email"
              type="email"
              placeholder="Введіть email"
              control={control}
              rules={{ required: "Email обовʼязковий" }}
              error={errors.email?.message}
            />

            <Input<LoginFormInputs>
              belongsTo="login"
              name="password"
              label="Пароль"
              type="password"
              placeholder="Введіть пароль"
              control={control}
              rules={{ required: "Пароль обовʼязковий" }}
              error={errors.password?.message}
            />
          </div>

          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Вхід..." : "Увійти"}
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
};
