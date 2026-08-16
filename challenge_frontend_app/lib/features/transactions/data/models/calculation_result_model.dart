import 'package:challenge_frontend_app/features/transactions/domain/entities/calculation_result.dart';

class CalculationResultModel extends CalculationResult {
  const CalculationResultModel({
    required super.amountReceived,
    required super.exchangeRateUsed,
    required super.estimatedSavings,
    super.savingsCurrencySymbol,
    required super.koins,
    super.canOperate,
    super.operateMessage,
  });

  factory CalculationResultModel.fromJson(Map<String, dynamic> json) {
    final data = json['data'] as Map<String, dynamic>? ?? {};
    final savings = json['savings'] as Map<String, dynamic>? ?? {};

    return CalculationResultModel(
      amountReceived: (json['exchange'] as num).toDouble(),
      exchangeRateUsed: (json['rate'] as num).toDouble(),
      estimatedSavings:
          double.tryParse(savings['amount']?.toString() ?? '0') ?? 0,
      savingsCurrencySymbol: savings['currency'] as String? ?? 'S/',
      koins: 0,
      canOperate: data['operate'] as bool? ?? true,
      operateMessage: data['msg'] as String? ?? '',
    );
  }
}