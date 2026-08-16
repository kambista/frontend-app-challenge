import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:equatable/equatable.dart';

class BankAccountsState extends Equatable {
  final List<BankAccount> accounts;

  const BankAccountsState({this.accounts = const []});

  List<BankAccount> byCurrency(AccountCurrency currency) =>
      accounts.where((a) => a.currency == currency).toList();

  BankAccountsState copyWith({List<BankAccount>? accounts}) {
    return BankAccountsState(accounts: accounts ?? this.accounts);
  }

  @override
  List<Object?> get props => [accounts];
}