import 'package:challenge_frontend_app/core/constants/currency.dart';

class KambistaAccount {
  final String bankName;
  final String accountNumber;
  final String ruc;
  final String accountHolder;
  final String accountType;
  final Currency currency;

  const KambistaAccount({
    required this.bankName,
    required this.accountNumber,
    required this.ruc,
    required this.accountHolder,
    required this.accountType,
    required this.currency,
  });
}