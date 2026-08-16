import 'package:challenge_frontend_app/core/errors/exceptions.dart';
import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/onboarding/data/datasources/onboarding_remote_datasource.dart';
import 'package:challenge_frontend_app/features/onboarding/data/models/personal_data_model.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/repositories/onboarding_repository.dart';

class OnboardingRepositoryImpl implements OnboardingRepository {
  final OnboardingRemoteDataSource remoteDataSource;

  OnboardingRepositoryImpl(this.remoteDataSource);

  @override
  Future<void> submitPersonalData(PersonalData data) async {
    try {
      final model = PersonalDataModel.fromEntity(data);
      await remoteDataSource.submitPersonalData(model);
    } on ApiException catch (e) {
      throw ApiFailure(code: e.code, title: e.title, message: e.message);
    } on NetworkException catch (e) {
      throw NetworkFailure(e.message);
    } on ServerException catch (e) {
      throw ServerFailure(e.message);
    }
  }
}