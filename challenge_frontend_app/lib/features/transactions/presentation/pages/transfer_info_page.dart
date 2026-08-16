import 'package:challenge_frontend_app/core/constants/kambista_accounts.dart';
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/copyable_field.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:challenge_frontend_app/shared/widgets/step_progress_indicator.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TransferInfoPage extends StatelessWidget {
  final PendingOperation operation;

  const TransferInfoPage({super.key, required this.operation});

  String get _sendSymbol => operation.sendCurrency.code == 'USD' ? '\$' : 'S/';

  String get _expiryTime {
    final expiry = DateTime.now().add(const Duration(minutes: 15));
    final hour = expiry.hour.toString().padLeft(2, '0');
    final minute = expiry.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }

  @override
  Widget build(BuildContext context) {
    final kambistaAccount = KambistaAccounts.forCurrency(operation.sendCurrency);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Transfiere a Kambista'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              context.push(AppRoutes.login);
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              StepProgressIndicator(
                steps: const ['Completa', 'Transfiere', 'Constancia'],
                currentIndex: 1,
              ),
              const SizedBox(height: 24),
              Center(
                child: Text.rich(
                  TextSpan(
                    style: AppTextStyles.bodyMedium.copyWith(color: AppColors.textSecondary),
                    children: [
                      const TextSpan(
                        text: 'El tipo de cambio podría actualizarse a las ',
                      ),
                      TextSpan(
                        text: _expiryTime,
                        style: const TextStyle(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 20),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    SizedBox(
                      height: 90,
                      width: 90,
                      child: Image.asset('assets/images/wallet.png', width: 300, height: 300),
                    ),
                    const SizedBox(height: 16),
                    Text.rich(
                      TextSpan(
                        style: AppTextStyles.bodyMedium,
                        children: const [
                          TextSpan(text: 'Transfiere desde tu app bancaria y guarda el '),
                          TextSpan(
                            text: 'número o código de operación',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                          TextSpan(text: ' para el siguiente paso.'),
                        ],
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.border),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: [
                          CopyableField(
                            label: 'Banco',
                            value: kambistaAccount.bankName,
                            isCopyable: false,
                          ),
                          CopyableField(
                            label: 'Monto',
                            value:
                                '$_sendSymbol ${operation.sendAmount.toStringAsFixed(2)}',
                          ),
                          CopyableField(
                            label: 'Número de cuenta',
                            value: kambistaAccount.accountNumber,
                          ),
                          CopyableField(
                            label: 'RUC',
                            value: kambistaAccount.ruc,
                          ),
                          CopyableField(
                            label: 'Titular de la cuenta',
                            value: kambistaAccount.accountHolder,
                            isCopyable: false,
                          ),
                          CopyableField(
                            label: 'Tipo de cuenta',
                            value: kambistaAccount.accountType,
                            isCopyable: false,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),
              PrimaryButton(
                label: 'YA HICE MI TRANSFERENCIA',
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                onPressed: () => context.push(
                  AppRoutes.operationAttachVoucher,
                  extra: operation,
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}