import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { CustomButton } from './CustomButton';
import { TransactionStepper } from './TransactionStepper';
import { useTransactionStore } from '../../stores/transactionStore';
import { WalletIcon } from '../icons/WalletIcon';
import { CopyIcon } from '../icons/CopyIcon';
import { useTransactionStepperStore } from '../../stores/transactionStepperStore';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { OutIcon } from '../icons/OutIcon';

interface Props {
  onContinue: () => void;
}

export const TransactionTransferForm: React.FC<Props> = ({ onContinue }) => {
  const { transaction } = useTransactionStore();
  const { setStep } = useTransactionStepperStore();
  const router = useRouter();

  if (!transaction) return null;

  const formatAmount = (amount: string) => {
    const currencySymbol = amount.match(/[^0-9.-]+/g)?.[0] || '';
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));

    if (isNaN(numericAmount)) {
      return '0.00';
    }

    let formattedAmount =
      numericAmount >= 1000
        ? numericAmount.toLocaleString('es-PE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : numericAmount.toFixed(2);

    return `${currencySymbol} ${formattedAmount}`;
  };

  const handleCopy = async (value: string, label: string) => {
    await Clipboard.setStringAsync(value);
    Alert.alert('Copiado', `${label} copiado al portapapeles`);
  };

  const handleContinue = () => {
    setStep(2);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity className="p-2" onPress={() => setStep(0)}>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <Text
          className="text-secondary font-montserrat-bold"
          style={{ fontSize: 14 }}
        >
          Transfiere a Kambista
        </Text>
        <Link asChild href="/" className="p-2" style={{ opacity: 0 }}>
          <OutIcon />
        </Link>
      </View>
      <TransactionStepper currentStep={1} />

      <View className="mt-6 mb-4">
        <Text
          style={{
            fontSize: 14,
            marginBottom: 8,
            textAlign: 'center',
          }}
          className="font-montserrat-medium text-gray-60"
        >
          El tipo de cambio podría actualizarse a las:
          <Text className="font-montserrat-semibold text-gray-60"> 13:15</Text>
        </Text>
      </View>

      <View
        className="bg-white rounded-2xl p-6 shadow-md items-center"
        style={{ borderColor: '#E0E0E0', borderWidth: 1 }}
      >
        <WalletIcon />

        <Text
          className="text-center font-montserrat-light mb-4 mt-4"
          style={{ fontSize: 14, color: '#060F26' }}
        >
          Transfiere desde tu app bancaria y guarda el{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            className=" font-montserrat-medium"
          >
            número o código de operación
          </Text>{' '}
          para el siguiente paso.
        </Text>

        <View
          className="w-full mt-4 space-y-5"
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <InfoRow
            label="Banco"
            value={transaction.fromBankName || 'Interbank'}
          />
          <InfoRowWithCopy
            label="Monto"
            value={formatAmount(transaction.sendAmount || '')}
            onCopy={() =>
              handleCopy(formatAmount(transaction.sendAmount || ''), 'Monto')
            }
          />
          <InfoRowWithCopy
            label="Número de cuenta"
            value="20100000000000"
            onCopy={() => handleCopy('20100000000000', 'Número de cuenta')}
          />
          <InfoRowWithCopy
            label="RUC"
            value="20601708141"
            onCopy={() => handleCopy('20601708141', 'RUC')}
          />
          <InfoRow label="Titular de la cuenta" value="Kambista SAC" />
          <InfoRow label="Tipo de cuenta" value="Corriente" />
        </View>
      </View>

      <View className="mt-8 mb-10">
        <CustomButton
          label="YA HICE MI TRANSFERENCIA"
          onPressFunction={handleContinue}
        />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text
      className="font-montserrat-bold"
      style={{
        fontSize: 12,
        color: '#A7A7A7',
        fontWeight: '500',
      }}
    >
      {label}
    </Text>
    <Text
      className="font-montserrat-bold"
      style={{
        fontSize: 14,
        color: '#060F26',
        marginBottom: 6,
        marginLeft: 6,
      }}
    >
      {value}
    </Text>
  </View>
);

const InfoRowWithCopy = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) => (
  <View>
    <Text
      className="font-montserrat-bold"
      style={{
        fontSize: 12,
        color: '#A7A7A7',
      }}
    >
      {label}
    </Text>
    <View className="flex-row items-center justify-between">
      <Text
        style={{
          fontSize: 14,
          color: '#060F26',
          fontWeight: '600',
          marginBottom: 6,
          marginLeft: 6,
        }}
      >
        {value}
      </Text>
      <TouchableOpacity onPress={onCopy} style={{ paddingLeft: 12 }}>
        <CopyIcon />
      </TouchableOpacity>
    </View>
  </View>
);
