import 'package:equatable/equatable.dart';

abstract class VoucherEvent extends Equatable {
  const VoucherEvent();
  @override
  List<Object?> get props => [];
}

class VoucherFilePicked extends VoucherEvent {
  final String filePath;
  final int fileSizeBytes;
  const VoucherFilePicked(this.filePath, this.fileSizeBytes);

  @override
  List<Object?> get props => [filePath, fileSizeBytes];
}

class VoucherSubmitted extends VoucherEvent {
  const VoucherSubmitted();
}