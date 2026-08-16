import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';

abstract class CatalogRepository {
  Future<List<Bank>> getBanks();
  Future<List<SourceFund>> getSourceFunds();
}