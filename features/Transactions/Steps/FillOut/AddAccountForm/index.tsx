import Banner from "@/components/Banner";
import BaseSelect from "@/components/BaseSelect";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CustomInput from "@/components/CustomInput";
import Divider from "@/components/Divider";
import FormField from "@/components/FormField";
import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface AddAccountFormProps {
  active: boolean;
  onClose: () => void;
}

const AddAccountForm = ({ active, onClose }: AddAccountFormProps) => {
  return (
    <Modal
      visible={active}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="items-center justify-center flex-1 bg-black/30">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="absolute bottom-0 flex-col w-full gap-4 px-6 overflow-hidden bg-white pb-14 pt-7 rounded-t-3xl h-[90%]">
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
                    <BaseSelect label="Tipo de cuenta bancaria" options={[]} />
                    <BaseSelect label="Entidad financiera" options={[]} />
                    <Banner variant="info">
                      Operamos en Lima con todos los bancos. Y en provincia con
                      el BCP y cuentas digitales Interbank.
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
                    <CustomInput
                      label="Número de cuenta"
                      placeholder="Escribe tu cuenta de destino"
                    />
                    <CustomInput
                      label="Ponle nombre a tu cuenta"
                      placeholder="Escribe un alias"
                    />
                  </View>
                  <Checkbox
                    label="Declaro que esta cuenta es mia"
                    checked={false}
                    className="flex-row justify-start w-full"
                  />
                  <Button size="lg" onPress={() => {}}>
                    GUARDAR CUENTA
                  </Button>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddAccountForm;
