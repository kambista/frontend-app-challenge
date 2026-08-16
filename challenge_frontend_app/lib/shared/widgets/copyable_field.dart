import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CopyableField extends StatelessWidget {
  final String label;
  final String value;
  final bool isCopyable;

  const CopyableField({
    super.key,
    required this.label,
    required this.value,
    this.isCopyable = true,
  });

  void _copy(BuildContext context) {
    Clipboard.setData(ClipboardData(text: value));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$label copiado'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: AppTextStyles.bodySmall
                    .copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: AppTextStyles.bodyLarge
                    .copyWith(fontWeight: FontWeight.bold),
              ),
            ],
          ),
          if (isCopyable)
            IconButton(
              icon: const Icon(Icons.copy_outlined,
                  size: 18, color: AppColors.textSecondary),
              onPressed: () => _copy(context),
              constraints: const BoxConstraints(),
              padding: EdgeInsets.zero,
            ),
        ],
      ),
    );
  }
}