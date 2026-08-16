import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/calculate_operation_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/get_exchange_rate_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CalculatorBloc extends Bloc<CalculatorEvent, CalculatorState> {
  final GetExchangeRateUseCase getExchangeRateUseCase;
  final CalculateOperationUseCase calculateOperationUseCase;

  CalculatorBloc({
    required this.getExchangeRateUseCase,
    required this.calculateOperationUseCase,
  }) : super(const CalculatorState()) {
    on<CalculatorStarted>(_onStarted);
    on<OperationTypeSelected>(_onOperationTypeSelected);
    on<SendAmountChanged>(_onSendAmountChanged);
    on<CurrenciesSwapped>(_onCurrenciesSwapped);
    on<SendCurrencyChanged>(_onSendCurrencyChanged);
    on<CouponApplied>(_onCouponApplied);
  }

  Future<void> _onStarted(
    CalculatorStarted event,
    Emitter<CalculatorState> emit,
  ) async {
    emit(state.copyWith(status: CalculatorStatus.loading));
    try {
      final rate = await getExchangeRateUseCase(const NoParams());
      emit(state.copyWith(status: CalculatorStatus.ready, exchangeRate: rate));
      if (state.sendAmount.isNotEmpty) {
        add(SendAmountChanged(state.sendAmount));
      }
    } on Failure catch (failure) {
      emit(state.copyWith(status: CalculatorStatus.error, failure: failure));
    }
  }

  Future<void> _onOperationTypeSelected(
    OperationTypeSelected event,
    Emitter<CalculatorState> emit,
  ) async {
    final newSendCurrency =
        event.operationType == OperationType.buy ? Currency.pen : Currency.usd;
    final newReceiveCurrency =
        newSendCurrency == Currency.pen ? Currency.usd : Currency.pen;

    if (newSendCurrency == state.sendCurrency) return; // ya está en ese estado

    emit(state.copyWith(
      sendCurrency: newSendCurrency,
      receiveCurrency: newReceiveCurrency,
    ));
    await _recalculate(emit);
  }

  Future<void> _onSendAmountChanged(
    SendAmountChanged event,
    Emitter<CalculatorState> emit,
  ) async {
    emit(state.copyWith(sendAmount: event.amount));
    await _recalculate(emit);
  }

  Future<void> _onCurrenciesSwapped(
    CurrenciesSwapped event,
    Emitter<CalculatorState> emit,
  ) async {
    emit(state.copyWith(
      sendCurrency: state.receiveCurrency,
      receiveCurrency: state.sendCurrency,
    ));
    await _recalculate(emit);
  }

  Future<void> _onSendCurrencyChanged(
    SendCurrencyChanged event,
    Emitter<CalculatorState> emit,
  ) async {
    if (event.currency == state.sendCurrency) return;

    final newReceiveCurrency =
        event.currency == Currency.usd ? Currency.pen : Currency.usd;
    emit(state.copyWith(
      sendCurrency: event.currency,
      receiveCurrency: newReceiveCurrency,
    ));
    await _recalculate(emit);
  }

  Future<void> _onCouponApplied(
    CouponApplied event,
    Emitter<CalculatorState> emit,
  ) async {
    if (event.code.trim().isEmpty) return;
    emit(state.copyWith(appliedCoupon: event.code.trim()));
    await _recalculate(emit);
  }

  Future<void> _recalculate(Emitter<CalculatorState> emit) async {
    final amount = double.tryParse(state.sendAmount.replaceAll(',', ''));
    if (amount == null || amount <= 0) {
      emit(state.copyWith(receiveAmount: 0, estimatedSavings: 0, koins: 0));
      return;
    }

    emit(state.copyWith(status: CalculatorStatus.calculating));
    try {
      final result = await calculateOperationUseCase(
        CalculateOperationParams(
          originCurrency: state.sendCurrency,
          destinationCurrency: state.receiveCurrency,
          amount: amount,
        ),
      );
      emit(state.copyWith(
        status: CalculatorStatus.ready,
        receiveAmount: result.canOperate ? result.amountReceived : 0,
        estimatedSavings: result.estimatedSavings,
        savingsCurrencySymbol: result.savingsCurrencySymbol,
        koins: result.koins,
        canOperate: result.canOperate,
        operateMessage: result.operateMessage,
      ));
    } on Failure catch (failure) {
      emit(state.copyWith(status: CalculatorStatus.error, failure: failure));
    }
  }
}