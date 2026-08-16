import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/auth/domain/entities/user.dart';
import 'package:challenge_frontend_app/features/auth/domain/repositories/auth_repository.dart';
import 'package:challenge_frontend_app/features/auth/domain/usecases/login_usecase.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockAuthRepository extends Mock implements AuthRepository {}

void main() {
  late LoginUseCase usecase;
  late MockAuthRepository mockRepository;

  setUp(() {
    mockRepository = MockAuthRepository();
    usecase = LoginUseCase(mockRepository);
  });

  const testUser = User(
    id: '1',
    email: 'test@kambista.com',
    fullName: 'Test User',
    token: 'fake-token',
  );

  test('debe retornar un User cuando el repositorio responde exitosamente', () async {
    // arrange
    when(() => mockRepository.login(
          email: any(named: 'email'),
          password: any(named: 'password'),
        )).thenAnswer((_) async => testUser);

    // act
    final result = await usecase(
      const LoginParams(email: 'test@kambista.com', password: '123456'),
    );

    // assert
    expect(result, equals(testUser));
    verify(() => mockRepository.login(
          email: 'test@kambista.com',
          password: '123456',
        )).called(1);
  });

  test('debe propagar un ApiFailure cuando el repositorio falla', () async {
    // arrange
    when(() => mockRepository.login(
          email: any(named: 'email'),
          password: any(named: 'password'),
        )).thenThrow(
      const ApiFailure(
        code: 'INVALID_CREDENTIALS',
        title: 'Error',
        message: 'Credenciales inválidas.',
      ),
    );

    // act & assert
    expect(
      () => usecase(const LoginParams(email: 'a@a.com', password: 'x')),
      throwsA(isA<ApiFailure>()),
    );
  });
}