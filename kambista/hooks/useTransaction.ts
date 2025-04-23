import { Account, Bank, SourceFund } from '@/models';
import { CalculatorRequest, CalculatorResponse } from '@/models/dto/exchangeDTO';
import { useTransactionStore } from '@/store/transactionStore';

const useTransaction = () => {
  const {
    account,
    bank,
    calculatorRequest,
    calculatorResponse,
    sourceFund,
    coupon,
    setAccount,
    setBank,
    setCalculatorRequest,
    setCalculatorResponse,
    setSourceFund,
    resetTransaction,
    setCoupon,
  } = useTransactionStore();

  const startTransaction = (calculatorRequest: CalculatorRequest, calculatorResponse: CalculatorResponse, coupon?: string) => {
    setCalculatorRequest(calculatorRequest);
    setCalculatorResponse(calculatorResponse);
    setCoupon(coupon);
  };

  const completeTransaction = (bank: Bank, account: Account, sourceFund: SourceFund) => {
    setAccount(account);
    setBank(bank);
    setSourceFund(sourceFund);
  };

  return {
    account,
    bank,
    calculatorRequest,
    calculatorResponse,
    sourceFund,
    coupon,
    setCoupon,
    startTransaction,
    resetTransaction,
    completeTransaction,
  };
};

export default useTransaction;
