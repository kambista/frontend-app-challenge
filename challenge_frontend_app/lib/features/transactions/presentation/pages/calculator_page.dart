import 'dart:async';

import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_bloc.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/calculator_state.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/widgets/amount_currency_card.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/widgets/operation_type_tabs.dart';
import 'package:challenge_frontend_app/injection_container.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class CalculatorPage extends StatelessWidget {
  const CalculatorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => sl<CalculatorBloc>()..add(const CalculatorStarted()),
      child: const _CalculatorView(),
    );
  }
}

class _CalculatorView extends StatefulWidget {
  const _CalculatorView();

  @override
  State<_CalculatorView> createState() => _CalculatorViewState();
}

class _CalculatorViewState extends State<_CalculatorView> {
  Timer? _debounce;
  final _couponController = TextEditingController();

  void _onSendAmountChanged(BuildContext context, String value) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      if (!mounted) return;
      context.read<CalculatorBloc>().add(SendAmountChanged(value));
    });
  }

  void _showCurrencyPicker(BuildContext context, Currency current) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (sheetContext) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: Currency.values.map((c) {
              return ListTile(
                title: Text(c.label),
                trailing: c == current ? const Icon(Icons.check) : null,
                onTap: () {
                  context.read<CalculatorBloc>().add(SendCurrencyChanged(c));
                  Navigator.pop(sheetContext);
                },
              );
            }).toList(),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _couponController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: BlocConsumer<CalculatorBloc, CalculatorState>(
          listener: (context, state) {
            if (state.status == CalculatorStatus.error &&
                state.failure != null) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  backgroundColor: AppColors.error,
                  content: Text(state.failure!.message),
                ),
              );
            }
          },
          builder: (context, state) {
            if (state.status == CalculatorStatus.loading) {
              return const Center(child: CircularProgressIndicator());
            }            

            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
              child: Column(
                children: [
                  _Header(),
                  const SizedBox(height: 20),
                  OperationTypeTabs(
                    selected: state.operationType,
                    buyRate: state.exchangeRate?.buyRate ?? 0,
                    sellRate: state.exchangeRate?.sellRate ?? 0,
                    onChanged: (type) => context
                        .read<CalculatorBloc>()
                        .add(OperationTypeSelected(type)),
                  ),
                  const SizedBox(height: 20),
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Column(
                        children: [
                          AmountCurrencyCard(
                            label: '¿Cuánto envías?',
                            amountText: state.sendAmount,
                            currency: state.sendCurrency,
                            isEditable: true,
                            onAmountChanged: (value) => _onSendAmountChanged(context, value),
                            onCurrencyTap: () => _showCurrencyPicker(
                              context,
                              state.sendCurrency,
                            ),
                          ),
                          const SizedBox(height: 8),
                          AmountCurrencyCard(
                            label: 'Entonces recibes',
                            amountText: state.receiveAmount.toStringAsFixed(2),
                            currency: state.receiveCurrency,
                          ),
                        ],
                      ),
                      Row(                        
                        children: [
                          Expanded(
                            child: SizedBox()
                          ),
                          Expanded(
                            child: Row(
                              children: [                                
                                Expanded(
                                  flex: 2,
                                  child: GestureDetector(
                                    onTap: () => context.read<CalculatorBloc>().add(const CurrenciesSwapped()),
                                    child: Container(
                                      padding: const EdgeInsets.all(16),
                                      decoration: const BoxDecoration(
                                        color: Colors.white,
                                        shape: BoxShape.circle,
                                        boxShadow: [
                                          BoxShadow(color: Colors.black12, blurRadius: 6),
                                        ],
                                      ),
                                      child: const Icon(Icons.sync, size: 22),
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 1,
                                  child: SizedBox()
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _SavingsInfo(
                        label: 'Ahorro estimado:',
                        value: 'S/ ${state.estimatedSavings.toStringAsFixed(2)}',
                      ),
                      _SavingsInfo(
                        label: 'Koins',
                        value: '${state.koins}',
                        alignEnd: true,
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  _CouponField(controller: _couponController),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(Icons.star_border_outlined, size: 24, color: AppColors.primary),
                        Expanded(
                          child: Column(
                            children: [
                              Text(
                                '¿Monto mayor a \$5.000 o S/18.000?'                                
                              ),
                              Text(
                                '¡Aplica tu cupón y ahorra más!',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  decoration: TextDecoration.underline
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  PrimaryButton(
                    label: 'INICIAR OPERACIÓN',
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    onPressed: state.receiveAmount > 0
                        ? () => context.push(
                              AppRoutes.operationCompleteData,
                              extra: PendingOperation(
                                sendAmount: double.parse(state.sendAmount),
                                sendCurrency: state.sendCurrency,
                                receiveAmount: state.receiveAmount,
                                receiveCurrency: state.receiveCurrency,
                                couponCode: state.appliedCoupon,
                                exchangeRateUsed: state.currentRate,
                              ),
                            )
                        : null,
                  ),
                  const SizedBox(height: 12),
                  if (!state.canOperate && state.operateMessage.isNotEmpty) ...[
                    Text(
                      state.operateMessage,
                      style: AppTextStyles.bodySmall.copyWith(color: AppColors.error),
                    ),
                  ],
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(width: 40, height: 40),
        Row(
          children: [
            Image.asset('assets/images/logo.png', width: 25, height: 25),
            const SizedBox(width: 8),
            RichText(
              text: const TextSpan(
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                children: [
                  TextSpan(
                    text: 'Kambista', style: TextStyle(color: AppColors.primaryDark),
                  ),
                ],
              ),
            ),
          ],
        ),
        IconButton(
          icon: const Icon(Icons.logout),
          onPressed: () {
            context.push(AppRoutes.login);
          },
        ),
        
      ],
    );
  }
}

class _SavingsInfo extends StatelessWidget {
  final String label;
  final String value;
  final bool alignEnd;

  const _SavingsInfo({
    required this.label,
    required this.value,
    this.alignEnd = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment:
          alignEnd ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        Text(label,
            style: AppTextStyles.bodySmall.copyWith(color: AppColors.textSecondary)),
        const SizedBox(height: 4),
        Text(value, style: AppTextStyles.bodyLarge.copyWith(
          fontWeight: FontWeight.bold,
        )),
      ],
    );
  }
}

class _CouponField extends StatelessWidget {
  final TextEditingController controller;
  const _CouponField({required this.controller});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 2,
          child: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: 'Ingresa el cupón'),
          ),
        ),
        const SizedBox(width: 4),
        Expanded(
          flex: 1,
          child: SizedBox(
            height: 48,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryDark,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onPressed: () {
                final code = controller.text.trim();
                if (code.isNotEmpty) {
                  context.read<CalculatorBloc>().add(CouponApplied(code));
                }
              },
              child: const Text('APLICAR'),
            ),
          ),
        ),
      ],
    );
  }
}