import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';
import 'package:equatable/equatable.dart';

abstract class OnboardingEvent extends Equatable {
  const OnboardingEvent();

  @override
  List<Object?> get props => [];
}

class OnboardingSubmitted extends OnboardingEvent {
  final PersonalData data;

  const OnboardingSubmitted(this.data);

  @override
  List<Object?> get props => [data];
}

class OnboardingErrorCleared extends OnboardingEvent {
  const OnboardingErrorCleared();
}
