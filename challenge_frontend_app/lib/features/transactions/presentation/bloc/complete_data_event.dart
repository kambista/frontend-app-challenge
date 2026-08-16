import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:equatable/equatable.dart';

abstract class CompleteDataEvent extends Equatable {
  const CompleteDataEvent();
  @override
  List<Object?> get props => [];
}

class CompleteDataStarted extends CompleteDataEvent {
  const CompleteDataStarted();
}

class SourceBankSelected extends CompleteDataEvent {
  final String bankId;
  const SourceBankSelected(this.bankId);
  @override
  List<Object?> get props => [bankId];
}

class DestinationAccountSelected extends CompleteDataEvent {
  final BankAccount account;
  const DestinationAccountSelected(this.account);
  @override
  List<Object?> get props => [account];
}

class SourceFundSelected extends CompleteDataEvent {
  final String fundId;
  const SourceFundSelected(this.fundId);
  @override
  List<Object?> get props => [fundId];
}