import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';

class AmountCurrencyCard extends StatelessWidget {
  final String label;
  final String amountText;
  final Currency currency;
  final bool isEditable;
  final ValueChanged<String>? onAmountChanged;
  final VoidCallback? onCurrencyTap;

  const AmountCurrencyCard({
    super.key,
    required this.label,
    required this.amountText,
    required this.currency,
    this.isEditable = false,
    this.onAmountChanged,
    this.onCurrencyTap,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              flex: 2,
              child: Container(
                color: const Color(0xFFEFEFEF),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      style: AppTextStyles.bodySmall.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    isEditable
                        ? TextField(
                            keyboardType: const TextInputType.numberWithOptions(decimal: true),
                            //style: AppTextStyles.headlineMedium.copyWith(fontSize: 14),
                            controller: TextEditingController(text: amountText)
                              ..selection = TextSelection.collapsed(
                                offset: amountText.length,
                              ),
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                              isDense: true,
                              contentPadding: EdgeInsets.all(8),
                            ),
                            onChanged: onAmountChanged,
                          )
                        : Text(
                            amountText,
                            style: AppTextStyles.headlineMedium.copyWith(fontSize: 22),
                          ),
                  ],
                ),
              ),
            ),
            Expanded(
              flex: 1,
              child: Container(
                color: AppColors.primaryDark,         
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),       
                child: GestureDetector(
                  onTap: onCurrencyTap,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        currency.label,
                        style: AppTextStyles.bodyLarge.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Icon(Icons.keyboard_arrow_down, color: Colors.white, size: 20),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}