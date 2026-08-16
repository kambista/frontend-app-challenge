// durante el flujo Completa -> Transfiere -> Constancia.
import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';

class PendingOperation {
  final double sendAmount;
  final Currency sendCurrency;
  final double receiveAmount;
  final Currency receiveCurrency;
  final String? couponCode;
  final double exchangeRateUsed;
  final double? previousExchangeRate;

  // Datos que se completan en esta pantalla:
  final String? sourceBankId;          // banco origen — dropdown simple
  final BankAccount? destinationAccount; // cuenta guardada seleccionada
  final String? sourceFundId;
  final String? voucherFilePath;

  const PendingOperation({
    required this.sendAmount,
    required this.sendCurrency,
    required this.receiveAmount,
    required this.receiveCurrency,
    this.couponCode,
    required this.exchangeRateUsed,
    this.previousExchangeRate,
    this.sourceBankId,
    this.destinationAccount,
    this.sourceFundId,
    this.voucherFilePath,
  });

  PendingOperation copyWith({
    String? sourceBankId,
    BankAccount? destinationAccount,
    String? sourceFundId,
    String? voucherFilePath,
  }) {
    return PendingOperation(
      sendAmount: sendAmount,
      sendCurrency: sendCurrency,
      receiveAmount: receiveAmount,
      receiveCurrency: receiveCurrency,
      couponCode: couponCode,
      exchangeRateUsed: exchangeRateUsed,
      previousExchangeRate: previousExchangeRate,
      sourceBankId: sourceBankId ?? this.sourceBankId,
      destinationAccount: destinationAccount ?? this.destinationAccount,
      sourceFundId: sourceFundId ?? this.sourceFundId,
      voucherFilePath: voucherFilePath ?? this.voucherFilePath,
    );
  }

  bool get isComplete =>
      sourceBankId != null && destinationAccount != null && sourceFundId != null;
}