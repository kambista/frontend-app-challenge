import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';

class BankAccountModel extends BankAccount {
  const BankAccountModel({
    required super.id,
    required super.bankId,
    required super.bankName,
    required super.bankAlias,
    required super.accountType,
    required super.currency,
    required super.accountNumber,
    required super.alias,
  });

  factory BankAccountModel.fromEntity(BankAccount entity) {
    return BankAccountModel(
      id: entity.id,
      bankId: entity.bankId,
      bankName: entity.bankName,
      bankAlias: entity.bankAlias,
      accountType: entity.accountType,
      currency: entity.currency,
      accountNumber: entity.accountNumber,
      alias: entity.alias,
    );
  }
}