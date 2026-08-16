import 'package:challenge_frontend_app/core/utils/validators.dart';

class PersonalData {
  final String fullName;
  final DocumentType documentType;
  final String documentNumber;
  final String phone;
  final DateTime birthDate;
  final String? previousExchangePlace;
  final bool acceptedTerms;
  final bool acceptedDataPolicy;

  const PersonalData({
    required this.fullName,
    required this.documentType,
    required this.documentNumber,
    required this.phone,
    required this.birthDate,
    this.previousExchangePlace,
    required this.acceptedTerms,
    required this.acceptedDataPolicy,
  });
}