import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_event.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/bloc/bank_accounts_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BankAccountsBloc extends Bloc<BankAccountsEvent, BankAccountsState> {
  BankAccountsBloc() : super(const BankAccountsState()) {
    on<BankAccountAdded>((event, emit) {
      emit(state.copyWith(accounts: [...state.accounts, event.account]));
    });
  }
}