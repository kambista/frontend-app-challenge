class AppConstants {
  static const String appName = 'Kambista App';

  // Currencies
  static const String currencyPen = 'PEN';
  static const String currencyUsd = 'USD';
  static const String symbolPen = 'S/';
  static const String symbolUsd = '\$';

  // Document types
  static const String docTypeDni = 'DNI';
  static const String docTypeCe = 'CE';
  static const String docTypePasaporte = 'PASAPORTE';

  static const List<String> documentTypes = [
    docTypeDni,
    docTypeCe,
    docTypePasaporte,
  ];

  // Account Types
  static const String accountTypeAhorros = 'Ahorros';
  static const String accountTypeCorriente = 'Corriente';

  static const List<String> accountTypes = [
    accountTypeAhorros,
    accountTypeCorriente,
  ];

  // Validation constants
  static const int minAgeYears = 18;
  static const int dniLength = 8;
  static const int ceLength = 9;
  static const int phoneLength = 9;
}
