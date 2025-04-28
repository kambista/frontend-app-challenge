import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import CustomLink from "@/components/CustomLink";
import EyeCloseIcon from "@/components/Icons/EyeCloseIcon";
import EyeOpenIcon from "@/components/Icons/EyeOpenIcon";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { useAuthStore } from "@/stores/useAuthStore";
import { IUser } from "@/types/storage/IUser";
import { IResponse } from "@/types/utils/requests";
import { REDIRECT_URLS } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { schema } from "./schema";
import { defaultValues } from "./utils";
import { LoginFormTypes } from "./types";

interface LoginFormProps {
  router: Router;
}

const LoginForm = ({ router }: LoginFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuthStore();

  const Login = useLogin();

  const {
    formState: { isValid },
    control,
    handleSubmit
  } = useForm<LoginFormTypes>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const submitForm = async (data: LoginFormTypes) => {
    const { email, password } = data;
    const response = (await Login.handle({
      email,
      password
    })) as IResponse<IUser>;
    if (response.success && response.data) {
      login({
        uuid: response.data.uuid,
        name: response.data.name,
        email: response.data.email,
        hasCompletedOnboarding: response.data.hasCompletedOnboarding || false
      });
      router.push("/(auth)/onboarding");
    }
  };

  return (
    <View className="flex-col gap-5">
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <CustomInput
            label="Correo electrónico"
            placeholder="Escribe tu correo electrónico"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <CustomInput
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            rightElement={
              <Text onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeCloseIcon size={20} color="#060F26" />
                ) : (
                  <EyeOpenIcon size={20} color="#060F26" />
                )}
              </Text>
            }
          />
        )}
      />

      <View className="flex-row justify-between">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              label="Recordarme"
              checked={value}
              onChange={onChange}
              size={20}
            />
          )}
        />
        <CustomLink onPress={() => router.push(REDIRECT_URLS.FORGOT_PASSWORD)}>
          ¿Olvidaste tu contraseña?
        </CustomLink>
      </View>

      <View className="flex-col gap-5 mt-20">
        <Button
          size="lg"
          onPress={() => handleSubmit(submitForm)()}
          disabled={!isValid || Login.loading}
        >
          INICIA SESIÓN
        </Button>
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-sm text-gray-60 font-montserrat-medium">
            ¿No tienes cuenta?
          </Text>
          <CustomLink
            textClassName="text-sm text-gray-60 font-montserrat-medium"
            onPress={() => router.push(REDIRECT_URLS.REGISTER)}
          >
            Regístrate aquí
          </CustomLink>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
