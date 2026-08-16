
import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/calculation_result.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/exchange_rate.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';

abstract class TransactionRepository {
  Future<ExchangeRate> getExchangeRate();

  Future<CalculationResult> calculate({
    required Currency originCurrency,
    required Currency destinationCurrency,
    required double amount,
  });
  
  Future<CreatedOperation> submitVoucher(PendingOperation operation);
}
