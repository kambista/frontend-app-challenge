import { Text, View } from "react-native";
import { ScreenWrapper } from "../../components/Wrapper";
import FormInput from "../../components/FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPicker } from "../../components/Picker";
import Checkbox from "../../components/Checkbox";
import KButton from "../../components/Button";
import AlertMessage from "../../components/Alert";
import { useState } from "react";
import { evalNulls } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { Paths } from "../../routes/paths";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/BuildNavigation";
import { useUserStore } from "../../store/userStore";

type OnboardingForm = z.infer<typeof onboardingSchema>;

const onboardingSchema = z.object({
  name: z.string().min(1, 'Ingresa tus nombres y apellidos'),
  dni: z.string().min(8, 'Ingresa un DNI válido'),
  phone: z.string().min(1, 'Ingresa tu número de celular'),
  dniType: z.string().min(1, 'Selecciona el tipo de documento'),
  birthdate: z
    .string()
    .refine((val) => {
      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = val.match(regex);
      if (!match) return false; 
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      const birthDate = new Date(year, month, day);
      const currentDate = new Date();
      if (birthDate.toString() === 'Invalid Date') return false;
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const m = currentDate.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
        return age > 18;
      }
      return age >= 18;
    }, {
      message: 'Debes ser mayor de 18 años',
    }),
});

export function OnboardingScreen(){
  const {
      control,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<OnboardingForm>({
      resolver: zodResolver(onboardingSchema),
  });
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const {setUser} = useUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onSubmit = (data: OnboardingForm) => {
    setUser(data);
    navigation.navigate(Paths.onboardingFinish);
  };
  const name = watch('name');
  const dni = watch('dni');
  const phone = watch('phone');
  const birthDate = watch('birthdate');
  const evalValues = evalNulls([name, dni, phone, birthDate])
  const isDisabledSubmit = !evalValues || !terms1 || !terms2 || Object.keys(errors).length > 0;
  return(
    <ScreenWrapper>
      <View className="items-center mt-5 mb-8">
        <Text className="font-mont text-center">Completa tus datos 
          <Text className="font-montBold"> como figuran en tu documento de identidad</Text>
        </Text>
      </View>
      <FormInput
        name="name"
        label="Nombres completos"
        placeholder="Escribe tus nombres y apellidos"
        control={control}
      />
      <Text className="text-sm mb-1 text-k-gray-60 font-mont">Documento</Text>
      <View className="flex-row justify-between gap-2">
        <View style={{flex: 3}}>
          <FormPicker
            name="dniType"
            items={[
              { label: 'DNI', value: 'dni' },
              { label: 'CCE', value: 'cce' },
              { label: 'PASAPORTE', value: 'passport' },
            ]}
            required
            placeholder="Tipo"
            control={control}
          />
        </View>
        <View style={{flex: 7}}>
          <FormInput
            name="dni"
            placeholder="Nº de documento"
            control={control}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View className="mt-1 mb-4">
        <AlertMessage label={"Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación"} />
      </View>
      <View className="flex-row justify-between gap-2">
        <View style={{flex: 1}}>
          <FormInput
            name="phone"
            label="Celular"
            placeholder="Nº de celular"
            control={control}
            keyboardType="phone-pad"
          />
        </View>
        <View style={{flex: 1}}>
          <FormInput
            name="birthdate"
            label="Fecha de Nacimiento"
            placeholder="DD/MM/AA"
            control={control}
            keyboardType="numbers-and-punctuation"
          />
        </View>
      </View>
      <FormPicker
        name="exchangePlace"
        items={[
          { label: 'Perú', value: 'pe' },
          { label: 'Argentina', value: 'ar' },
          { label: 'México', value: 'mx' },
        ]}
        required
        label="Donde cambiabas antes? (Opcional)"
        placeholder="Ultimo lugar de cambio"
        control={control}
      />
      <View className="flex-row gap-2 mt-1">
        <Checkbox
          onChange={(e) => setTerms1(e)}
        />
        <Text className="font-mont text-center text-sm">He leído y acepto los 
          <Text className="font-montBold text-sm underline"> Términos y condiciones</Text>
        </Text>
      </View>
      <View className="flex-row gap-2 mt-3 mb-12">
        <Checkbox
          onChange={(e) => setTerms2(e)}
        />
        <Text className="font-mont text-sm text-left">Acepto de manera expresa e informada la 
          <Text className="font-montBold text-sm text-left flex-1 underline"> Política de Tratamiento de datos personales de Kambista</Text>
        </Text>
      </View>
      <KButton title="Registrarme" onPress={handleSubmit(onSubmit)} disabled={isDisabledSubmit} />
    </ScreenWrapper>
  )
}