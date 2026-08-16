import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TransactionCreatedPage extends StatelessWidget {
  final CreatedOperation createdOperation;

  const TransactionCreatedPage({super.key, required this.createdOperation});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  IconButton(
                    icon: const Icon(Icons.logout),
                    onPressed: () {
                      context.push(AppRoutes.login);
                    },
                  ),
                ],
              ),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: AppColors.border),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  children: [
                    Image.asset(
                      'assets/images/voucher_sent_illustration.png',
                      height: 90,
                      errorBuilder: (context, lastException, lastStack) => const Icon(
                        Icons.savings_outlined,
                        size: 64,
                        color: AppColors.primaryDark,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text('¡Constancia enviada!',
                        style: AppTextStyles.title, textAlign: TextAlign.center),
                    const Divider(height: 28),
                    _InfoRow(
                      label: 'Código Kambista',
                      value: createdOperation.kambistaCode,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '*Usa tu código para dar seguimiento a tu operación.',
                      style: AppTextStyles.bodySmall
                          .copyWith(color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 16),
                    _InfoRow(
                      label: 'Monto a recibir',
                      value:
                          '${createdOperation.receiveCurrencySymbol} ${createdOperation.amountToReceive.toStringAsFixed(2)}',
                    ),
                    const SizedBox(height: 16),
                    _InfoRow(
                      label: 'Tiempo estimado de espera',
                      value: createdOperation.estimatedWaitTime,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/promo_gift_illustration.png',
                width: double.infinity,
                errorBuilder: (context, lastException, lastStack) =>
                  const Icon(Icons.card_giftcard, size: 40, color: Colors.white),
              ),
              const SizedBox(height: 20),
              Text(
                'Verificaremos tu operación. Puedes ver su estado en '
                '"Mis operaciones".',
                textAlign: TextAlign.center,
                style: AppTextStyles.bodyMedium
                    .copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 20),
              PrimaryButton(
                label: 'VOLVER A INICIO',
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                onPressed: () => context.go(AppRoutes.home),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;
  const _InfoRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(label,
            style: AppTextStyles.bodySmall.copyWith(color: AppColors.textSecondary)),
        const SizedBox(height: 2),
        Text(value,
            style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold)),
      ],
    );
  }
}