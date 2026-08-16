import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';

enum InfoBannerVariant { info, warning }


class InfoBanner extends StatelessWidget {
  final String message;
  final InfoBannerVariant variant;

  const InfoBanner({
    super.key,
    required this.message,
    this.variant = InfoBannerVariant.info,
  });

  @override
  Widget build(BuildContext context) {
    final isWarning = variant == InfoBannerVariant.warning;
    final backgroundColor = isWarning
        ? AppColors.warningBanner
        : AppColors.successBanner;
    final iconColor = isWarning ? AppColors.warningBannerTxt : AppColors.successBannerTxt;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(Icons.info_outline, size: 24, color: iconColor),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: AppTextStyles.bodySmall.copyWith(
                color: isWarning ? AppColors.warningBannerTxt : AppColors.successBannerTxt,
              ),
            ),
          ),
        ],
      ),
    );
  }
}