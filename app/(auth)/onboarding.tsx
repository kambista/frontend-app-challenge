import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import FormField from "@/components/FormField";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import TopBar from "@/components/TopBar";
import DatePicker from "@/features/Onboarding/DatePicker";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-white">
      <TopBar
        title="Completa tus datos"
        leftIcon={<ArrowLeftIcon size={26} color="#060F26" />}
        rightIcon={<LogoutIcon size={24} color="#060F26" />}
        onLeftPress={handleGoToLogin}
      />
      <View className="flex-col h-full gap-8 p-6">
        <Text className="text-base text-center font-montserrat-medium">
          Completa tus datos{" "}
          <Text className="font-montserrat-bold">
            como figuran{"\n"} en tu documento de identidad
          </Text>
        </Text>
        <View className="flex-col gap-4">
          <CustomInput
            label="Nombres completos"
            placeholder="Escribe tu nombres y apellidos"
            value={""}
            onChangeText={() => {}}
            autoCapitalize="none"
            keyboardType="default"
          />
          <View className="flex flex-row gap-2">
            <FormField label="Documento" className="flex-1">
              <View className="flex-row gap-2">
                <BaseSelect
                  options={[
                    { label: "Opción 1", value: "1" },
                    { label: "Opción 2", value: "2" },
                    { label: "Opción 3", value: "3" },
                  ]}
                  placeholder="Tipo"
                  onValueChange={(value) =>
                    console.log("Valor seleccionado:", value)
                  }
                  className="w-32"
                />
                <CustomInput
                  placeholder="N° de documento"
                  value={""}
                  onChangeText={() => {}}
                  autoCapitalize="none"
                  keyboardType="default"
                  containerClassName="flex-1"
                />
              </View>
            </FormField>
          </View>
          <Banner>
            Tu documento de identidad debe coincidir con tus datos para evitar
            inconvenientes al momento de hacer una primera operación
          </Banner>
          <View>
            <View className="flex flex-row gap-2">
              <CustomInput
                label="Celular"
                placeholder="N° de celular"
                value={""}
                onChangeText={() => {}}
                autoCapitalize="none"
                keyboardType="email-address"
                containerClassName="w-1/2"
              />
              <DatePicker
                label="Fecha de nacimiento"
                value={new Date()}
                onChange={(date) => console.log(date)}
                className="flex-1"
              />
            </View>
          </View>
          <BaseSelect
            options={[
              { label: "Opción 1", value: "1" },
              { label: "Opción 2", value: "2" },
              { label: "Opción 3", value: "3" },
            ]}
            label="¿Donde cambiabas antes? (Opcional)"
            placeholder="Último lugar de cambio"
          />
        </View>
        <View className="flex flex-col items-start w-full gap-2">
          <Checkbox
            label={
              <Text className="text-xs text-primary-dark font-montserrat-medium">
                He leído y acepto los{" "}
                <Text
                  className="underline font-montserrat-bold"
                  onPress={() => {}}
                >
                  Términos y condiciones
                </Text>
              </Text>
            }
            checked={false}
            onChange={() => {}}
            size={20}
            className="justify-start w-full gap-1"
          />
          <Checkbox
            label={
              <Text className="text-xs text-primary-dark font-montserrat-medium">
                Acepto de manera expresa e informada la{" "}
                <Text
                  className="underline font-montserrat-bold"
                  onPress={() => {}}
                >
                  Política de Tratamiento de datos personales de Kambista
                </Text>
              </Text>
            }
            checked={false}
            onChange={() => {}}
            size={20}
            className="justify-start gap-1"
          />
        </View>
        <Button size="lg" onPress={() => router.push("/welcome")}>
          REGISTRARME
        </Button>
      </View>
    </View>
  );
}
