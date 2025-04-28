import { useEffect } from 'react';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { TransactionForm } from '../../components/ui/TransactionForm';
import { TransactionTransferForm } from '../../components/ui/TransactionTransferForm';
import { TransactionSendEvidenceForm } from '../../components/ui/TransactionSendEvidenceForm';
import { EvidenceSendSuccess } from '../../components/states/EvidenceSendSuccess';
import { useTransactionStepperStore } from '../../stores/transactionStepperStore';
import { useTransactionStore } from '../../stores/transactionStore';
import { router } from 'expo-router';

export const TransactionsScreen = () => {
  const { step, setStep, resetStep } = useTransactionStepperStore();
  const { clearTransaction, transaction } = useTransactionStore();

  useEffect(() => {
    if (step === 3) {
      clearTransaction();
    }
  }, [step]);

  const handleGoHome = () => {
    resetStep();
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer scrollable={true} backgroundColor="#EFF0F6">
      {step === 0 && <TransactionForm onContinue={() => setStep(1)} />}
      {step === 1 && <TransactionTransferForm onContinue={() => setStep(2)} />}
      {step === 2 && (
        <TransactionSendEvidenceForm onContinue={() => setStep(3)} />
      )}
      {step === 3 && (
        <EvidenceSendSuccess
          kambistaCode="km20ttfff"
          amountToReceive={transaction?.receiveAmount ?? ''}
          estimatedTime="20h 15min"
          onGoHome={handleGoHome}
        />
      )}
    </ScreenContainer>
  );
};
