import 'package:challenge_frontend_app/features/transactions/domain/entities/exchange_rate.dart';

class ExchangeRateModel extends ExchangeRate {
  final DateTime date;

  const ExchangeRateModel({
    required super.buyRate,
    required super.sellRate,
    required this.date,
  });

  /// Convención cambiaria:
  /// - "ask" es el precio que VENDE la divisa → tab "Venta"
  /// - "bid" es el precio  que COMPRA la divisa → tab "Compra"
  factory ExchangeRateModel.fromJson(Map<String, dynamic> json) {
    return ExchangeRateModel(
      buyRate: (json['bid'] as num).toDouble(),
      sellRate: (json['ask'] as num).toDouble(),
      date: DateTime.tryParse(json['date'] as String? ?? '') ?? DateTime.now(),
    );
  }
}