import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import React from "react";
import { Text, View } from "react-native";
import AddAccountForm from "./AddAccountForm";
import AccountOptionValue from "./CustomOptions/AccountOptionValue";
import BankOptionValue from "./CustomOptions/BankOptionValue";
import BankSingleValue from "./CustomOptions/BankSingleValue";
import InitialSummary from "./InitialSummary";

interface FillOutStepProps {
  onContinue: () => void;
}

const FillOutStep = ({ onContinue }: FillOutStepProps) => {
  const [showAddAccountForm, setShowAddAccountForm] = React.useState(false);

  return (
    <View className="flex-col gap-6 px-6 pb-6">
      <View className="flex-col gap-4">
        <InitialSummary />
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
        <Banner variant="info">
          Ver tiempo de espera aprox. de tu operación{" "}
          <Text className="underline text-informative-blue-dark font-montserrat-semibold">
            aquí
          </Text>
        </Banner>
        <CustomSelect
          label="¿Desde qué banco nos envías tu dinero?"
          placeholder="Selecciona"
          options={[
            {
              label: "BCP",
              value: "1",
              data: {
                imageSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjwvb4rHl8FFseK5IhljG2FSOse31S0Sg3Q&s",
              },
            },
            { label: "Interbank", value: "2" },
            { label: "BBVA", value: "3" },
          ]}
          onValueChange={(value) => {}}
          modalTitle="¿Desde qué banco nos envías tu dinero?"
          modalTitleClassName="text-primary-dark"
          components={{
            Option: BankOptionValue,
            SingleValue: BankSingleValue,
          }}
        />
        <CustomSelect
          label="¿En qué cuenta deseas recibir tu dinero?"
          placeholder="Selecciona"
          options={[
            {
              label: "Alias",
              value: "1",
              data: {
                accountNumber: "123456789",
                currency: "PEN",
                bankName: "Scotiabank",
              },
            },
            {
              label: "Alias 2",
              value: "2",
              data: {
                accountNumber: "123456789",
                currency: "PEN",
                bankName: "Scotiabank",
              },
            },
          ]}
          onValueChange={(value) => {}}
          modalTitle="Selecciona tu cuenta destino"
          modalTitleClassName="text-start"
          createOptionLabel="Agregar cuenta"
          components={{
            Option: AccountOptionValue,
          }}
          onCreateOption={() => setShowAddAccountForm(true)}
          showCreateOption
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
        <BaseSelect
          label="Origen de fondos"
          placeholder="Selecciona"
          options={[]}
          onValueChange={(value) => {}}
        />
      </View>
      <Button size="lg" onPress={onContinue}>
        CONTINUAR
      </Button>
      <AddAccountForm
        active={showAddAccountForm}
        onClose={() => setShowAddAccountForm(false)}
      />
    </View>
  );
};

export default FillOutStep;
