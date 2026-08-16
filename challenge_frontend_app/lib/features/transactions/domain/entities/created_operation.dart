class CreatedOperation {
  final String kambistaCode;
  final double amountToReceive;
  final String receiveCurrencySymbol;
  final String estimatedWaitTime;

  const CreatedOperation({
    required this.kambistaCode,
    required this.amountToReceive,
    required this.receiveCurrencySymbol,
    required this.estimatedWaitTime,
  });
}