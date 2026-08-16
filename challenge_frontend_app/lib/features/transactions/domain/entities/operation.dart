class Operation {
  final String id;
  final double sendAmount;
  final String sendCurrency;
  final double receiveAmount;
  final String receiveCurrency;
  final double exchangeRate;
  final String bankOrigin;
  final String bankDestination;
  final String sourceOfFunds;
  final String? voucherPath;
  final String status;
  final DateTime createdAt;

  const Operation({
    required this.id,
    required this.sendAmount,
    required this.sendCurrency,
    required this.receiveAmount,
    required this.receiveCurrency,
    required this.exchangeRate,
    required this.bankOrigin,
    required this.bankDestination,
    required this.sourceOfFunds,
    this.voucherPath,
    required this.status,
    required this.createdAt,
  });
}
