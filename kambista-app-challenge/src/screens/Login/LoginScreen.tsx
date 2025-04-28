import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import logo from './../../../assets/k_logo_kambista.png';
import FormInput from "../../components/FormInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from "../../components/Checkbox";
import KButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/BuildNavigation";
import { Paths } from "../../routes/paths";

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen(){
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const gotoOnboarding = () => {
    navigation.navigate(Paths.onboarding);
  }
  const onSubmit = (data: LoginForm) => {
    gotoOnboarding();
  };
  const email = watch('email');
  const password = watch('password');
  const isDisabledLogin = !email || !password || Object.keys(errors).length > 0;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView className="flex-1 h-8 w-full p-4 bg-white">
      <View className="w-full flex-1 items-center justify-center">
        <View>
          <Image source={logo} className="w-64 h-24" resizeMode="contain" />
        </View>
        <Text className="font-bold font-montBold text-xl mt-4">Inicia sesión</Text>
        <View className="w-full px-8 mt-16">
          <FormInput
            name="email"
            label="Correo electrónico"
            placeholder="Escribe tu correo"
            control={control}
            keyboardType="email-address"
          />
          <FormInput
            name="password"
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            control={control}
            secureTextEntry
            keyboardType="default"
          />
          <View className="flex-row justify-between mt-2">
            <Checkbox label="Recordarme" />
            <Pressable onPress={() => {}}>
              <Text className="text-k-gray-60 underline text-xs font-mont">
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>
          </View>
          <View className="mt-20">
            <KButton title="INICIA SESIÓN" onPress={handleSubmit(onSubmit)} disabled={isDisabledLogin} />
            <View className="flex-row justify-center mt-5">
              <Text className="text-k-gray-60 text-sm font-mont">¿No tienes cuenta?</Text>
              <Pressable onPress={() => {}}>
              <Text className="text-k-gray-60 underline text-sm font-mont">
               {` Regístrate aquí`}
              </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}