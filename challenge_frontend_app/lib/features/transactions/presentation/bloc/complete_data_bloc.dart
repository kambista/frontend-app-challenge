import 'package:challenge_frontend_app/core/usecases/usecase.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/complete_data_state.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/usecases/get_banks_usecase.dart';
import 'package:challenge_frontend_app/shared/catalog/domain/usecases/get_source_funds_usecase.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CompleteDataBloc extends Bloc<CompleteDataEvent, CompleteDataState> {
  final GetBanksUseCase getBanksUseCase;
  final GetSourceFundsUseCase getSourceFundsUseCase;

  CompleteDataBloc({
    required this.getBanksUseCase,
    required this.getSourceFundsUseCase,
    required PendingOperation initialOperation,
  }) : super(CompleteDataState(operation: initialOperation)) {
    on<CompleteDataStarted>(_onStarted);
    on<SourceBankSelected>(_onSourceBankSelected);
    on<DestinationAccountSelected>(_onDestinationAccountSelected);
    on<SourceFundSelected>(_onSourceFundSelected);
  }

  Future<void> _onStarted(
    CompleteDataStarted event,
    Emitter<CompleteDataState> emit,
  ) async {
    emit(state.copyWith(status: CompleteDataStatus.loading));
    try {
      final banks = await getBanksUseCase(const NoParams());
      final funds = await getSourceFundsUseCase(const NoParams());
      emit(state.copyWith(
        status: CompleteDataStatus.ready,
        banks: banks,
        sourceFunds: funds,
      ));
    } catch (_) {
      emit(state.copyWith(status: CompleteDataStatus.error));
    }
  }

  void _onSourceBankSelected(
    SourceBankSelected event,
    Emitter<CompleteDataState> emit,
  ) {
    emit(state.copyWith(
      operation: state.operation.copyWith(sourceBankId: event.bankId),
    ));
  }

  void _onDestinationAccountSelected(
    DestinationAccountSelected event,
    Emitter<CompleteDataState> emit,
  ) {
    emit(state.copyWith(
      operation: state.operation.copyWith(destinationAccount: event.account),
    ));
  }

  void _onSourceFundSelected(
    SourceFundSelected event,
    Emitter<CompleteDataState> emit,
  ) {
    emit(state.copyWith(
      operation: state.operation.copyWith(sourceFundId: event.fundId),
    ));
  }
}