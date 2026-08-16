import 'package:challenge_frontend_app/core/constants/exchange_places.dart';
import 'package:challenge_frontend_app/core/theme/app_colors.dart';
import 'package:challenge_frontend_app/core/theme/app_text_styles.dart';
import 'package:challenge_frontend_app/core/utils/validators.dart';
import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_bloc.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_event.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_state.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_dropdown_field.dart';
import 'package:challenge_frontend_app/shared/widgets/custom_text_field.dart';
import 'package:challenge_frontend_app/shared/widgets/date_picker_field.dart';
import 'package:challenge_frontend_app/shared/widgets/info_banner.dart';
import 'package:challenge_frontend_app/shared/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:go_router/go_router.dart';

class PersonalDataForm extends StatefulWidget {
  const PersonalDataForm({super.key});

  @override
  State<PersonalDataForm> createState() => _PersonalDataFormState();
}

class _PersonalDataFormState extends State<PersonalDataForm> {
  final _formKey = GlobalKey<FormState>();

  final _fullNameController = TextEditingController();
  final _documentNumberController = TextEditingController();
  final _phoneController = TextEditingController();
  final _birthDateController = TextEditingController();

  DocumentType? _documentType;
  String? _previousExchangePlace;
  bool _acceptedTerms = false;
  bool _acceptedDataPolicy = false;

  @override
  void dispose() {
    _fullNameController.dispose();
    _documentNumberController.dispose();
    _phoneController.dispose();
    _birthDateController.dispose();
    super.dispose();
  }

  void _submit(BuildContext context) {
    final isFormValid = _formKey.currentState?.validate() ?? false;

    if (!isFormValid || !_acceptedTerms || !_acceptedDataPolicy) {
      if (!_acceptedTerms || !_acceptedDataPolicy) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Debes aceptar los términos y la política de datos.'),
          ),
        );
      }
      return;
    }

    final birthDate = DateFormat('dd/MM/yyyy').parse(_birthDateController.text);

    context.read<OnboardingBloc>().add(
      OnboardingSubmitted(
        PersonalData(
          fullName: _fullNameController.text.trim(),
          documentType: _documentType!,
          documentNumber: _documentNumberController.text.trim(),
          phone: _phoneController.text.trim(),
          birthDate: birthDate,
          previousExchangePlace: _previousExchangePlace,
          acceptedTerms: _acceptedTerms,
          acceptedDataPolicy: _acceptedDataPolicy,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<OnboardingBloc, OnboardingState>(
      listener: (context, state) {
        if (state.status == OnboardingStatus.error && state.failure != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              backgroundColor: state.isDuplicateDni ? AppColors.warning : AppColors.error,
              content: Text(state.failure!.message),
            ),
          );
          context.read<OnboardingBloc>().add(const OnboardingErrorCleared());
        }
        if (state.status == OnboardingStatus.success) {
          context.push(AppRoutes.onboardingSuccess);
        }
      },
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CustomTextField(
              controller: _fullNameController,
              label: 'Nombres completos',
              hintText: 'Escribe tus nombres y apellidos',
              validator: Validators.fullName,
            ),
            const SizedBox(height: 16),
            const Text('Documento', style: AppTextStyles.fieldLabel),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: CustomDropdownField<DocumentType>(
                    label: '',
                    hintText: 'Tipo',
                    value: _documentType,
                    items: DocumentType.values,
                    itemLabel: (type) => type.label,
                    onChanged: (value) {
                      setState(() => _documentType = value);
                    },
                    validator: (value) => value == null ? 'Selecciona un tipo' : null,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: CustomTextField(
                    controller: _documentNumberController,
                    label: '',
                    hintText: 'N° de documento',
                    keyboardType: TextInputType.number,
                    validator: (value) => Validators.documentNumber(value, _documentType),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const InfoBanner(
              message:
                'Tu documento de identidad debe coincidir con tus datos '
                'para evitar inconvenientes al momento de hacer una '
                'primera operación',
              variant: InfoBannerVariant.info,
            ),
            const SizedBox(height: 16),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: CustomTextField(
                    controller: _phoneController,
                    label: 'Celular',
                    hintText: 'N° de celular',
                    keyboardType: TextInputType.phone,
                    validator: Validators.phone,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DatePickerField(
                    controller: _birthDateController,
                    label: 'Fecha de nacimiento',
                    hintText: 'DD/MM/AAAA',
                    validator: Validators.birthDate,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            CustomDropdownField<String>(
              label: '¿Donde cambiabas antes? (Opcional)',
              hintText: 'Último lugar de cambio',
              value: _previousExchangePlace,
              items: ExchangePlaces.options,
              itemLabel: (place) => place,
              onChanged: (value) {
                setState(() => _previousExchangePlace = value);
              },
            ),
            const SizedBox(height: 20),
            CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              controlAffinity: ListTileControlAffinity.leading,
              value: _acceptedTerms,
              onChanged: (value) => setState(() => _acceptedTerms = value ?? false),
              title: RichText(
                text: const TextSpan(
                  style: AppTextStyles.bodyMedium,
                  children: [
                    TextSpan(text: 'He leído y acepto los '),
                    TextSpan(
                      text: 'Términos y condiciones',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              controlAffinity: ListTileControlAffinity.leading,
              value: _acceptedDataPolicy,
              onChanged: (value) => setState(() => _acceptedDataPolicy = value ?? false),
              title: RichText(
                text: const TextSpan(
                  style: AppTextStyles.bodyMedium,
                  children: [
                    TextSpan(text: 'Acepto de manera expresa e informada la '),
                    TextSpan(
                      text:
                          'Política de Tratamiento de datos personales de Kambista',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            BlocBuilder<OnboardingBloc, OnboardingState>(
              builder: (context, state) {
                return PrimaryButton(
                  label: 'REGISTRARME',
                  isLoading: state.status == OnboardingStatus.loading,
                  onPressed: () => _submit(context),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}