import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { RefreshIcon } from '../../components/icons/RefreshIcon';
import { StartIcon } from '../../components/icons/StarIcon';
import { useCurrencyInput } from '../../hooks/useCurrencyInput';
import { getCurrentKambistaRate } from '../../services/exchangeService';
import { CurrencyInput } from '../../components/ui/CurrencyInput';
import { CouponInput } from '../../components/ui/CouponInput';
import { Tab } from '../../components/ui/TabButton';
import { CustomButton } from '../../components/ui/CustomButton';
import { LogoKambistaMini } from '../icons/LogoKambistaMini';
import { useTransactionStore } from '../../stores/transactionStore';

export const ExchangeCalculator: React.FC = () => {
  const { transaction, setTransaction } = useTransactionStore();

  const opts = [
    { value: 'USD', label: 'Dólares' },
    { value: 'PEN', label: 'Soles' },
  ];
  const top = useCurrencyInput('10000', opts, 0);
  const bottom = useCurrencyInput('', opts, 1);

  const skipRef = useRef(false);
  const initRef = useRef(false);

  const [rate, setRate] = useState({ bid: 0, ask: 0 });
  const [active, setActive] = useState<'compra' | 'venta'>('compra');
  const [loaded, setLoaded] = useState(false);

  const convert = useCallback(
    (src: 'top' | 'bottom') => {
      if (!loaded) return;
      const r = active === 'compra' ? rate.bid : rate.ask;
      if (!r) return;

      const from = src === 'top' ? top : bottom;
      const to = src === 'top' ? bottom : top;

      if (from.amount === '') {
        to.setAmount('');
        return;
      }

      const val = Number(from.amount);
      if (isNaN(val)) return;

      const out =
        from.currency === 'USD' && to.currency === 'PEN'
          ? val * r
          : from.currency === 'PEN' && to.currency === 'USD'
            ? val / r
            : 0;

      to.setAmount(out ? out.toFixed(2) : '');
    },
    [active, loaded, rate, top, bottom],
  );

  useEffect(() => {
    getCurrentKambistaRate()
      .then((res) => {
        setRate({ bid: res.bid, ask: res.ask });
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (loaded && !initRef.current) {
      convert('top');
      initRef.current = true;
    }
  }, [loaded, convert]);

  useEffect(() => {
    if (!loaded || skipRef.current) {
      skipRef.current = false;
      return;
    }
    convert('top');
  }, [top.amount, top.currency, active, loaded, convert]);

  const handleTab = (tab: 'compra' | 'venta') => {
    if (tab === active) return;
    setActive(tab);
    if (tab === 'compra') {
      top.setCurrency('USD');
      bottom.setCurrency('PEN');
    } else {
      top.setCurrency('PEN');
      bottom.setCurrency('USD');
    }
    convert('top');
  };

  const swap = useCallback(() => {
    const nextTop = bottom.currency;
    const nextBottom = top.currency;
    const amt = Number(top.amount) || 0;
    const fx = active === 'compra' ? rate.bid : rate.ask;

    const newBottom =
      amt && fx ? (nextTop === 'USD' ? amt * fx : amt / fx).toFixed(2) : '';

    skipRef.current = true;
    top.setCurrency(nextTop);
    bottom.setCurrency(nextBottom);
    bottom.setAmount(newBottom);
  }, [top, bottom, active, rate]);

  return (
    <>
      <View
        className="flex-row items-center justify-center"
        style={{ marginBottom: 30 }}
      >
        <LogoKambistaMini />
      </View>

      <View className="items-center w-full" style={{ marginTop: 30 }}>
        <View className="flex-row">
          <Tab
            active={active === 'compra'}
            label={`Compra: ${rate.bid ? rate.bid.toFixed(3) : '0.000'}`}
            onPress={() => handleTab('compra')}
          />
          <Tab
            active={active === 'venta'}
            label={`Venta: ${rate.ask ? rate.ask.toFixed(3) : '0.000'}`}
            onPress={() => handleTab('venta')}
          />
        </View>

        <View
          className="w-full bg-white"
          style={{
            paddingTop: 20,
            paddingBottom: 12,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <View className="px-5">
            <CurrencyInput
              style="mb-[-22px]"
              label="¿Cuánto envías?"
              amount={top.amount}
              onAmountChange={top.setAmount}
              currencyLabel={top.currencyLabel}
              onToggleCurrency={swap}
            />
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginRight: 70,
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderRadius: 50,
                  width: 55,
                  height: 55,
                }}
              >
                <TouchableOpacity
                  onPress={swap}
                  className="p-2 relative z-10"
                  style={{
                    width: 35,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <RefreshIcon />
                </TouchableOpacity>
              </View>
            </View>

            <CurrencyInput
              style="mt-[-22px] mb-3"
              label="Entonces recibes"
              amount={bottom.amount}
              onAmountChange={bottom.setAmount}
              currencyLabel={bottom.currencyLabel}
              onToggleCurrency={swap}
            />
          </View>

          <View className="px-5">
            <View className="flex-row justify-between mb-4">
              <View>
                <Text
                  className="text-secondary font-montserrat-medium"
                  style={{ fontSize: 14 }}
                >
                  Ahorro estimado:
                </Text>
                <Text
                  className="font-montserrat-regular text-secondary font-montserrat-semibold"
                  style={{ fontSize: 14 }}
                >
                  S/ 555.00
                </Text>
              </View>

              <View className="items-end">
                <Text
                  className="text-secondary font-montserrat-medium"
                  style={{ fontSize: 14 }}
                >
                  Koins
                </Text>
                <Text
                  className="font-montserrat-regular text-secondary font-montserrat-semibold"
                  style={{ fontSize: 14 }}
                >
                  {top.amount
                    ? String(top.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '0'}
                </Text>
              </View>
            </View>

            <View className="mb-6">
              <CouponInput />
            </View>

            <View className="flex-row items-center mb-2">
              <StartIcon />
              <View className="ml-2 flex-col">
                <Text
                  className=" text-secondary font-montserrat-regular"
                  style={{ fontSize: 14 }}
                >
                  ¿Monto mayor a $5,000 o S/18,000?
                </Text>
                <Text
                  className="text-secondary font-montserrat-bold underline"
                  style={{ fontSize: 12 }}
                >
                  ¡Obtén un Tipo de Cambio Preferencial!
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full" style={{ paddingTop: 12 }}>
          <CustomButton
            label="INICIAR OPERACIÓN"
            onPressFunction={() => {
              const currentTransaction = transaction ?? {
                sendAmount: '',
                receiveAmount: '',
                coupon: '',
                usedRate: '',
                marketRate: '',
                operationNumber: '',
                fromBank: '',
                fromBankName: '',
                toAccount: '',
                fundSource: '',
              };

              const fxRate = active === 'compra' ? rate.bid : rate.ask;

              setTransaction({
                ...currentTransaction,
                sendAmount: `${top.currency === 'USD' ? '$' : 'S/'} ${top.amount}`,
                receiveAmount: `${bottom.currency === 'USD' ? '$' : 'S/'} ${bottom.amount}`,
                usedRate: fxRate.toFixed(3),
                marketRate: fxRate.toFixed(3),
              });

              router.push('/Transactions');
            }}
          />
        </View>
      </View>
    </>
  );
};
