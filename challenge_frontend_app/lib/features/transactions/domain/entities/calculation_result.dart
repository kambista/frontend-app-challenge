class CalculationResult {
  final double amountReceived;
  final double exchangeRateUsed;
  final double estimatedSavings;
  final String savingsCurrencySymbol;
  final int koins;
  final bool canOperate;
  final String operateMessage;

  const CalculationResult({
    required this.amountReceived,
    required this.exchangeRateUsed,
    required this.estimatedSavings,
    this.savingsCurrencySymbol = 'S/',
    required this.koins,
    this.canOperate = true,
    this.operateMessage = '',
  });
}