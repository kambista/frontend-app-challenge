import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/theme/app_theme.dart';
import 'injection_container.dart' as di;
import 'shared/navigation/app_router.dart';
import 'injection_container.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  runApp(const KambistaApp());
}

class KambistaApp extends StatelessWidget {
  const KambistaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: sl<BankAccountsBloc>(),
      child: MaterialApp.router(
        title: 'Kambista Challenge',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light,
        routerConfig: AppRouter.router,
      ),
    );
  }
}
