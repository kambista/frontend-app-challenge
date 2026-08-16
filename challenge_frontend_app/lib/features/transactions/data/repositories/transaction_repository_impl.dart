import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/errors/exceptions.dart';
import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/transactions/data/datasources/exchange_remote_datasource.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/calculation_result.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/exchange_rate.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/repositories/transaction_repository.dart';

class TransactionRepositoryImpl implements TransactionRepository {
  final ExchangeRemoteDataSource remoteDataSource;

  TransactionRepositoryImpl(this.remoteDataSource);

  @override
  Future<ExchangeRate> getExchangeRate() async {
    try {
      return await remoteDataSource.getExchangeRate();
    } on ApiException catch (e) {
      throw ApiFailure(code: e.code, title: e.title, message: e.message);
    } on NetworkException catch (e) {
      throw NetworkFailure(e.message);
    } on ServerException catch (e) {
      throw ServerFailure(e.message);
    }
  }

  @override
  Future<CalculationResult> calculate({
    required Currency originCurrency,
    required Currency destinationCurrency,
    required double amount,
  }) async {
    try {
      return await remoteDataSource.calculate(
        originCurrency: originCurrency,
        destinationCurrency: destinationCurrency,
        amount: amount,
      );
    } on ApiException catch (e) {
      throw ApiFailure(code: e.code, title: e.title, message: e.message);
    } on NetworkException catch (e) {
      throw NetworkFailure(e.message);
    } on ServerException catch (e) {
      throw ServerFailure(e.message);
    }
  }

  @override
  Future<CreatedOperation> submitVoucher(PendingOperation operation) async {
    await Future.delayed(const Duration(milliseconds: 800));

    final symbol = operation.receiveCurrency.code == 'USD' ? '\$' : 'S/';
    final code = 'km${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';

    return CreatedOperation(
      kambistaCode: code,
      amountToReceive: operation.receiveAmount,
      receiveCurrencySymbol: symbol,
      estimatedWaitTime: '20h 15min',
    );
  }
}