import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_state.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/widgets/destination_account_sheet.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/widgets/operation_summary_card.dart';
import 'package:challenge_frontend_app/injection_container.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/bank.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/entities/source_fund.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_dropdown_field.dart';
import 'package:challenge_frontend_app/shared/widgets/info_banner.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:challenge_frontend_app/shared/widgets/step_progress_indicator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class CompleteDataPage extends StatelessWidget {
  final PendingOperation operation;

  const CompleteDataPage({super.key, required this.operation});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => sl<CompleteDataBloc>(param1: operation)..add(const CompleteDataStarted()),
      child: const _CompleteDataView(),
    );
  }
}

class _CompleteDataView extends StatelessWidget {
  const _CompleteDataView();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Completa los datos'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.canPop() ? context.pop() : context.go(AppRoutes.home),
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
        child: BlocBuilder<CompleteDataBloc, CompleteDataState>(
          builder: (context, state) {
            if (state.status == CompleteDataStatus.loading || state.status == CompleteDataStatus.initial) {
              return const Center(child: CircularProgressIndicator());
            }
            if (state.status == CompleteDataStatus.error) {
              return const Center(
                child: Text('No se pudo cargar la información. Intenta de nuevo.'),
              );
            }

            return SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  StepProgressIndicator(
                    steps: const ['Completa', 'Transfiere', 'Constancia'],
                    currentIndex: 0,
                  ),
                  const SizedBox(height: 24),
                  OperationSummaryCard(operation: state.operation),
                  const SizedBox(height: 16),
                  const InfoBanner(
                    message:
                      'Tiempo estimado de espera BCP, Interbank, BanBif, '
                      'Pichincha: 15 minutos.\nOtros bancos: 1 día hábil',
                  ),
                  const SizedBox(height: 20),
                  CustomDropdownField<Bank>(
                    label: '¿Desde qué banco nos envías tu dinero?',
                    hintText: 'Selecciona',
                    value: state.banks
                        .where((b) => b.id == state.operation.sourceBankId)
                        .firstOrNull,
                    items: state.banks,
                    itemLabel: (b) => b.name,
                    onChanged: (bank) {
                      if (bank != null) {
                        context.read<CompleteDataBloc>().add(SourceBankSelected(bank.id));
                      }
                    },
                  ),
                  const SizedBox(height: 16),
                  // En vez del CustomDropdownField<Bank> para destino, usar:
                  Text('¿En qué cuenta deseas recibir tu dinero?', style: AppTextStyles.fieldLabel),
                  const SizedBox(height: 8),
                  InkWell(
                    onTap: () async {
                      final currency = state.operation.receiveCurrency == Currency.pen
                          ? AccountCurrency.pen
                          : AccountCurrency.usd;

                      final selected = await showDestinationAccountSheet(
                        context,
                        currency: currency
                      );

                      if (selected != null && context.mounted) {
                        context.read<CompleteDataBloc>().add(DestinationAccountSelected(selected));
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.border),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            state.operation.destinationAccount?.alias ?? 'Selecciona',
                            style: AppTextStyles.bodyLarge.copyWith(
                              color: state.operation.destinationAccount == null
                                  ? AppColors.textHint
                                  : AppColors.textPrimary,
                            ),
                          ),
                          const Icon(Icons.keyboard_arrow_down, color: AppColors.textSecondary),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const InfoBanner(
                    variant: InfoBannerVariant.warning,
                    message:
                      'Recuerda que las cuentas deben estar a tu nombre. '
                      'Kambista no transfiere a cuentas de terceros',
                  ),
                  const SizedBox(height: 20),
                  CustomDropdownField<SourceFund>(
                    label: 'Origen de fondos',
                    hintText: 'Selecciona',
                    value: state.sourceFunds
                        .where((f) => f.id == state.operation.sourceFundId)
                        .firstOrNull,
                    items: state.sourceFunds,
                    itemLabel: (f) => f.name,
                    onChanged: (fund) {
                      if (fund != null) {
                        context.read<CompleteDataBloc>().add(SourceFundSelected(fund.id));
                      }
                    },
                  ),
                  const SizedBox(height: 28),
                  PrimaryButton(
                    label: 'CONTINUAR',
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    onPressed: state.canContinue
                      ? () => context.push(
                          AppRoutes.operationTransferInfo,
                          extra: state.operation,
                        )
                      : null,
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}