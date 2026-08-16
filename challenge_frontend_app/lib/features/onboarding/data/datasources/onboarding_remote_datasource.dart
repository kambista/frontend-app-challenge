import 'package:challenge_frontend_app/core/constants/api_constants.dart';
import 'package:challenge_frontend_app/core/network/http_client.dart';
import 'package:challenge_frontend_app/features/onboarding/data/models/personal_data_model.dart';

abstract class OnboardingRemoteDataSource {
  Future<void> submitPersonalData(PersonalDataModel data);
}

class OnboardingRemoteDataSourceImpl implements OnboardingRemoteDataSource {
  final AppHttpClient client;

  OnboardingRemoteDataSourceImpl(this.client);

  @override
  Future<void> submitPersonalData(PersonalDataModel data) async {
    await client.post(
      ApiConstants.personalDataUrl,
      body: data.toJson(),
    );
  }
}