import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:equatable/equatable.dart';

enum OnboardingStatus { initial, loading, success, error }


class OnboardingState extends Equatable {
  final OnboardingStatus status;
  final Failure? failure;

  const OnboardingState({
    this.status = OnboardingStatus.initial,
    this.failure,
  });

  bool get isDuplicateDni => failure is ApiFailure && (failure as ApiFailure).code == 'DUPLICATE_DNI';

  OnboardingState copyWith({
    OnboardingStatus? status,
    Failure? failure,
  }) {
    return OnboardingState(
      status: status ?? this.status,
      failure: failure,
    );
  }

  @override
  List<Object?> get props => [status, failure];
}
