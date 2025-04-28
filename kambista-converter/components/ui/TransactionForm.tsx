import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { getBanks } from '../../services/bankService';
import { getSourceFunds } from '../../services/sourceFundService';
import {
  getUserAccounts,
  createUserWallet,
  Wallet,
} from '../../services/accountService';
import { useTransactionStore } from '../../stores/transactionStore';
import { useTransactionStepperStore } from '../../stores/transactionStepperStore';

import { TransactionStepper } from './TransactionStepper';
import { TransactionSummary } from './TransactionSummary';
import { TouchableSelectedField } from './TouchableSelectedField';
import { MessageBox } from './MessageBox';
import { CustomButton } from './CustomButton';
import { AccountPicker } from './AccountPicker';
import {
  AddAccountFormPicker,
  NewAccountPayload,
} from './AddAccountFormPicker';
import { ChevronBottomIcon } from '../icons/ChevronBottomIcon';
import { OutIcon } from '../icons/OutIcon';
import { Link, router } from 'expo-router';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';

interface Props {
  onContinue: () => void;
}

export const TransactionForm: React.FC<Props> = () => {
  const { setStep } = useTransactionStepperStore();
  const { transaction, setTransaction } = useTransactionStore();

  const [bankOptions, setBankOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [fundOptions, setFundOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [accounts, setAccounts] = useState<Wallet[]>([]);

  const [bank, setBank] = useState('');
  const [fundSource, setFundSource] = useState('');
  const [account, setAccount] = useState('');

  const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false);
  const [isAddAcctFormOpen, setIsAddAcctFormOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const banks = await getBanks();
      const uniqueBanks = Array.from(
        new Map(banks.map((b) => [b.id, b])).values(),
      );
      setBankOptions(uniqueBanks.map((b) => ({ label: b.name, value: b.id })));

      const funds = await getSourceFunds();
      setFundOptions(funds.map((f) => ({ label: f.name, value: f._id })));

      const userWallets = await getUserAccounts();
      setAccounts(userWallets);
    })();
  }, []);

  const selectedAlias = accounts.find((w) => w.id === account)?.alias ?? '';

  const canContinue = !!bank && !!fundSource && !!account;

  const handleContinue = () => {
    if (!canContinue || !transaction) return;

    setTransaction({
      ...transaction,
      fromBank: bank,
      fromBankName: bankOptions.find((b) => b.value === bank)?.label || '',
      toAccount: account,
      fundSource: fundSource,
    });

    setStep(1);
  };

  const openAddAccountForm = () => {
    setIsAccountPickerOpen(false);
    setIsAddAcctFormOpen(true);
  };

  const handleSaveNewAccount = async (payload: NewAccountPayload) => {
    try {
      const newWallet = await createUserWallet(payload);
      setAccounts((prev) => [...prev, newWallet]);
      setAccount(newWallet.id);
      setIsAddAcctFormOpen(false);
    } catch (err) {
      console.error('Error creando cuenta:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <Text
          className="text-secondary font-montserrat-bold"
          style={{ fontSize: 14 }}
        >
          Completa tus datos
        </Text>
        <Link asChild href="/" className="p-2" style={{ opacity: 0 }}>
          <OutIcon />
        </Link>
      </View>
      <TransactionStepper currentStep={0} />

      <View className="mb-6 mt-4">
        <TransactionSummary
          sendAmount={transaction?.sendAmount || ''}
          receiveAmount={transaction?.receiveAmount || ''}
          coupon={transaction?.coupon}
          usedRate={transaction?.usedRate || ''}
          marketRate={transaction?.marketRate || ''}
        />
      </View>

      <View className="mb-4">
        <MessageBox
          variant="info"
          message="Tiempo estimado de espera BCP, Interbank, BanBif, Pichincha: 15 minutos. Otros bancos: 1 día hábil."
        />
      </View>

      <TouchableSelectedField
        label="¿Desde qué banco nos envías tu dinero?"
        placeholder="Selecciona"
        options={bankOptions}
        value={bank}
        onChange={setBank}
      />

      <View className="mb-4">
        <Text
          className="text-gray-60 mb-2 font-montserrat-medium"
          style={{ fontSize: 14 }}
        >
          ¿En qué cuenta deseas recibir tu dinero?
        </Text>
        <TouchableOpacity
          onPress={() => setIsAccountPickerOpen(true)}
          activeOpacity={0.9}
          className="flex-row items-center justify-between bg-white border border-gray-200 px-4 h-[48px]"
          style={{ borderRadius: 8 }}
        >
          <Text
            numberOfLines={1}
            className="flex-1 font-montserrat-medium"
            style={{
              fontSize: 14,
              color: selectedAlias ? '#060F26' : '#A7A7A7',
            }}
          >
            {selectedAlias || 'Selecciona'}
          </Text>
          <ChevronBottomIcon />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <MessageBox
          variant="warning"
          message="Recuerda que las cuentas deben estar a tu nombre. Kambista no transfiere a cuentas de terceros."
        />
      </View>

      <TouchableSelectedField
        type="sheet"
        label=""
        showAccept={true}
        placeholder="Selecciona"
        options={fundOptions}
        value={fundSource}
        onChange={setFundSource}
      />

      <CustomButton label="Continuar" onPressFunction={handleContinue} />

      <AccountPicker
        isVisible={isAccountPickerOpen}
        toggle={() => setIsAccountPickerOpen(false)}
        accounts={accounts}
        selectedValue={account}
        onSelect={(id) => {
          setAccount(id);
          setIsAccountPickerOpen(false);
        }}
        onAddAccount={openAddAccountForm}
      />

      <AddAccountFormPicker
        isVisible={isAddAcctFormOpen}
        toggle={() => setIsAddAcctFormOpen(false)}
        bankOptions={bankOptions}
        onSave={handleSaveNewAccount}
      />
    </ScrollView>
  );
};
