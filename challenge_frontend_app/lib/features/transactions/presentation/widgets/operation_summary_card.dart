import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:flutter/material.dart';

class OperationSummaryCard extends StatelessWidget {
  final PendingOperation operation;

  const OperationSummaryCard({super.key, required this.operation});

  String _formatAmount(double amount, String symbol) =>
      '$symbol ${amount.toStringAsFixed(2)}';

  @override
  Widget build(BuildContext context) {
    final sendSymbol = operation.sendCurrency.code == 'USD' ? '\$' : 'S/';
    final receiveSymbol = operation.receiveCurrency.code == 'USD' ? '\$' : 'S/';

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.border),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        children: [
          _Row(label: 'Tú envías', value: _formatAmount(operation.sendAmount, sendSymbol)),
          const SizedBox(height: 10),
          _Row(label: 'Tú recibes', value: _formatAmount(operation.receiveAmount, receiveSymbol)),
          if (operation.couponCode != null) ...[
            const SizedBox(height: 10),
            _Row(label: 'Cupón aplicado', value: operation.couponCode!.toUpperCase()),
          ],
          const Divider(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Tipo de cambio utilizado',
                  style: AppTextStyles.bodyMedium),
              Row(
                children: [
                  if (operation.previousExchangeRate != null) ...[
                    Text(
                      operation.previousExchangeRate!.toStringAsFixed(3),
                      style: AppTextStyles.bodyMedium.copyWith(
                        color: AppColors.error,
                        decoration: TextDecoration.lineThrough,
                      ),
                    ),
                    const SizedBox(width: 6),
                  ],
                  Text(
                    operation.exchangeRateUsed.toStringAsFixed(3),
                    style: AppTextStyles.bodyLarge.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _Row extends StatelessWidget {
  final String label;
  final String value;
  const _Row({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: AppTextStyles.bodyMedium.copyWith(color: AppColors.textSecondary)),
        Text(value, style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold)),
      ],
    );
  }
}