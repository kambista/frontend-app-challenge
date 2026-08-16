import 'dart:convert';
import 'package:challenge_frontend_app/core/errors/exceptions.dart';
import 'package:http/http.dart' as http;

class AppHttpClient {
  final http.Client _client;

  AppHttpClient({http.Client? client}) : _client = client ?? http.Client();

  Future<Map<String, dynamic>> post(
    String url, {
    Map<String, String>? headers,
    Object? body,
  }) async {
    try {
      final response = await _client.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json', ...?headers},
        body: jsonEncode(body),
      );
      return _handleResponse(response);
    } on http.ClientException {
      throw NetworkException();
    }
  }

  Future<Map<String, dynamic>> get(
    String url, {
    Map<String, String>? headers,
  }) async {
    try {
      final response = await _client.get(Uri.parse(url), headers: headers);
      return _handleResponse(response);
    } on http.ClientException {
      throw NetworkException();
    }
  }

  Map<String, dynamic> _handleResponse(http.Response response) {
    final decoded = jsonDecode(response.body) as Map<String, dynamic>;

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return decoded;
    }

    if (decoded['success'] == false && decoded['data'] != null) {
      throw ApiException.fromJson(decoded);
    }

    throw ServerException('Error del servidor (${response.statusCode}).');
  }
}