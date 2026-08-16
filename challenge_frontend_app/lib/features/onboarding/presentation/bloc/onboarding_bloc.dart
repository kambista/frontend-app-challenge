

import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/usecases/submit_personal_data_usecase.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_event.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class OnboardingBloc extends Bloc<OnboardingEvent, OnboardingState> {

  final SubmitPersonalDataUseCase submitPersonalDataUseCase;
  
  OnboardingBloc(this.submitPersonalDataUseCase) : super(OnboardingState()) {
    on<OnboardingSubmitted>(_onSubmitted);

    on<OnboardingErrorCleared>(_onErrorCleared);
  }

  Future<void> _onSubmitted(
    OnboardingSubmitted event,
    Emitter<OnboardingState> emit,
  ) async {
    emit(state.copyWith(status: OnboardingStatus.loading));
    try {
      //await submitPersonalDataUseCase(event.data);
      emit(state.copyWith(status: OnboardingStatus.success));
    } on Failure catch (failure) {
      emit(state.copyWith(status: OnboardingStatus.error, failure: failure));
    }
  }

  void _onErrorCleared(
    OnboardingErrorCleared event,
    Emitter<OnboardingState> emit,
  ) {
    emit(state.copyWith(status: OnboardingStatus.initial));
  }
}
