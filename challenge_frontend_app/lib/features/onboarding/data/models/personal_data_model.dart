
import 'package:challenge_frontend_app/features/onboarding/domain/entities/personal_data.dart';

class PersonalDataModel extends PersonalData {
  const PersonalDataModel({
    required super.fullName,
    required super.documentType,
    required super.documentNumber,
    required super.phone,
    required super.birthDate,
    super.previousExchangePlace,
    required super.acceptedTerms,
    required super.acceptedDataPolicy,
  });

  factory PersonalDataModel.fromEntity(PersonalData entity) {
    return PersonalDataModel(
      fullName: entity.fullName,
      documentType: entity.documentType,
      documentNumber: entity.documentNumber,
      phone: entity.phone,
      birthDate: entity.birthDate,
      previousExchangePlace: entity.previousExchangePlace,
      acceptedTerms: entity.acceptedTerms,
      acceptedDataPolicy: entity.acceptedDataPolicy,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'fullName': fullName,
      'documentType': documentType.name.toUpperCase(),
      'documentNumber': documentNumber,
      'phone': phone,
      'birthDate': birthDate.toIso8601String(),
      if (previousExchangePlace != null)
        'previousExchangePlace': previousExchangePlace,
      'acceptedTerms': acceptedTerms,
      'acceptedDataPolicy': acceptedDataPolicy,
    };
  }
}
