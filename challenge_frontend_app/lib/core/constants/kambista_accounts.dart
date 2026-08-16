import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/kambista_account.dart';

class KambistaAccounts {

  static const KambistaAccount pen = KambistaAccount(
    bankName: 'Interbank',
    accountNumber: '201010000000',
    ruc: '20601708141',
    accountHolder: 'Kambista SAC',
    accountType: 'Corriente',
    currency: Currency.pen,
  );

  static const KambistaAccount usd = KambistaAccount(
    bankName: 'Interbank',
    accountNumber: '201010000001',
    ruc: '20601708141',
    accountHolder: 'Kambista SAC',
    accountType: 'Corriente',
    currency: Currency.usd,
  );

  static KambistaAccount forCurrency(Currency currency) {
    return currency == Currency.pen ? pen : usd;
  }
}