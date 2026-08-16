
import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/auth/domain/entities/user.dart';
import 'package:challenge_frontend_app/features/auth/domain/repositories/auth_repository.dart';

class LoginParams {
  final String email;
  final String password;

  const LoginParams({
    required this.email,
    required this.password,
  });
}

class LoginUseCase implements UseCase<User, LoginParams> {
  final AuthRepository repository;

  LoginUseCase(this.repository);

  @override
  Future<User> call(LoginParams params) async {
    return await repository.login(
      email: params.email,
      password: params.password,
    );
  }
}
