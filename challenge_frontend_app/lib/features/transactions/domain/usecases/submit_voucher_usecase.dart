import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/repositories/transaction_repository.dart';

class SubmitVoucherUseCase implements UseCase<CreatedOperation, PendingOperation> {
  final TransactionRepository repository;
  SubmitVoucherUseCase(this.repository);

  @override
  Future<CreatedOperation> call(PendingOperation params) {
    return repository.submitVoucher(params);
  }
}