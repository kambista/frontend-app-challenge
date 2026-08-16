import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/core/utils/validators.dart';
import 'package:challenge_frontend_app/features/bank_accounts/domain/entities/bank_account.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_bloc.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_event.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_dropdown_field.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_text_field.dart';
import 'package:challenge_frontend_app/shared/widgets/info_banner.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

enum _AccountTypeOption {
  savings('Ahorros', AccountType.savings),
  checking('Crédito', AccountType.checking);

  final String label;
  final AccountType value;
  const _AccountTypeOption(this.label, this.value);
}


class AddBankAccountPage extends StatefulWidget {
  final AccountCurrency? initialCurrency;

  const AddBankAccountPage({super.key, this.initialCurrency});

  @override
  State<AddBankAccountPage> createState() => _AddBankAccountPageState();
}

class _AddBankAccountPageState extends State<AddBankAccountPage> {
  final _formKey = GlobalKey<FormState>();
  final _accountNumberController = TextEditingController();
  final _aliasController = TextEditingController();

  _AccountTypeOption? _accountType = _AccountTypeOption.savings;
  String? _selectedBankId;
  String? _selectedBankName;
  String? _selectedBankAlias;
  late AccountCurrency _currency =
      widget.initialCurrency ?? AccountCurrency.pen;
  bool _declaresOwnership = false;

  @override
  void dispose() {
    _accountNumberController.dispose();
    _aliasController.dispose();
    super.dispose();
  }

  void _save(BuildContext context) {
    final isValid = _formKey.currentState?.validate() ?? false;
    if (!isValid || _selectedBankId == null || !_declaresOwnership) {
      if (!_declaresOwnership) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Debes declarar que la cuenta es tuya.'),
          ),
        );
      }
      return;
    }

    final account = BankAccount(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      bankId: _selectedBankId!,
      bankName: _selectedBankName!,
      bankAlias: _selectedBankAlias!,
      accountType: _accountType!.value,
      currency: _currency,
      accountNumber: _accountNumberController.text.trim(),
      alias: _aliasController.text.trim(),
    );

    context.read<BankAccountsBloc>().add(BankAccountAdded(account));
    context.pop(account);
  }

  @override
  Widget build(BuildContext context) {
    final currencyLabel = _currency == AccountCurrency.pen ? 'soles' : 'dólares';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Completa los datos'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Agregar cuenta $currencyLabel',
                    style: AppTextStyles.headlineMedium),
                const SizedBox(height: 16),
                Text.rich(
                  TextSpan(
                    style: AppTextStyles.bodyMedium,
                    children: const [
                      TextSpan(text: 'La cuenta que registres '),
                      TextSpan(
                        text: 'debe estar a tu nombre',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      TextSpan(
                          text: ' (titular de este perfil en Kambista)'),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                CustomDropdownField<_AccountTypeOption>(
                  label: 'Tipo de cuenta bancaria',
                  value: _accountType,
                  items: _AccountTypeOption.values,
                  itemLabel: (o) => o.label,
                  onChanged: (value) => setState(() => _accountType = value),
                  validator: (v) => v == null ? 'Selecciona un tipo' : null,
                ),
                const SizedBox(height: 16),
                _BankSelector(
                  onSelected: (id, name, alias) {
                    setState(() {
                      _selectedBankId = id;
                      _selectedBankName = name;
                      _selectedBankAlias = alias;
                    });
                  },
                ),
                const SizedBox(height: 16),
                const InfoBanner(
                  message: 'Operamos en Lima con todos los bancos. Y en '
                      'provincia con el BCP y cuentas digitales Interbank.',
                ),
                const SizedBox(height: 20),
                Text('Moneda', style: AppTextStyles.fieldLabel),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: _CurrencyToggleButton(
                        label: 'SOLES',
                        isSelected: _currency == AccountCurrency.pen,
                        onTap: () =>
                            setState(() => _currency = AccountCurrency.pen),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _CurrencyToggleButton(
                        label: 'DÓLARES',
                        isSelected: _currency == AccountCurrency.usd,
                        onTap: () =>
                            setState(() => _currency = AccountCurrency.usd),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                CustomTextField(
                  controller: _accountNumberController,
                  label: 'Número de cuenta',
                  hintText: 'Escribe tu cuenta de destino',
                  keyboardType: TextInputType.number,
                  validator: (v) => Validators.notEmpty(
                    v,
                    fieldName: 'El número de cuenta',
                  ) ??
                      (!RegExp(r'^\d+$').hasMatch(v ?? '')
                          ? 'Solo se permiten dígitos.'
                          : null),
                ),
                const SizedBox(height: 16),
                CustomTextField(
                  controller: _aliasController,
                  label: 'Ponle nombre a tu cuenta',
                  hintText: 'Escribe un alias',
                  validator: (v) =>
                      Validators.notEmpty(v, fieldName: 'El alias'),
                ),
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  controlAffinity: ListTileControlAffinity.leading,
                  value: _declaresOwnership,
                  onChanged: (v) => setState(() => _declaresOwnership = v ?? false),
                  title: const Text('Declaro que esta cuenta es mía'),
                ),
                const SizedBox(height: 12),
                PrimaryButton(
                  label: 'GUARDAR CUENTA',
                  backgroundColor: AppColors.primaryLight,
                  onPressed: () => _save(context),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CurrencyToggleButton extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _CurrencyToggleButton({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryDark : Colors.white,
          border: Border.all(
            color: isSelected ? AppColors.primaryDark : AppColors.border,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: AppTextStyles.bodyMedium.copyWith(
            color: isSelected ? Colors.white : AppColors.textPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

class _BankSelector extends StatelessWidget {
  final void Function(String id, String name, String alias) onSelected;

  const _BankSelector({required this.onSelected});

  @override
  Widget build(BuildContext context) {

    return FutureBuilder(
      future: _loadBanks(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const LinearProgressIndicator();
        }
        final banks = snapshot.data!;
        return CustomDropdownField<_BankOption>(
          label: 'Entidad financiera',
          value: null,
          items: banks,
          itemLabel: (b) => b.name,
          onChanged: (bank) {
            if (bank != null) onSelected(bank.id, bank.name, bank.alias);
          },
          validator: (v) => v == null ? 'Selecciona un banco' : null,
        );
      },
    );
  }

  Future<List<_BankOption>> _loadBanks() async {
    return const [
      _BankOption(id: '1', name: 'Banco de Crédito del Perú', alias: 'BCP'),
      _BankOption(id: '2', name: 'Banco Internacional del Perú', alias: 'Interbank'),
      _BankOption(id: '3', name: 'BBVA Continental', alias: 'BBVA'),
      _BankOption(id: '4', name: 'BanBif', alias: 'BanBif'),
      _BankOption(id: '4', name: 'Scotiabank', alias: 'Scotiabank'),
    ];
  }
}

class _BankOption {
  final String id;
  final String name;
  final String alias;
  const _BankOption({required this.id, required this.name, required this.alias});
}