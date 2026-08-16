class ServerException implements Exception {
  final String message;
  ServerException(this.message);
}

class ApiException implements Exception {
  final String code;
  final String title;
  final String message;

  ApiException({
    required this.code,
    required this.title,
    required this.message,
  });

  factory ApiException.fromJson(Map<String, dynamic> json) {
    final data = json['data'] as Map<String, dynamic>;
    return ApiException(
      code: data['name'] as String? ?? 'UNKNOWN',
      title: data['title'] as String? ?? 'Error',
      message: data['message'] as String? ?? 'Ocurrió un error inesperado.',
    );
  }
}

class NetworkException implements Exception {
  final String message;
  NetworkException([this.message = 'Sin conexión a internet.']);
}