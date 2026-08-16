import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';

class StepProgressIndicator extends StatelessWidget {
  final List<String> steps;
  final int currentIndex;

  const StepProgressIndicator({
    super.key,
    required this.steps,
    required this.currentIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: List.generate(steps.length * 2 - 1, (i) {
        if (i.isOdd) {
          final leftStepDone = (i - 1) ~/ 2 < currentIndex;

          return Expanded(
            child: Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Container(
                height: 2,
                color: leftStepDone
                    ? AppColors.primaryDark
                    : AppColors.border,
              ),
            ),
          );
        }

        final stepIndex = i ~/ 2;
        final isActive = stepIndex == currentIndex;
        final isDone = stepIndex < currentIndex;

        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: (isActive || isDone)
                    ? AppColors.primaryDark
                    : AppColors.border,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              steps[stepIndex],
              textAlign: TextAlign.center,
              style: AppTextStyles.bodySmall.copyWith(
                color: isActive
                    ? AppColors.textPrimary
                    : AppColors.textSecondary,
                fontWeight: isActive
                    ? FontWeight.bold
                    : FontWeight.normal,
              ),
            ),
          ],
        );
      }),
    );
  }
}