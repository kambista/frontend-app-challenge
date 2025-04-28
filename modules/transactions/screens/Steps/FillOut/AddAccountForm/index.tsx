import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import FormField from "@/components/FormField";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { BankAccountFormTypes } from "./types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { accountTypes, defaultValues, getFinancialEntities } from "./utils";
import { useAuthStore } from "@/stores/useAuthStore";
import Toast from "react-native-toast-message";
import { IBankAccountPayload } from "@/types/storage/IBankAccount";
import { useSaveBankAccountData } from "@/modules/transactions/hooks/useSaveBankAccountData";

interface AddAccountFormProps {
  currencySymbol: string;
  active: boolean;
  onClose: () => void;
  onConfirm: (data: IBankAccountPayload) => void;
}

const AddAccountForm = ({
  active,
  onClose,
  onConfirm
}: AddAccountFormProps) => {
  const { user } = useAuthStore();
  const SaveAccountData = useSaveBankAccountData();

  const {
    formState: { isValid, errors },
    control,
    trigger,
    reset,
    handleSubmit
  } = useForm<BankAccountFormTypes>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const submitForm = async (data: BankAccountFormTypes) => {
    const { accountType, bankName, accountNumber, accountAlias } = data;

    if (!user) return;

    const payload: IBankAccountPayload = {
      accountType,
      bankName,
      accountNumber,
      accountAlias,
      currencySymbol: "PEN"
    };

    await SaveAccountData.handle({
      userUuid: user.uuid,
      payload
    }).then(() => {
      Toast.show({
        type: "success",
        text1: "Cuenta bancaria registrada",
        text2: "Tu cuenta ha sido registrada correctamente"
      });
      onConfirm(payload);
      reset(defaultValues);
      onClose();
    });
  };

  return (
    <Modal
      visible={active}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={-50}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="items-center justify-center flex-1 bg-black/30">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="absolute bottom-0 flex-col w-full gap-4 px-6 overflow-hidden bg-white pb-14 pt-7 rounded-t-3xl h-[85%]">
                <Text className="text-xl text-primary-dark font-montserrat-bold">
                  Agregar cuenta soles
                </Text>
                <Divider orientation="horizontal" className="bg-slate-200" />
                <ScrollView>
                  <View className="flex-col gap-6">
                    <Text className="text-base text-primary-dark font-montserrat-regular">
                      La cuenta que registres{" "}
                      <Text className="text-base font-montserrat-bold">
                        debe estar a tu nombre{" "}
                      </Text>
                      (titular de este perfil en Kambista)
                    </Text>
                    <View className="flex-col gap-4">
                      <Controller
                        control={control}
                        name="accountType"
                        render={({ field: { onChange, value } }) => (
                          <BaseSelect
                            label="Tipo de cuenta bancaria"
                            placeholder="Selecciona el tipo de cuenta"
                            options={accountTypes}
                            value={value}
                            onValueChange={(v) => {
                              onChange(v);
                              trigger("accountType");
                            }}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="bankName"
                        render={({ field: { onChange, value } }) => (
                          <BaseSelect
                            label="Entidad financiera"
                            placeholder="Selecciona una entidad financiera"
                            options={getFinancialEntities()}
                            value={value}
                            onValueChange={onChange}
                          />
                        )}
                      />

                      <Banner variant="info">
                        Operamos en Lima con todos los bancos. Y en provincia
                        con el BCP y cuentas digitales Interbank.
                      </Banner>
                      <FormField label="Moneda">
                        <View className="flex-row gap-5">
                          <Button
                            variant="filled-primary-dark"
                            className="flex-1"
                          >
                            SOLES
                          </Button>
                          <Button
                            variant="outline-primary-dark"
                            className="flex-1"
                          >
                            DOLARES
                          </Button>
                        </View>
                      </FormField>
                      <Controller
                        control={control}
                        name="accountNumber"
                        render={({ field: { onChange, value } }) => (
                          <CustomInput
                            label="Número de cuenta"
                            placeholder="Escribe tu cuenta destino"
                            value={value}
                            onChangeText={onChange}
                            error={errors.accountNumber?.message}
                            keyboardType="numeric"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="accountAlias"
                        render={({ field: { onChange, value } }) => (
                          <CustomInput
                            label="Ponle nombre a tu cuenta"
                            placeholder="Escribe un alias"
                            value={value}
                            onChangeText={onChange}
                            error={errors.accountAlias?.message}
                          />
                        )}
                      />
                    </View>
                    <Controller
                      control={control}
                      name="isMyAccount"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          label="Declaro que esta cuenta es mia"
                          checked={value}
                          onChange={onChange}
                          className="flex-row justify-start w-full gap-1 pl-1"
                        />
                      )}
                    />
                    <Button
                      size="lg"
                      onPress={() => handleSubmit(submitForm)()}
                      disabled={!isValid}
                    >
                      GUARDAR CUENTA
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddAccountForm;
