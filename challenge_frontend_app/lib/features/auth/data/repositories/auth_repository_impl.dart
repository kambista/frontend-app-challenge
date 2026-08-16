import 'package:challenge_frontend_app/core/errors/exceptions.dart';
import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/auth/data/datasources/auth_remote_datasource.dart';
import 'package:challenge_frontend_app/features/auth/domain/entities/user.dart';
import 'package:challenge_frontend_app/features/auth/domain/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl(this.remoteDataSource);

  @override
  Future<User> login({required String email, required String password}) async {
    try {
      return await remoteDataSource.login(email: email, password: password);
    } on ApiException catch (e) {
      throw ApiFailure(code: e.code, title: e.title, message: e.message);
    } on NetworkException catch (e) {
      throw NetworkFailure(e.message);
    } on ServerException catch (e) {
      throw ServerFailure(e.message);
    }
  }
}