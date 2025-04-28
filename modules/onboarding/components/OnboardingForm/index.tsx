import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import FormField from "@/components/FormField";
import DatePicker from "@/modules/onboarding/components/DatePicker";
import { useCreatePhone } from "@/modules/onboarding/hooks/useCreatePhone";
import { useSavePersonalData } from "@/modules/onboarding/hooks/useSavePersonalData";
import { useAuthStore } from "@/stores/useAuthStore";
import { DocumentType } from "@/types/storage/IDocument";
import { IOnboardingPayload } from "@/types/storage/IOnboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import { Router } from "expo-router";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCreateDocument } from "../../hooks/useCreateDocument";
import { useValidateDocument } from "../../hooks/useValidateDocument";
import { useValidatePhone } from "../../hooks/useValidatePhone";
import { schema } from "./schema";
import { OnboardingFormTypes } from "./types";
import { defaultValues, documentTypes, previousCompanies } from "./utils";

interface OnboardingFormProps {
  router: Router;
}

const OnboardingForm = ({ router }: OnboardingFormProps) => {
  const { user } = useAuthStore();

  const ValidatePhone = useValidatePhone();
  const ValidateDocument = useValidateDocument();
  const CreatePhone = useCreatePhone();
  const CreateDocument = useCreateDocument();
  const SavePersonalData = useSavePersonalData();

  const {
    formState: { isValid, errors },
    control,
    trigger,
    handleSubmit
  } = useForm<OnboardingFormTypes>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const documentType = useWatch({ control, name: "documentType" });

  const submitForm = async (data: OnboardingFormTypes) => {
    const {
      name,
      documentType,
      documentNumber,
      phone,
      birthDate,
      previousCompany,
      acceptTerms,
      acceptPolicy
    } = data;

    const phoneExists = await ValidatePhone.handle({ phoneNumber: phone });
    const documentExists = await ValidateDocument.handle({
      documentType: documentType as DocumentType,
      documentNumber: documentNumber
    });
    if (!user) return;

    if (!phoneExists.success) return;
    else await CreatePhone.handle({ phoneNumber: phone, userUuid: user.uuid });

    if (!documentExists.success) return;
    else
      await CreateDocument.handle({
        documentType: documentType as DocumentType,
        documentNumber,
        userUuid: user.uuid
      });

    const payload: Partial<IOnboardingPayload> = {
      name,
      birthDate,
      previousCompany,
      acceptTerms,
      acceptPolicy
    };

    const response = await SavePersonalData.handle({
      userUuid: user.uuid,
      payload
    });
    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Datos guardados correctamente"
      });
      router.push("/(auth)/welcome");
    }
  };

  const loading =
    ValidatePhone.loading ||
    ValidateDocument.loading ||
    CreatePhone.loading ||
    CreateDocument.loading ||
    SavePersonalData.loading;

  return (
    <ScrollView>
      <View className="flex-col h-full gap-8 p-6">
        <Text className="text-base text-center font-montserrat-medium">
          Completa tus datos{" "}
          <Text className="font-montserrat-bold">
            como figuran{"\n"} en tu documento de identidad
          </Text>
        </Text>
        <View className="flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <CustomInput
                label="Nombres completos"
                placeholder="Escribe tu nombres y apellidos"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="default"
                error={fieldState.error?.message}
              />
            )}
          />
          <View className="flex flex-row gap-2">
            <FormField label="Documento" className="flex-1">
              <View className="flex-row gap-2">
                <Controller
                  name="documentType"
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <BaseSelect
                      options={documentTypes}
                      placeholder="Tipo"
                      onValueChange={(v) => {
                        onChange(v);
                        trigger("documentNumber");
                      }}
                      value={value}
                      className="w-32"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="documentNumber"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState
                  }) => (
                    <CustomInput
                      placeholder="N° de documento"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      keyboardType={
                        documentType === "dni" ? "numeric" : "default"
                      }
                      containerClassName="flex-1"
                      error={fieldState.error?.message}
                    />
                  )}
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
              <Controller
                name="phone"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState
                }) => (
                  <CustomInput
                    label="Teléfono"
                    placeholder="N° de teléfono"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    error={fieldState.error?.message}
                    containerClassName="w-1/2"
                  />
                )}
              />
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <DatePicker
                    label="Fecha de nacimiento"
                    value={value}
                    onChange={onChange}
                    error={fieldState.error?.message}
                    className="flex-1"
                  />
                )}
              />
            </View>
          </View>
          <BaseSelect
            options={previousCompanies}
            label="¿Donde cambiabas antes?"
            placeholder="Último lugar de cambio"
            isOptional
          />
        </View>
        <View className="flex flex-col items-start w-full gap-2">
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field: { onChange, value } }) => (
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
                checked={value}
                onChange={onChange}
                size={20}
                className="justify-start w-full gap-1"
              />
            )}
          />
          <Controller
            name="acceptPolicy"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={
                  <Text className="text-xs text-primary-dark font-montserrat-medium">
                    He leído y acepto la{" "}
                    <Text
                      className="underline font-montserrat-bold"
                      onPress={() => {}}
                    >
                      Política de Tratamiento de datos personales de Kambista
                    </Text>
                  </Text>
                }
                checked={value}
                onChange={onChange}
                size={20}
                className="justify-start w-full gap-1"
              />
            )}
          />
        </View>
        <Button
          size="lg"
          onPress={() => handleSubmit(submitForm)()}
          disabled={!isValid || loading}
          isLoading={loading}
        >
          REGISTRARME
        </Button>
      </View>
    </ScrollView>
  );
};

export default OnboardingForm;
