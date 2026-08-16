class AppRoutes {

  static const login = '/login';
  static const onboardingPersonalData = '/onboarding/personal-data';
  static const onboardingSuccess = '/onboarding/success';

  static const home = '/home';
  static const history = '/history';
  static const accounts = '/accounts';
  static const koinks = '/koinks';
  static const profile = '/profile';
  static const addBankAccount = '/accounts/add';

  // Stepper de transacción: Completa -> Transfiere -> Constancia
  static const operationCompleteData = '/transaction/complete';
  static const operationTransferInfo = '/transaction/transfer-info';
  static const operationAttachVoucher = '/transaction/voucher';
  static const operationCreated = '/transaction/created';
}