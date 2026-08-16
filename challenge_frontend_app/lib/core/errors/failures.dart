abstract class Failure {
  final String message;
  const Failure(this.message);
}

class ServerFailure extends Failure {
  const ServerFailure(super.message);
}

class ApiFailure extends Failure {
  final String code;
  final String title;
  const ApiFailure({
    required this.code,
    required this.title,
    required String message,
  }) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure([super.message = 'Sin conexión a internet.']);
}

class ValidationFailure extends Failure {
  const ValidationFailure(super.message);
}