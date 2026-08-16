import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/core/utils/validators.dart';
import 'package:challenge_frontend_app/features/auth/presentation/cubit/login_cubit.dart';
import 'package:challenge_frontend_app/features/auth/presentation/cubit/login_state.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_text_field.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _rememberMe = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submit(BuildContext context) {
    if (_formKey.currentState?.validate() ?? false) {
      context.read<LoginCubit>().login(
            email: _emailController.text.trim(),
            password: _passwordController.text,
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<LoginCubit, LoginState>(
      listener: (context, state) {
        if (state.status == LoginStatus.error && state.failure != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              backgroundColor: AppColors.error,
              content: Text(state.failure!.message),
            ),
          );
        }
        if (state.status == LoginStatus.success) {
          context.push(AppRoutes.home);
        }
      },
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CustomTextField(
              controller: _emailController,
              label: 'Correo electrónico',
              keyboardType: TextInputType.emailAddress,
              validator: Validators.email,
            ),
            const SizedBox(height: 16),
            CustomTextField(
              controller: _passwordController,
              label: 'Contraseña',
              obscureText: true,
              validator: Validators.password,
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      width: 24,
                      height: 24,
                      child: Checkbox(
                        value: _rememberMe,
                        onChanged: (value) =>
                            setState(() => _rememberMe = value ?? false),
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text('Recordarme', style: AppTextStyles.bodyMedium),
                  ],
                ),
                GestureDetector(
                  onTap: () {
                    
                  },
                  child: const Text(
                    '¿Olvidaste tu contraseña?',
                    style: AppTextStyles.link,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 40),
            BlocBuilder<LoginCubit, LoginState>(
              builder: (context, state) {
                return PrimaryButton(
                  label: 'INICIA SESIÓN',
                  isLoading: state.status == LoginStatus.loading,
                  onPressed: () => _submit(context),
                );
              },
            ),
            const SizedBox(height: 20),
            Center(
              child: RichText(
                text: TextSpan(
                  style: AppTextStyles.bodyMedium,
                  children: [
                    const TextSpan(text: '¿No tienes cuenta? '),
                    TextSpan(
                      text: 'Regístrate aquí',
                      style: AppTextStyles.link,
                      recognizer: TapGestureRecognizer()..onTap = () => context.push(AppRoutes.onboardingPersonalData),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}