
import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/repositories/bank_account_repository.dart';

class AddBankAccountUseCase implements UseCase<BankAccount, BankAccount> {
  final BankAccountRepository repository;

  AddBankAccountUseCase(this.repository);

  @override
  Future<BankAccount> call(BankAccount params) async {
    return await repository.addBankAccount(params);
  }
}
