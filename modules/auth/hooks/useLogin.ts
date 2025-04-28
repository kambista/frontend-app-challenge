import { authService } from "@/services/api/authService";
import { useCustomMutation } from "../../../hooks/useCustomMutation";

interface IUseLogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ email, password }: IUseLogin) =>
      authService.login(email, password)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
