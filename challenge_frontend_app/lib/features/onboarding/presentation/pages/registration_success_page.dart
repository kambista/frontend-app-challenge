import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RegistrationSuccessPage extends StatelessWidget {
  final String? userFirstName;

  const RegistrationSuccessPage({super.key, this.userFirstName});

  @override
  Widget build(BuildContext context) {
    final name = userFirstName ?? 'Usuario';

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            children: [
              const SizedBox(height: 8),
              const Text(
                'Perfil creado con éxito',
                style: AppTextStyles.fieldLabel,
              ),
              const Spacer(flex: 2),
              Image.asset('assets/images/phone.png', width: 300, height: 300),
              const Spacer(flex: 2),
              Text.rich(
                TextSpan(
                  style: AppTextStyles.headlineMedium,
                  children: [
                    const TextSpan(text: '¡Felicitaciones '),
                    TextSpan(text: '$name,\n'),
                    const TextSpan(text: 'tu perfil ha sido creado!'),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text.rich(
                TextSpan(
                  style: AppTextStyles.bodyMedium.copyWith(
                    color: AppColors.textSecondary,
                  ),
                  children: const [
                    TextSpan(text: 'Ya puedes empezar a '),
                    TextSpan(
                      text: 'Kambiar',
                      style: TextStyle(fontStyle: FontStyle.italic),
                    ),
                    TextSpan(text: ' con\nla mejor tasa del mercado'),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
              const Spacer(flex: 3),
              PrimaryButton(
                label: 'CONTINUAR',
                onPressed: () => context.push(AppRoutes.home),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }
}