import 'package:challenge_frontend_app/core/constants/api_constants.dart';
import 'package:challenge_frontend_app/core/constants/currency.dart';
import 'package:challenge_frontend_app/core/network/http_client.dart';
import 'package:challenge_frontend_app/features/transactions/data/models/calculation_result_model.dart';
import 'package:challenge_frontend_app/features/transactions/data/models/exchange_rate_model.dart';
import 'package:logger/logger.dart';

abstract class ExchangeRemoteDataSource {
  Future<ExchangeRateModel> getExchangeRate();

  Future<CalculationResultModel> calculate({
    required Currency originCurrency,
    required Currency destinationCurrency,
    required double amount,
  });
}

class ExchangeRemoteDataSourceImpl implements ExchangeRemoteDataSource {
  final AppHttpClient client;

  ExchangeRemoteDataSourceImpl(this.client);

  @override
  Future<ExchangeRateModel> getExchangeRate() async {
    final json = await client.get(ApiConstants.exchangeRateUrl);
    return ExchangeRateModel.fromJson(json);
  }

  @override
  Future<CalculationResultModel> calculate({
    required Currency originCurrency,
    required Currency destinationCurrency,
    required double amount,
  }) async {
    final url = '${ApiConstants.calculateUrl}'
        '?originCurrency=${originCurrency.code}'
        '&destinationCurrency=${destinationCurrency.code}'
        '&amount=$amount'
        '&active=S';

    Logger().d('Calculating operation: $url');

    final json = await client.get(url);
    Logger().d(json);
    return CalculationResultModel.fromJson(json);
  }
}