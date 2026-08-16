import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_state.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/widgets/file_upload_field.dart';
import 'package:challenge_frontend_app/injection_container.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:challenge_frontend_app/shared/widgets/step_progress_indicator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';


class AttachVoucherPage extends StatelessWidget {
  final PendingOperation operation;

  const AttachVoucherPage({super.key, required this.operation});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => sl<VoucherBloc>(param1: VoucherState(operation: operation)),
      child: const _AttachVoucherView(),
    );
  }
}

class _AttachVoucherView extends StatelessWidget {
  const _AttachVoucherView();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Envía tu constancia'),
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
        child: BlocConsumer<VoucherBloc, VoucherState>(
          listener: (context, state) {
            if (state.status == VoucherStatus.success &&
                state.createdOperation != null) {
              context.go(
                AppRoutes.operationCreated,
                extra: state.createdOperation,
              );
            }
            if (state.status == VoucherStatus.error && state.failure != null) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  backgroundColor: AppColors.error,
                  content: Text(state.failure!.message),
                ),
              );
            }
          },
          builder: (context, state) {
            return SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  StepProgressIndicator(
                    steps: const ['Completa', 'Transfiere', 'Constancia'],
                    currentIndex: 2,
                  ),
                  const SizedBox(height: 24),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: AppColors.primary, width: 1.5),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      children: [
                        Image.asset(
                          'assets/images/attach_voucher_illustration.png',
                          height: 90,
                          errorBuilder: (context, lastException, lastStack) => const Icon(
                            Icons.description_outlined,
                            size: 64,
                            color: AppColors.primaryDark,
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'Adjunta la constancia de tu transferencia para '
                          'poder verificar tu operación.',
                          textAlign: TextAlign.center,
                          style: AppTextStyles.bodyMedium,
                        ),
                        const SizedBox(height: 20),
                        FileUploadField(
                          filePath: state.operation.voucherFilePath,
                          errorText: state.fileError,
                          onFilePicked: (path, size) {
                            context.read<VoucherBloc>().add(VoucherFilePicked(path, size));
                          },
                        ),
                        const SizedBox(height: 20),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text('Recuerda:', style: AppTextStyles.fieldLabel),
                              SizedBox(height: 8),
                              _BulletText.rich(
                                'El voucher enviado debe tener el ',
                                bold: 'monto, datos, del beneficiario, fecha y hora.',
                              ),
                              _BulletText('El voucher debe ser legible'),
                              _BulletText.rich(
                                'Archivos permitidos ',
                                bold: 'imágenes, word y PDF',
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),
                  PrimaryButton(
                    label: 'ENVIAR CONSTANCIA',
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    isLoading: state.status == VoucherStatus.submitting,
                    onPressed: state.canSubmit
                        ? () => context
                            .read<VoucherBloc>()
                            .add(const VoucherSubmitted())
                        : null,
                  ),
                  const SizedBox(height: 12),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

class _BulletText extends StatelessWidget {
  final String text;
  final String? bold;
  final bool isRich;

  const _BulletText(this.text)
      : bold = null,
        isRich = false;

  const _BulletText.rich(this.text, {required this.bold}) : isRich = true;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('•  ', style: AppTextStyles.bodySmall),
          Expanded(
            child: isRich
                ? Text.rich(
                    TextSpan(
                      style: AppTextStyles.bodySmall,
                      children: [
                        TextSpan(text: text),
                        TextSpan(
                          text: bold,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  )
                : Text(text, style: AppTextStyles.bodySmall),
          ),
        ],
      ),
    );
  }
}