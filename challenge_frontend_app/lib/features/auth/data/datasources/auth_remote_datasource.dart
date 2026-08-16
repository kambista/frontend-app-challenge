
import 'package:challenge_frontend_app/core/network/http_client.dart';
import 'package:challenge_frontend_app/features/auth/data/models/user_model.dart';

abstract class AuthRemoteDataSource {
  Future<UserModel> login({required String email, required String password});
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final AppHttpClient client;

  AuthRemoteDataSourceImpl(this.client);

  @override
  Future<UserModel> login({
    required String email,
    required String password,
  }) async {
    /* final json = await client.post(
      ApiConstants.loginUrl,
      body: {'email': email, 'password': password},
    ); */

    await Future.delayed(const Duration(seconds: 2));

    return UserModel.fromJson(
      {
        "success": true,
        "data": {
          "id": 1,
          "fullName": "John Doe",
          "email": email,
          "token": "eyJhbGciOiJIUzI1NiIsIn"
        }
      }
    );
  }  
}