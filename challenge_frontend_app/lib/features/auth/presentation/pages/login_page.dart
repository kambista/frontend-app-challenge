import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/features/auth/presentation/cubit/login_cubit.dart';
import 'package:challenge_frontend_app/features/auth/presentation/widgets/login_form.dart';
import 'package:challenge_frontend_app/injection_container.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          child: BlocProvider(
            create: (_) => sl<LoginCubit>(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 40),
                const _KambistaLogo(),
                const SizedBox(height: 32),
                Text(
                  'Inicia sesión',
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 32),
                const LoginForm(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _KambistaLogo extends StatelessWidget {
  const _KambistaLogo();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset('assets/images/logo.png', width: 50, height: 50),
        const SizedBox(width: 8),
        Text(
          'Kambista',
          style: TextStyle(color: AppColors.primaryDark, fontSize: 34, fontWeight: FontWeight.w700),
        ),
      ],
    );
  }
}