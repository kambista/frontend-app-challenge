import 'dart:io';

import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

class FileUploadField extends StatelessWidget {
  final String? filePath;
  final String? errorText;
  final void Function(String path, int sizeBytes) onFilePicked;

  const FileUploadField({
    super.key,
    required this.filePath,
    required this.errorText,
    required this.onFilePicked,
  });

  Future<void> _pickFile() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    );
    if (result == null || result.files.isEmpty) return;

    final picked = result.files.single;
    if (picked.path == null) return;

    final file = File(picked.path!);
    final sizeBytes = await file.length();
    onFilePicked(picked.path!, sizeBytes);
  }

  @override
  Widget build(BuildContext context) {
    final fileName = filePath?.split('/').last;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Sube el archivo de tu constancia',
            style: AppTextStyles.fieldLabel),
        const SizedBox(height: 8),
        InkWell(
          onTap: _pickFile,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              border: Border.all(
                color: errorText != null ? AppColors.error : AppColors.border,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    fileName ?? 'Selecciona archivo',
                    overflow: TextOverflow.ellipsis,
                    style: AppTextStyles.bodyMedium.copyWith(
                      color: fileName == null
                          ? AppColors.textHint
                          : AppColors.textPrimary,
                    ),
                  ),
                ),
                Icon(
                  fileName == null
                      ? Icons.image_outlined
                      : Icons.check_circle,
                  color: fileName == null
                      ? AppColors.textSecondary
                      : AppColors.primary,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          errorText ?? '*Tamaño máximo permitido del archivo 10 Mb',
          style: AppTextStyles.bodySmall.copyWith(
            color: errorText != null
                ? AppColors.error
                : AppColors.textSecondary,
          ),
        ),
      ],
    );
  }
}