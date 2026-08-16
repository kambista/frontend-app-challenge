
import 'package:challenge_frontend_app/features/auth/domain/entities/user.dart';

class UserModel extends User {
  const UserModel({
    required super.id,
    required super.email,
    required super.fullName,
    required super.token,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    final data = json['data'] as Map<String, dynamic>;
    return UserModel(
      id: data['id'].toString(),
      email: data['email'] as String,
      fullName: data['fullName'] as String? ?? '',
      token: data['token'] as String,
    );
  }
}