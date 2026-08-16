import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/auth/domain/entities/user.dart';
import 'package:equatable/equatable.dart';

enum LoginStatus { initial, loading, success, error }

class LoginState extends Equatable {
  final LoginStatus status;
  final User? user;
  final Failure? failure;

  const LoginState({
    this.status = LoginStatus.initial,
    this.user,
    this.failure,
  });

  LoginState copyWith({
    LoginStatus? status,
    User? user,
    Failure? failure,
  }) {
    return LoginState(
      status: status ?? this.status,
      user: user ?? this.user,
      failure: failure,
    );
  }

  @override
  List<Object?> get props => [status, user, failure];
}
