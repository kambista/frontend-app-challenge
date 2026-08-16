import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/exchange_rate.dart';
import 'package:challenge_frontend_app/features/transactions/domain/repositories/transaction_repository.dart';

class GetExchangeRateUseCase implements UseCase<ExchangeRate, NoParams> {
  final TransactionRepository repository;

  GetExchangeRateUseCase(this.repository);

  @override
  Future<ExchangeRate> call(NoParams params) {
    return repository.getExchangeRate();
  }
}
