import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';
import 'package:equatable/equatable.dart';

enum CompleteDataStatus { initial, loading, ready, error }

class CompleteDataState extends Equatable {
  final CompleteDataStatus status;
  final List<Bank> banks;
  final List<SourceFund> sourceFunds;
  final PendingOperation operation;

  const CompleteDataState({
    this.status = CompleteDataStatus.initial,
    this.banks = const [],
    this.sourceFunds = const [],
    required this.operation,
  });

  bool get canContinue => operation.isComplete;

  CompleteDataState copyWith({
    CompleteDataStatus? status,
    List<Bank>? banks,
    List<SourceFund>? sourceFunds,
    PendingOperation? operation,
  }) {
    return CompleteDataState(
      status: status ?? this.status,
      banks: banks ?? this.banks,
      sourceFunds: sourceFunds ?? this.sourceFunds,
      operation: operation ?? this.operation,
    );
  }

  @override
  List<Object?> get props => [status, banks, sourceFunds, operation];
}