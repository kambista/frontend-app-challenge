
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_bloc.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_state.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/pages/add_bank_account_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

Future<BankAccount?> showDestinationAccountSheet(
  BuildContext context, {
  required AccountCurrency currency,
}) {
  return showModalBottomSheet<BankAccount>(
    context: context,
    isScrollControlled: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
    ),
    builder: (sheetContext) {
      return BlocBuilder<BankAccountsBloc, BankAccountsState>(
        bloc: context.read<BankAccountsBloc>(),
        builder: (context, state) {
          final accounts = state.byCurrency(currency);
          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Selecciona tu cuenta destino',
                      style: AppTextStyles.title),
                  const Divider(height: 24),
                  ...accounts.map((account) => _AccountTile(
                        account: account,
                        onTap: () => Navigator.pop(sheetContext, account),
                      )),
                  if (accounts.isEmpty)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      child: Text(
                        'Aún no tienes cuentas registradas en esta moneda.',
                        style: AppTextStyles.bodyMedium
                            .copyWith(color: AppColors.textSecondary),
                      ),
                    ),
                  const SizedBox(height: 8),
                  OutlinedButton.icon(
                    onPressed: () async {
                      final newAccount = await Navigator.of(sheetContext).push<BankAccount>(
                        MaterialPageRoute(
                          builder: (_) => AddBankAccountPage(initialCurrency: currency),
                        ),
                      );
                      if (newAccount != null && sheetContext.mounted) {
                        Navigator.pop(sheetContext, newAccount);
                      }
                    },
                    icon: const Icon(Icons.add, color: AppColors.textPrimary),
                    label: const Text('Agregar cuenta'),
                    style: OutlinedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 52),
                      side: const BorderSide(color: AppColors.border),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      );
    },
  );
}

class _AccountTile extends StatelessWidget {
  final BankAccount account;
  final VoidCallback onTap;

  const _AccountTile({required this.account, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${account.alias} - ${account.bankAlias} - ${account.currencyCode}',
                    style: AppTextStyles.bodyLarge
                        .copyWith(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    account.maskedAccountNumber,
                    style: AppTextStyles.bodySmall
                        .copyWith(color: AppColors.textSecondary),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.textSecondary),
          ],
        ),
      ),
    );
  }
}