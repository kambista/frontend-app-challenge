enum AccountCurrency { pen, usd }
enum AccountType { savings, checking } // Ahorros / Crédito(?) según el enunciado

class BankAccount {
  final String id;
  final String bankId;
  final String bankName;
  final String bankAlias; // "BCP", "Scotiabank", etc. — para el ícono/etiqueta corta
  final AccountType accountType;
  final AccountCurrency currency;
  final String accountNumber; // número completo, se enmascara solo en la UI
  final String alias; // nombre que el usuario le puso a la cuenta

  const BankAccount({
    required this.id,
    required this.bankId,
    required this.bankName,
    required this.bankAlias,
    required this.accountType,
    required this.currency,
    required this.accountNumber,
    required this.alias,
  });

  /// "******4444" — según el mock, se muestran los últimos 4 dígitos.
  String get maskedAccountNumber {
    if (accountNumber.length <= 4) return accountNumber;
    final last4 = accountNumber.substring(accountNumber.length - 4);
    return '${'*' * 6}$last4';
  }

  String get currencyCode => currency == AccountCurrency.pen ? 'PEN' : 'USD';
}