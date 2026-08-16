import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/repositories/onboarding_repository.dart';

class SubmitPersonalDataUseCase implements UseCase<void, PersonalData> {
  final OnboardingRepository repository;

  SubmitPersonalDataUseCase(this.repository);

  @override
  Future<void> call(PersonalData params) {
    return repository.submitPersonalData(params);
  }
}
