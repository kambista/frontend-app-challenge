import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import AppSafeArea from "../../components/AppSafeArea";
import Button from "../../components/Button";
import CheckboxField from "../../components/CheckboxField";
import FieldLabel from "../../components/FieldLabel";
import Input from "../../components/Input";
import { AuthStackParamList, MainStackParamList } from "../../navigation/navigation.types";
import { useLogin } from "../../hooks/auth/useLogin";
import { LoginPayload } from "../../services/auth/auth.types";
import util from "../../utils/util";
import { useAuthStore } from "../../stores/auth/authStore";

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, "Login">,
  NativeStackNavigationProp<MainStackParamList>
>;

export default function LoginScreen() {
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [errors, setErrors] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [showServerError, setShowServerError] = useState(false);
  const { submit, isLoading, error } = useLogin();
  const session = useAuthStore((state) => state);

  const validateEmail = (email: string): string => util.isValidEmail(email) ? "" : "Correo electrónico inválido";

  const validatePassword = (password: string): string =>
    util.isValidPassword(password) ? "" : "Mínimo 8 caracteres";

  const handleChangeEmail = (email: string) => {
    setShowServerError(false);
    setForm({ ...form, email: email.trim() });

    if (email.trim().length > 0) {
      setErrors({ ...errors, email: validateEmail(email.trim()) });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const handleChangePassword = (password: string) => {
    setShowServerError(false);
    setForm({ ...form, password: password.trim() });

    if (password.trim().length > 0) {
      setErrors({ ...errors, password: validatePassword(password.trim()) });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleSubmit = async () => {
    const emailValue = form.email.trim();
    const passwordValue = form.password.trim();

    const nextErrors: LoginPayload = {
      email: !emailValue
        ? "Ingresa tu correo electrónico"
        : validateEmail(emailValue),
      password: !passwordValue
        ? "Ingresa tu contraseña"
        : validatePassword(passwordValue),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(error => error !== "")) return;

    try {
      const res = await submit(form);

      if(res.success) {
        session.setSession(res.data)
      }
      
      setShowServerError(false);
    } catch {
      setShowServerError(true);
    }
  };

  return (
    <AppSafeArea>
      <View className="mb-14 mt-6 items-center">
        <View className="mb-8">
          <Image source={require("../../../assets/kambista_logo.png")} style={{ width: 180, height: 50 }} resizeMode="contain" />
        </View>
        <Text className="text-center text-xl font-bold text-black">
          Inicia sesión
        </Text>
      </View>

      <View className="mb-4 w-full">
        <FieldLabel>Correo electrónico</FieldLabel>
        <Input
          placeholder="Escribe tu correo"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={form.email}
          error={errors.email}
          onChangeText={(text) => handleChangeEmail(text)}
        />
      </View>

      <View className="mb-4 w-full">
        <FieldLabel>Contraseña</FieldLabel>
        <Input
          placeholder="Escribe tu contraseña"
          showPasswordToggle
          value={form.password}
          error={errors.password}
          onChangeText={(text) => handleChangePassword(text)}
        />
      </View>

      {showServerError && error ? (
        <View className="mb-4 w-full">
          <Text className="text-sm text-red-600">{error}</Text>
        </View>
      ) : null}

      <View className="mb-10 mt-2 flex-row items-center justify-between">
        <CheckboxField
          variant="cyan"
          checked={rememberMe}
          onPress={() => setRememberMe((v) => !v)}
          className="items-center gap-2"
          label={
            <Text className="text-sm text-gray-500">Recordarme</Text>
          }
        />

        <Button variant="link" onPress={() => { }}>
          ¿Olvidaste tu contraseña?
        </Button>
      </View>

      <Button variant="fill" tone="mint" className="mb-8 mt-14" onPress={handleSubmit} disabled={isLoading}>
        INICIA SESIÓN
      </Button>

      <View className="flex-row items-center justify-center">
        <Text className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
        </Text>

        <Button
          variant="link"
          onPress={() => navigation.navigate("Register")}
        >
          Registrate aquí
        </Button>
      </View>
    </AppSafeArea>
  );
}
