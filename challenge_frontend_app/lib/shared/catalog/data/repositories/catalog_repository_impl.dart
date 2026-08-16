import 'package:challenge_frontend_app/shared/catalog/data/datasources/catalog_local_datasource.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/repositories/catalog_repository.dart';

class CatalogRepositoryImpl implements CatalogRepository {
  final CatalogLocalDataSource localDataSource;
  CatalogRepositoryImpl(this.localDataSource);

  @override
  Future<List<Bank>> getBanks() => localDataSource.getBanks();

  @override
  Future<List<SourceFund>> getSourceFunds() => localDataSource.getSourceFunds();
}