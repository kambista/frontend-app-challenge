import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:equatable/equatable.dart';

abstract class BankAccountsEvent extends Equatable {
  const BankAccountsEvent();
  @override
  List<Object?> get props => [];
}

class BankAccountAdded extends BankAccountsEvent {
  final BankAccount account;
  const BankAccountAdded(this.account);
  @override
  List<Object?> get props => [account];
}