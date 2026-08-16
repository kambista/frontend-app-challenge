import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:equatable/equatable.dart';

enum VoucherStatus { idle, submitting, success, error }

class VoucherState extends Equatable {
  final PendingOperation operation;
  final VoucherStatus status;
  final String? fileError;
  final CreatedOperation? createdOperation;
  final Failure? failure;

  const VoucherState({
    required this.operation,
    this.status = VoucherStatus.idle,
    this.fileError,
    this.createdOperation,
    this.failure,
  });

  bool get canSubmit =>
      operation.voucherFilePath != null && status != VoucherStatus.submitting;

  VoucherState copyWith({
    PendingOperation? operation,
    VoucherStatus? status,
    String? fileError,
    CreatedOperation? createdOperation,
    Failure? failure,
  }) {
    return VoucherState(
      operation: operation ?? this.operation,
      status: status ?? this.status,
      fileError: fileError,
      createdOperation: createdOperation ?? this.createdOperation,
      failure: failure,
    );
  }

  @override
  List<Object?> get props =>
      [operation, status, fileError, createdOperation, failure];
}