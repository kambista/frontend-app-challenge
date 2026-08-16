import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';

class SourceFundModel extends SourceFund {
  const SourceFundModel({required super.id, required super.name});

  factory SourceFundModel.fromJson(Map<String, dynamic> json) {
    return SourceFundModel(
      id: json['_id'].toString(),
      name: json['name'] as String,
    );
  }
}