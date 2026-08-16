import 'package:challenge_frontend_app/features/auth/presentation/cubit/login_cubit.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_bloc.dart';
import 'package:challenge_frontend_app/features/onboarding/data/datasources/onboarding_remote_datasource.dart';
import 'package:challenge_frontend_app/features/onboarding/data/repositories/onboarding_repository_impl.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/repositories/onboarding_repository.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/usecases/submit_personal_data_usecase.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/data/datasources/exchange_remote_datasource.dart';
import 'package:challenge_frontend_app/features/transactions/data/repositories/transaction_repository_impl.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/repositories/transaction_repository.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/calculate_operation_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/get_exchange_rate_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/submit_voucher_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_state.dart';
import 'package:challenge_frontend_app/shared/catalog/data/datasources/catalog_local_datasource.dart';
import 'package:challenge_frontend_app/shared/catalog/data/repositories/catalog_repository_impl.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/repositories/catalog_repository.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/usecases/get_banks_usecase.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/usecases/get_source_funds_usecase.dart';
import 'package:get_it/get_it.dart';

import 'core/network/http_client.dart';

import 'features/auth/data/datasources/auth_remote_datasource.dart';
import 'features/auth/data/repositories/auth_repository_impl.dart';
import 'features/auth/domain/repositories/auth_repository.dart';
import 'features/auth/domain/usecases/login_usecase.dart';


final sl = GetIt.instance;

Future<void> init() async {
  // Core
  sl.registerLazySingleton(() => AppHttpClient());

  // Auth feature
  sl.registerFactory(() => LoginCubit(sl()));
  sl.registerLazySingleton(() => LoginUseCase(sl()));
  sl.registerLazySingleton<AuthRepository>(() => AuthRepositoryImpl(sl()));
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(sl()),
  );

  // Onboarding feature (Bloc)
  sl.registerFactory(() => OnboardingBloc(sl()));
  sl.registerLazySingleton(() => SubmitPersonalDataUseCase(sl()));
  sl.registerLazySingleton<OnboardingRepository>(
    () => OnboardingRepositoryImpl(sl()),
  );
  sl.registerLazySingleton<OnboardingRemoteDataSource>(
    () => OnboardingRemoteDataSourceImpl(sl()),
  );

  // calculator
  sl.registerFactory(() => CalculatorBloc(
        getExchangeRateUseCase: sl(),
        calculateOperationUseCase: sl(),
      ));
  sl.registerLazySingleton(() => GetExchangeRateUseCase(sl()));
  sl.registerLazySingleton(() => CalculateOperationUseCase(sl()));
  sl.registerLazySingleton<TransactionRepository>(
    () => TransactionRepositoryImpl(sl()),
  );
  sl.registerLazySingleton<ExchangeRemoteDataSource>(
    () => ExchangeRemoteDataSourceImpl(sl()),
  );

  // Catálogo compartido (bancos / origen de fondos)
  sl.registerLazySingleton<CatalogLocalDataSource>(
    () => CatalogLocalDataSourceImpl(),
  );
  sl.registerLazySingleton<CatalogRepository>(
    () => CatalogRepositoryImpl(sl()),
  );
  sl.registerLazySingleton(() => GetBanksUseCase(sl()));
  sl.registerLazySingleton(() => GetSourceFundsUseCase(sl()));

  sl.registerFactoryParam<CompleteDataBloc, PendingOperation, void>(
    (operation, _) => CompleteDataBloc(
      getBanksUseCase: sl(),
      getSourceFundsUseCase: sl(),
      initialOperation: operation,
    ),
  );

  sl.registerLazySingleton(() => BankAccountsBloc());  

  sl.registerLazySingleton(() => SubmitVoucherUseCase(sl()));
  sl.registerFactoryParam<VoucherBloc, VoucherState, void>(
    (initialState, _) => VoucherBloc(
      submitVoucherUseCase: sl(),
      initialState: initialState,
    ),
  );
}