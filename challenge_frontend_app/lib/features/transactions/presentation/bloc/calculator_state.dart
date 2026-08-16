import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/exchange_rate.dart';
import 'package:equatable/equatable.dart';

enum CalculatorStatus { initial, loading, ready, calculating, error }

class CalculatorState extends Equatable {
  final CalculatorStatus status;
  final ExchangeRate? exchangeRate;
  final Currency sendCurrency;
  final Currency receiveCurrency;
  final String sendAmount;
  final double receiveAmount;
  final double estimatedSavings;
  final String savingsCurrencySymbol;
  final int koins;
  final bool canOperate;
  final String operateMessage;
  final String? appliedCoupon;
  final Failure? failure;

  const CalculatorState({
    this.status = CalculatorStatus.initial,
    this.exchangeRate,
    this.sendCurrency = Currency.pen,
    this.receiveCurrency = Currency.usd,
    this.sendAmount = '',
    this.receiveAmount = 0,
    this.estimatedSavings = 0,
    this.savingsCurrencySymbol = 'S/',
    this.koins = 0,
    this.canOperate = true,
    this.operateMessage = '',
    this.appliedCoupon,
    this.failure,
  });

  OperationType get operationType => sendCurrency == Currency.pen ? OperationType.buy : OperationType.sell;

  double get currentRate => operationType == OperationType.buy
    ? (exchangeRate?.buyRate ?? 0)
    : (exchangeRate?.sellRate ?? 0);

  CalculatorState copyWith({
    CalculatorStatus? status,
    ExchangeRate? exchangeRate,
    Currency? sendCurrency,
    Currency? receiveCurrency,
    String? sendAmount,
    double? receiveAmount,
    double? estimatedSavings,
    String? savingsCurrencySymbol,
    int? koins,
    bool? canOperate,
    String? operateMessage,
    String? appliedCoupon,
    Failure? failure,
  }) {
    return CalculatorState(
      status: status ?? this.status,
      exchangeRate: exchangeRate ?? this.exchangeRate,
      sendCurrency: sendCurrency ?? this.sendCurrency,
      receiveCurrency: receiveCurrency ?? this.receiveCurrency,
      sendAmount: sendAmount ?? this.sendAmount,
      receiveAmount: receiveAmount ?? this.receiveAmount,
      estimatedSavings: estimatedSavings ?? this.estimatedSavings,
      savingsCurrencySymbol:
          savingsCurrencySymbol ?? this.savingsCurrencySymbol,
      koins: koins ?? this.koins,
      canOperate: canOperate ?? this.canOperate,
      operateMessage: operateMessage ?? this.operateMessage,
      appliedCoupon: appliedCoupon ?? this.appliedCoupon,
      failure: failure,
    );
  }

  @override
  List<Object?> get props => [
    status,
    exchangeRate,
    sendCurrency,
    receiveCurrency,
    sendAmount,
    receiveAmount,
    estimatedSavings,
    savingsCurrencySymbol,
    koins,
    canOperate,
    operateMessage,
    appliedCoupon,
    failure,
  ];
}