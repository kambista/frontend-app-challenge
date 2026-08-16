
import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';

abstract class OnboardingRepository {
  Future<void> submitPersonalData(PersonalData data);
}
