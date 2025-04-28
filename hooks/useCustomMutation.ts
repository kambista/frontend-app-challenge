import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { IErrorResponse } from "@/types/utils/requests";

export function useCustomMutation<
  TData = unknown,
  TError = IErrorResponse,
  TVariables = void,
  TContext = unknown
>(mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation({
    ...mutationOptions,
    onError: (error, variables, context) => {
      Toast.show({
        type: "error",
        text1: (error as IErrorResponse)?.data?.title ?? "Error",
        text2:
          (error as IErrorResponse)?.data?.message ??
          "Ocurrió un error inesperado"
      });

      if (mutationOptions.onError)
        mutationOptions.onError(error, variables, context);
    }
  });
}
