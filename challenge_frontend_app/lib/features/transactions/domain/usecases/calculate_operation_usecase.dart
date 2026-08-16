import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/calculation_result.dart';
import 'package:challenge_frontend_app/features/transactions/domain/repositories/transaction_repository.dart';

class CalculateOperationParams {
  final Currency originCurrency;
  final Currency destinationCurrency;
  final double amount;

  const CalculateOperationParams({
    required this.originCurrency,
    required this.destinationCurrency,
    required this.amount,
  });
}

class CalculateOperationUseCase
    implements UseCase<CalculationResult, CalculateOperationParams> {
  final TransactionRepository repository;

  CalculateOperationUseCase(this.repository);

  @override
  Future<CalculationResult> call(CalculateOperationParams params) {
    if (params.amount <= 0) {
      throw ArgumentError('El monto debe ser mayor a 0.');
    }
    return repository.calculate(
      originCurrency: params.originCurrency,
      destinationCurrency: params.destinationCurrency,
      amount: params.amount,
    );
  }
}
