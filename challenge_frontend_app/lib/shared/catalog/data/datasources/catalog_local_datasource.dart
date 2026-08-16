import 'dart:convert';

import 'package:challenge_frontend_app/shared/catalog/data/models/bank_model.dart';
import 'package:challenge_frontend_app/shared/catalog/data/models/source_fund_model.dart';
import 'package:flutter/services.dart' show rootBundle;

abstract class CatalogLocalDataSource {
  Future<List<BankModel>> getBanks();
  Future<List<SourceFundModel>> getSourceFunds();
}

class CatalogLocalDataSourceImpl implements CatalogLocalDataSource {
  static const _banksPath = 'assets/mocks/bankAccounts.json';
  static const _sourceFundsPath = 'assets/mocks/sourceFunds.json';

  @override
  Future<List<BankModel>> getBanks() async {
    final raw = await rootBundle.loadString(_banksPath);
    final list = jsonDecode(raw) as List<dynamic>;
    return list
        .map((e) => BankModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  @override
  Future<List<SourceFundModel>> getSourceFunds() async {
    final raw = await rootBundle.loadString(_sourceFundsPath);
    final list = jsonDecode(raw) as List<dynamic>;
    return list
        .map((e) => SourceFundModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }
}