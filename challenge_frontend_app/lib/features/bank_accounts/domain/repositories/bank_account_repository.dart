import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';

abstract class BankAccountRepository {
  Future<List<Map<String, String>>> getAvailableBanks();
  Future<List<Map<String, String>>> getSourceOfFunds();
  Future<List<BankAccount>> getBankAccounts();
  Future<BankAccount> addBankAccount(BankAccount account);
}
