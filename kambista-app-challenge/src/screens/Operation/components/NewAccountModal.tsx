import { Pressable, Text, View, Modal } from "react-native";
import bankList from '../../../mocks/bankAccounts.json';
import { PlusIcon } from "lucide-react-native";
import KambistaColors from "../../../utils/colors";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPicker } from "../../../components/Picker";
import AlertMessage from "../../../components/Alert";
import FormInput from "../../../components/FormInput";
import Checkbox from "../../../components/Checkbox";
import KButton from "../../../components/Button";
import { evalNulls } from "../../../utils/functions";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

interface Props {
  openModal: boolean,
  setOpenModal: (val: boolean) => void,
  setValue: (val: string) => void,
  setAccountList: (val: any) => void,
  accountList: Array<any>,
}



const newAccountSchema = z.object({
  accountType: z.string().min(1, 'Este campo es requerido'),
  entity: z.string().min(1, 'Este campo es requerido'),
  accountNumber: z.string().min(1, 'Este campo es requerido'),
  nameAccount: z.string().min(1, 'Este campo es requerido'),
});

type OnboardingForm = z.infer<typeof newAccountSchema>;

export function NewAccountModal({openModal, setOpenModal, setValue, accountList, setAccountList}: Props){
  const {
      control,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<OnboardingForm>({
      resolver: zodResolver(newAccountSchema),
  });
  const onSubmit = (data: OnboardingForm) => {
    setValue(data.entity);
    setAccountList([...accountList, {
      nameAccount: data.entity,
      currency: currency,
      accountNumber: data.accountNumber
    }])
    setOpenModal(false);
  };
  const [currency, setCurrency] = useState('PEN');
  const name = watch('accountType');
  const dni = watch('entity');
  const phone = watch('accountNumber');
  const birthDate = watch('nameAccount');
  const evalValues = evalNulls([name, dni, phone, birthDate])
  const isDisabledSubmit = !evalValues || Object.keys(errors).length > 0;
  const selectedCurrencyClasses = 'rounded-md bg-black py-2 px-16';;
  const noSelectedCurrencyClasses = 'rounded-md border-2 border-black py-2 px-16';
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(false)}
    >
      <View className="flex-1">
        <Pressable className="flex-1 bg-black opacity-50" onPress={() => setOpenModal(false)} />
        <View className="bg-white gap-2 rounded-t-3xl p-5 h-5/6 align-bottom absolute w-full bottom-0">
        <ScrollView>
          <Text className="font-montBold text-lg text-k-gray-60">Agregar cuenta soles</Text>
          <View className="h-px w-full bg-gray-400 my-2" />
          <View className="my-2">
            <Text className="font-mont text-sm">
              La cuenta que registres
              <Text className="font-montBold text-sm"> debe estar a tu nombre </Text>
              (titular de este perfil de Kambista)
            </Text>
          </View>
          <FormPicker
            name="accountType"
            label="Tipo de cuenta bancaria"
            items={[
              { label: 'Ahorros', value: 'ahorros' },
              { label: 'Corriente', value: 'corriente' },
              { label: 'Sueldo', value: 'sueldo' },
            ]}
            required
            control={control}
          />
          <FormPicker
            name="entity"
            items={[
              { label: 'Scotiabank', value: 'Scotiabank' },
              { label: 'BCP', value: 'BCP' },
              { label: 'Interbank', value: 'Interbank' },
            ]}
            label="Entidad financiera"
            required
            control={control}
          />
          <View className="my-2">
            <AlertMessage label="Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank." />
          </View>
          <View className="my-2">
            <Text className="text-sm mb-1 text-k-gray-60 font-mont">Moneda</Text>
            <View className="flex-row g-2 justify-between">
              <Pressable 
                className={currency === 'PEN' ? selectedCurrencyClasses : noSelectedCurrencyClasses}
                onPress={() => setCurrency('PEN')}
              >
                <Text className={`font-mont ${currency === 'PEN' && "text-white"} font-sm`}>Soles</Text>
              </Pressable>
              <Pressable 
                className={currency === 'USD' ? selectedCurrencyClasses : noSelectedCurrencyClasses}
                onPress={() => setCurrency('USD')}  
              >
                <Text className={`font-mont ${currency === 'USD' && "text-white"} font-sm`}>
                  Dolares
                </Text>
              </Pressable>
            </View>
          </View>
          <FormInput
            name="accountNumber"
            label="Numero de cuenta"
            placeholder="Escribe tu cuenta de destino"
            control={control}
            keyboardType="number-pad"
          />
          <FormInput
            name="nameAccount"
            label="Ponle nombre a tu cuenta"
            placeholder="Escribe un alias"
            control={control}
            keyboardType="number-pad"
          />
          <Checkbox
            label="Declaro que esta cuenta es mia"
          />
          <View className="w-full mt-4">
            <KButton
              title="Guardar cuenta"
              onPress={handleSubmit(onSubmit)}
              disabled={isDisabledSubmit}
            />
          </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
