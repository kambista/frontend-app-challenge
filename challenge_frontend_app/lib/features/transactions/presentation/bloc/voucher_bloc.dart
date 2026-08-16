import 'package:challenge_frontend_app/core/errors/failures.dart';
import 'package:challenge_frontend_app/features/transactions/domain/usecases/submit_voucher_usecase.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_event.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/bloc/voucher_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class VoucherBloc extends Bloc<VoucherEvent, VoucherState> {
  final SubmitVoucherUseCase submitVoucherUseCase;
  static const int maxFileSizeBytes = 10 * 1024 * 1024; // 10 MB

  VoucherBloc({
    required this.submitVoucherUseCase,
    required VoucherState initialState,
  }) : super(initialState) {
    on<VoucherFilePicked>(_onFilePicked);
    on<VoucherSubmitted>(_onSubmitted);
  }

  void _onFilePicked(VoucherFilePicked event, Emitter<VoucherState> emit) {
    if (event.fileSizeBytes > maxFileSizeBytes) {
      emit(state.copyWith(
        fileError: 'El archivo supera el tamaño máximo permitido (10 Mb).',
      ));
      return;
    }
    emit(state.copyWith(
      operation: state.operation.copyWith(voucherFilePath: event.filePath),
      fileError: null,
    ));
  }

  Future<void> _onSubmitted(
    VoucherSubmitted event,
    Emitter<VoucherState> emit,
  ) async {
    if (!state.canSubmit) return;
    emit(state.copyWith(status: VoucherStatus.submitting));
    try {
      final created = await submitVoucherUseCase(state.operation);
      emit(state.copyWith(
        status: VoucherStatus.success,
        createdOperation: created,
      ));
    } on Failure catch (failure) {
      emit(state.copyWith(status: VoucherStatus.error, failure: failure));
    }
  }
}