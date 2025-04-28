import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/Wrapper";
import logo from './../../../assets/k_logo_kambista.png';
import star from './../../../assets/k_star.png';
import { ExchangeInput } from "./components/ExchangeInput";
import { useEffect, useState } from "react";
import { CouponInput } from "./components/CouponInput";
import KButton from "../../components/Button";
import { useExchangeStore } from "../../store/ExchangeStore";
import { useOperationExchange } from "../../store/OperationExchangeStore";
import { RefreshCcw } from "lucide-react-native";
import { Currencies, useOperation } from "../../store/OperationStore";
import { useNavigation } from "@react-navigation/native";
import { Paths } from "../../routes/paths";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParamList } from "../../navigation/BuildNavigation";

const  currencies=[
  { label: 'Dolares', value: 'USD' },
  { label: 'Soles', value: 'PEN' },
];

export function HomeScreen(){
  const [incoming, setIncoming] = useState('0');
  const [incomingCurrency, setIncomingCurrency] = useState(Currencies.PEN);
  const [coupon, setCoupon] = useState('');
  const [outcomingCurrency, setOutcomingCurrency] = useState(Currencies.USD);
  const { exchange, isLoading, fetchExchange } = useExchangeStore();
  const {operation, isLoading: loadingOperation, fetchOperation} = useOperationExchange();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
  const {setOperation} = useOperation();
  useEffect(() => {
    fetchExchange();
  },[]);

  function makeOperation(){
    console.log(incomingCurrency)
    fetchOperation(Number.parseFloat(incoming), incomingCurrency, outcomingCurrency);
  }
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  function changeOperation(){
    setIncomingCurrency(outcomingCurrency);
    setOutcomingCurrency(incomingCurrency);
    makeOperation();
  }

  function initOperation(){
    setOperation({
      incoming: Number.parseFloat(incoming),
      exchange: operation.exchange,
      coupon,
      incomingCurrency,
      outcomingCurrency,
      bid: exchange.bid,
      ask: exchange.ask,
    });
    navigation.navigate(Paths.operation);
  }

  return(
    <ScreenWrapper scrollable style={{backgroundColor: '#ECECECFF'}}>
      <View className="flex-1 justify-center items-center">
        <Image source={logo} className="w-48 h-20" resizeMode="contain" />
        <View className="bg-white rounded-lg">
          <View className="flex-row">
            <View className="rounded-tl-lg flex-1 bg-black p-2 justify-center items-center">
              <Text className="font-montBold text-white">{`Compra: ${exchange.bid.toFixed(3)}`}</Text>
            </View>
            <View className="rounded-tl-lg flex-1 bg-white p-2 justify-center items-center">
              <Text className="font-montBold">{`Compra: ${exchange.ask.toFixed(3)}`}</Text>
            </View>
          </View>
          <View className="p-4 gap-4 mt-5">
            <View className="gap-4 relative">
              <ExchangeInput
                value={incoming}
                setValue={setIncoming}
                label="Cuanto envias?"
                onEndEditing={() => makeOperation()}
                currency={incomingCurrency}
                setCurrency={setIncomingCurrency}
                currencies={currencies}
              />
              <View
                className="rounded-full bg-slate-500 opacity-35 w-[48] h-[48] p-3 z-50 absolute top-1/2 right-[75] transform -translate-x-1/2 -translate-y-1/2"
              />
              <View className="rounded-full w-auto p-3 z-50 absolute top-1/2 right-[75] transform -translate-x-1/2 -translate-y-1/2">
                <Pressable 
                  className="rounded-full bg-white p-1 shadow-xl" 
                  onPress={() => changeOperation()}
                  disabled={loadingOperation}
                >
                  <RefreshCcw color={'black'} size={20} />
                </Pressable>
              </View>
              <ExchangeInput
                value={operation.exchange.toFixed(3)}
                editable={false}
                label="Entonces recibes"
                onEndEditing={() => makeOperation()}
                currency={outcomingCurrency}
                setCurrency={setOutcomingCurrency}
                currencies={currencies}
              />
            </View>
            <View className="flex-row justify-between">
              <View>
                <Text className="font-mont">Ahorro estimado:</Text>
                <Text className="font-mont">{`${operation.savings.amount}`}</Text>
              </View>
              <View>
                <Text className="font-mont">Koins:</Text>
                <Text className="font-mont">1000.00</Text>
              </View>
            </View>
            <CouponInput
              value={coupon}
              setValue={setCoupon}
            />
            <View className="flex-row items-center mt-3">
              <Image source={star} className="w-16 h-5" resizeMode="contain" />
              <View>
                <Text className="font-mont text-sm">
                  ¿Monto mayor a $5.000 o S/18.000?
                </Text>
                <Text className="font-montBold underline text-sm">
                  ¡Obtén un Tipo de Cambio Preferencia!
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="w-full mt-5 p-3">
          <KButton
            title="Iniciar operacion"
            onPress={()=>{ initOperation() }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}