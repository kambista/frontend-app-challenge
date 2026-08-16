import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:equatable/equatable.dart';

abstract class CalculatorEvent extends Equatable {
  const CalculatorEvent();

  @override
  List<Object?> get props => [];
}

class CalculatorStarted extends CalculatorEvent {
  const CalculatorStarted();
}

class OperationTypeSelected extends CalculatorEvent {
  final OperationType operationType;
  const OperationTypeSelected(this.operationType);

  @override
  List<Object?> get props => [operationType];
}

class SendAmountChanged extends CalculatorEvent {
  final String amount;
  const SendAmountChanged(this.amount);

  @override
  List<Object?> get props => [amount];
}

class CurrenciesSwapped extends CalculatorEvent {
  const CurrenciesSwapped();
}

class SendCurrencyChanged extends CalculatorEvent {
  final Currency currency;
  const SendCurrencyChanged(this.currency);

  @override
  List<Object?> get props => [currency];
}

class CouponApplied extends CalculatorEvent {
  final String code;
  const CouponApplied(this.code);

  @override
  List<Object?> get props => [code];
}