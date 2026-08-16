import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';

class BankModel extends Bank {
  const BankModel({
    required super.id,
    required super.name,
    required super.alias,
  });

  factory BankModel.fromJson(Map<String, dynamic> json) {
    return BankModel(
      id: json['id'].toString(),
      name: json['name'] as String,
      alias: json['alias'] as String,
    );
  }
}