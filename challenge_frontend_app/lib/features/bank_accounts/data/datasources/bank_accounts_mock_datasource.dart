import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

abstract class BankAccountsMockDataSource {
  Future<List<Map<String, String>>> getBankAccountsList();
  Future<List<Map<String, String>>> getSourceOfFundsList();
}

class BankAccountsMockDataSourceImpl implements BankAccountsMockDataSource {
  static const List<Map<String, String>> fallbackBanks = [
    {"name": "Banco de Crédito del Perú", "alias": "BCP", "id": "1"},
    {"name": "Banco Internacional del Perú", "alias": "Interbank", "id": "2"},
    {"name": "BBVA Continental", "alias": "BBVA", "id": "3"},
    {"name": "BanBif", "alias": "BanBif", "id": "4"},
    {"name": "Scotiabank", "alias": "Scotiabank", "id": "5"},
    {"name": "Banco Falabella", "alias": "Falabella", "id": "6"},
    {"name": "Banco Pichincha", "alias": "Pichincha", "id": "7"},
    {"name": "Banco de Comercio", "alias": "Bancomercio", "id": "8"},
    {"name": "Citibank Perú", "alias": "Citibank", "id": "9"},
    {"name": "Mi Banco", "alias": "Mibanco", "id": "10"},
    {"name": "Banco GNB", "alias": "GNB", "id": "11"},
    {"name": "Banco Ripley", "alias": "Ripley", "id": "12"},
    {"name": "Banco de la Nación", "alias": "Nacion", "id": "13"},
    {"name": "Otro", "alias": "Otro", "id": "14"}
  ];

  static const List<Map<String, String>> fallbackFunds = [
    {"_id": "1", "name": "Ahorros"},
    {"_id": "2", "name": "Donación/Sorteo"},
    {"_id": "3", "name": "Venta de bien mueble"},
    {"_id": "4", "name": "Venta de bien inmueble"},
    {"_id": "5", "name": "Herencia"},
    {"_id": "6", "name": "Préstamos"}
  ];

  @override
  Future<List<Map<String, String>>> getBankAccountsList() async {
    try {
      final jsonString = await rootBundle.loadString('mocks/bankAccounts.json');
      final List<dynamic> jsonList = jsonDecode(jsonString);
      return jsonList.map((e) => Map<String, String>.from(e as Map)).toList();
    } catch (_) {
      return fallbackBanks;
    }
  }

  @override
  Future<List<Map<String, String>>> getSourceOfFundsList() async {
    try {
      final jsonString = await rootBundle.loadString('mocks/sourceFunds.json');
      final List<dynamic> jsonList = jsonDecode(jsonString);
      return jsonList.map((e) => Map<String, String>.from(e as Map)).toList();
    } catch (_) {
      return fallbackFunds;
    }
  }
}
