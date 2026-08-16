import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/repositories/catalog_repository.dart';

class GetSourceFundsUseCase implements UseCase<List<SourceFund>, NoParams> {
  final CatalogRepository repository;
  GetSourceFundsUseCase(this.repository);

  @override
  Future<List<SourceFund>> call(NoParams params) => repository.getSourceFunds();
}