import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import { useGetBankAccounts } from "@/modules/transactions/hooks/useGetBankAccounts";
import { useExchangeStore } from "@/stores/useExchangeStore";
import { IBankAccountPayload } from "@/types/storage/IBankAccount";
import { getCurrencySymbol } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AddAccountForm from "./AddAccountForm";
import AccountOptionValue from "./CustomOptions/AccountOptionValue";
import BankOptionValue from "./CustomOptions/BankOptionValue";
import BankSingleValue from "./CustomOptions/BankSingleValue";
import InitialSummary from "./InitialSummary";
import { schema } from "./schema";
import { FillOutTypes, IBankAccountOption } from "./types";
import {
  bankAccountOptions,
  banksDelay,
  defaultValues,
  fundOriginOptions,
  getBankAccountOptions,
  getExchangeRateDiscounted
} from "./utils";
import { log } from "@/utils/logger";

interface FillOutStepProps {
  onContinue: () => void;
}

const FillOutStep = ({ onContinue }: FillOutStepProps) => {
  const [showAddAccountForm, setShowAddAccountForm] = React.useState(false);
  const [bankAccounts, setBankAccounts] = React.useState<IBankAccountOption[]>(
    []
  );
  const { exchangeData } = useExchangeStore();
  const GetBankAccounts = useGetBankAccounts();

  const {
    formState: { isValid },
    control,
    setValue,
    handleSubmit
  } = useForm<FillOutTypes>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const bankOrigin = useWatch({ control, name: "bankOrigin" });

  const currentExchangeRate =
    exchangeData?.amountIn?.currency === "PEN"
      ? exchangeData?.bid
      : exchangeData?.ask;

  const handleAccountConfirm = (data: IBankAccountPayload) => {
    const newAccountOption: IBankAccountOption = {
      label: data.accountAlias,
      value: data.accountNumber,
      data: {
        accountNumber: data.accountNumber,
        currency: data.currencySymbol,
        bankName: data.bankName
      }
    };

    setBankAccounts((prevAccounts) => [...prevAccounts, newAccountOption]);

    setValue("depositAccount", newAccountOption.value, {
      shouldValidate: true
    });

    setShowAddAccountForm(false);

    Toast.show({
      type: "success",
      text1: "Cuenta agregada",
      text2: "La cuenta ha sido agregada con éxito"
    });
  };

  const submitForm = async (data: FillOutTypes) => {
    const { bankOrigin, depositAccount, fundOrigin } = data;
    if (!bankOrigin || !depositAccount || !fundOrigin) return;
    Toast.show({
      type: "success",
      text1: "Datos guardados",
      text2: "Tus datos han sido guardados correctamente"
    });

    onContinue();
  };

  React.useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await GetBankAccounts.handle();
        const formattedAccounts = getBankAccountOptions(accounts);
        setBankAccounts(formattedAccounts);
      } catch (error) {
        log.error("Error cargando cuentas:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <View className="flex-col gap-6 px-6 pb-6">
      <View className="flex-col gap-4">
        <InitialSummary
          sendAmount={{
            amount: exchangeData?.amountIn?.amount ?? 0,
            currencySymbol: getCurrencySymbol(exchangeData?.amountIn?.currency)
          }}
          receiveAmount={{
            amount: exchangeData?.amountOut?.amount ?? 0,
            currencySymbol: getCurrencySymbol(exchangeData?.amountOut?.currency)
          }}
          coupon={exchangeData?.couponCode ?? ""}
          exchangeRate={currentExchangeRate ?? 0}
          discountRate={getExchangeRateDiscounted(currentExchangeRate ?? 0)}
        />
        {banksDelay.includes(bankOrigin) ? (
          <Banner variant="info">
            Tiempo estimado de espera{" "}
            <Text className="text-informative-blue-dark font-montserrat-semibold">
              BCP, Interbank, BanBif, Pichincha:{" "}
            </Text>
            15 minutos.{"\n"}
            <Text className="text-informative-blue-dark font-montserrat-semibold">
              Otros bancos:{" "}
            </Text>
            1 día hábil
          </Banner>
        ) : (
          <Banner variant="info">
            Ver tiempo de espera aprox. de tu operación{" "}
            <Text className="underline text-informative-blue-dark font-montserrat-semibold">
              aquí
            </Text>
          </Banner>
        )}
        <Controller
          control={control}
          name="bankOrigin"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label="¿Desde qué banco nos envías tu dinero?"
              placeholder="Selecciona"
              options={bankAccountOptions()}
              onValueChange={onChange}
              value={value}
              modalTitle="¿Desde qué banco nos envías tu dinero?"
              modalTitleClassName="text-primary-dark"
              components={{
                Option: BankOptionValue,
                SingleValue: BankSingleValue
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="depositAccount"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              label="¿En qué cuenta deseas recibir tu dinero?"
              placeholder="Selecciona"
              options={bankAccounts}
              onValueChange={onChange}
              value={value}
              modalTitle="Selecciona tu cuenta destino"
              modalTitleClassName="text-start"
              createOptionLabel="Agregar cuenta"
              components={{
                Option: AccountOptionValue
              }}
              onCreateOption={() => setShowAddAccountForm(true)}
              showCreateOption
            />
          )}
        />

        <Banner variant="warning">
          Recuerda que las cuentas deben estar{" "}
          <Text className="text-warning-dark font-montserrat-semibold">
            a tu nombre.{" "}
          </Text>
          Kambista no transfiere a{" "}
          <Text className="text-warning-dark font-montserrat-semibold">
            cuentas de terceros
          </Text>
        </Banner>
        <Controller
          control={control}
          name="fundOrigin"
          render={({ field: { onChange, value } }) => (
            <BaseSelect
              label="Origen de fondos"
              placeholder="Selecciona"
              options={fundOriginOptions()}
              onValueChange={onChange}
            />
          )}
        />
      </View>
      <Button
        size="lg"
        onPress={() => handleSubmit(submitForm)()}
        disabled={!isValid}
      >
        CONTINUAR
      </Button>
      <AddAccountForm
        currencySymbol={exchangeData?.amountIn?.currency || ""}
        active={showAddAccountForm}
        onClose={() => setShowAddAccountForm(false)}
        onConfirm={(data) => handleAccountConfirm(data)}
      />
    </View>
  );
};

export default FillOutStep;
