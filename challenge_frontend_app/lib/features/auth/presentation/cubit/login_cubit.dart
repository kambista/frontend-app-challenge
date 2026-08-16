import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/auth/domain/usecases/login_usecase.dart';
import 'package:challenge_frontend_app/features/auth/presentation/cubit/login_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginCubit extends Cubit<LoginState> {
  final LoginUseCase loginUseCase;

  LoginCubit(this.loginUseCase) : super(const LoginState());

  Future<void> login({required String email, required String password}) async {
    emit(state.copyWith(status: LoginStatus.loading));
    try {
      final user = await loginUseCase(
        LoginParams(email: email, password: password),
      );
      emit(state.copyWith(status: LoginStatus.success, user: user));
    } on Failure catch (failure) {
      emit(state.copyWith(status: LoginStatus.error, failure: failure));
    }
  }

  void resetError() {
    emit(state.copyWith(status: LoginStatus.initial));
  }
}
