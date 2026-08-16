import 'package:bloc_test/bloc_test.dart';
import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/calculate_operation_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/get_exchange_rate_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_state.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockGetExchangeRateUseCase extends Mock implements GetExchangeRateUseCase {}
class MockCalculateOperationUseCase extends Mock implements CalculateOperationUseCase {}

void main() {
  late MockGetExchangeRateUseCase mockGetRate;
  late MockCalculateOperationUseCase mockCalculate;

  setUp(() {
    mockGetRate = MockGetExchangeRateUseCase();
    mockCalculate = MockCalculateOperationUseCase();
    registerFallbackValue(const CalculateOperationParams(
      originCurrency: Currency.pen,
      destinationCurrency: Currency.usd,
      amount: 0,
    ));
  });

  CalculatorBloc buildBloc() => CalculatorBloc(
    getExchangeRateUseCase: mockGetRate,
    calculateOperationUseCase: mockCalculate,
  );

  blocTest<CalculatorBloc, CalculatorState>(
    'enviar en PEN implica operationType = buy',
    build: buildBloc,
    seed: () => const CalculatorState(sendCurrency: Currency.usd),
    act: (bloc) => bloc.add(const SendCurrencyChanged(Currency.pen)),
    expect: () => [
      isA<CalculatorState>()
          .having((s) => s.sendCurrency, 'sendCurrency', Currency.pen)
          .having((s) => s.operationType, 'operationType', OperationType.buy),
    ],
  );

  blocTest<CalculatorBloc, CalculatorState>(
    'enviar en USD implica operationType = sell',
    build: buildBloc,
    seed: () => const CalculatorState(sendCurrency: Currency.pen),
    act: (bloc) => bloc.add(const SendCurrencyChanged(Currency.usd)),
    expect: () => [
      isA<CalculatorState>()
          .having((s) => s.sendCurrency, 'sendCurrency', Currency.usd)
          .having((s) => s.operationType, 'operationType', OperationType.sell),
    ],
  );

  blocTest<CalculatorBloc, CalculatorState>(
    'tocar tab Compra fuerza sendCurrency a PEN sin importar el estado previo',
    build: buildBloc,
    seed: () => const CalculatorState(sendCurrency: Currency.usd),
    act: (bloc) => bloc.add(const OperationTypeSelected(OperationType.buy)),
    expect: () => [
      isA<CalculatorState>()
          .having((s) => s.sendCurrency, 'sendCurrency', Currency.pen)
          .having((s) => s.operationType, 'operationType', OperationType.buy),
    ],
  );

  blocTest<CalculatorBloc, CalculatorState>(
    'el swap invierte sendCurrency y por lo tanto invierte operationType',
    build: buildBloc,
    seed: () => const CalculatorState(
      sendCurrency: Currency.pen,
      receiveCurrency: Currency.usd,
    ),
    act: (bloc) => bloc.add(const CurrenciesSwapped()),
    expect: () => [
      isA<CalculatorState>()
          .having((s) => s.sendCurrency, 'sendCurrency', Currency.usd)
          .having((s) => s.receiveCurrency, 'receiveCurrency', Currency.pen)
          .having((s) => s.operationType, 'operationType', OperationType.sell),
    ],
  );
}