import { View } from "react-native";
import { OperationCard } from "./OperationCard";
import AlertMessage, { AlertType } from "../../../components/Alert";
import { BottomSheetInput } from "./BottomSheetInput";
import { useState } from "react";
import { BankList } from "./BankList";
import { AccountList } from "./AccountList";
import { SourceList } from "./SourceList";
import KButton from "../../../components/Button";
import { useStepOperationStore } from "../../../store/StepOperationStore";
import { evalEmptyStrings } from "../../../utils/functions";

export function OperationForm(){
  const [bankIncoming, setBankIncoming] = useState('');
  const [account, setAccount] = useState('');
  const [source, setSource] = useState('');
  const [openModalBanks, setOpenModalBanks] = useState(false);
  const [openModalSource, setOpenModalSource] = useState(false);
  const [openModalAccounts, setOpenModalAccounts] = useState(false);
  const {step, setStep} = useStepOperationStore();
  function changeStep(){
    setStep(step + 1);
  }
  return (
    <>
      <View className="gap-3">
        <OperationCard />
        <AlertMessage label="Tiempo estimado de espera BCP, Interbank, BanBif, Pichincha: 15 minutos. Otros bancos: 1 día hábil" />
        <BottomSheetInput
          label="¿Desde qué banco nos envías tu dinero?"
          value={bankIncoming}
          onPress={() => {
            setOpenModalBanks(true);
          }}
        />
        <BottomSheetInput
          label="¿En qué cuenta deseas recibir tu dinero?"
          value={account}
          onPress={() => {
            setOpenModalAccounts(true);
          }}
        />
        <AlertMessage
          label="Recuerda que las cuentas deben estar a tu nombre. Kambista no transfiere a cuentas de terceros"
          type={AlertType.warning}
        />
        <BottomSheetInput
          label="Origen de fondos"
          value={source}
          onPress={() => {
            setOpenModalSource(true);
          }}
        />
        <KButton
          title="Continuar"
          onPress={() => changeStep()}
          disabled={!evalEmptyStrings([bankIncoming, account, source])}
        />
      </View>
      <BankList 
        openModal={openModalBanks}
        setOpenModal={setOpenModalBanks}
        setValue={(e) => setBankIncoming(e)}
      />
      <AccountList 
         openModal={openModalAccounts}
         setOpenModal={setOpenModalAccounts}
         setValue={(e) => setAccount(e)}
      />
      <SourceList
        openModal={openModalSource}
        setOpenModal={setOpenModalSource}
        setValue={(e) => setSource(e)}
      />
    </>
  )
}