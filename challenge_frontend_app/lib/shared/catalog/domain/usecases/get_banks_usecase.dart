import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/repositories/catalog_repository.dart';

class GetBanksUseCase implements UseCase<List<Bank>, NoParams> {
  final CatalogRepository repository;
  GetBanksUseCase(this.repository);

  @override
  Future<List<Bank>> call(NoParams params) => repository.getBanks();
}