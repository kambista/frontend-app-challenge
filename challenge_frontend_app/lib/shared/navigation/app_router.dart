import 'package:challenge_frontend_app/features/accounts/presentation/accounts_page.dart';
import 'package:challenge_frontend_app/features/auth/presentation/pages/login_page.dart';
import 'package:challenge_frontend_app/features/bank_accounts/presentation/pages/add_bank_account_page.dart';
import 'package:challenge_frontend_app/features/history/presentation/history_page.dart';
import 'package:challenge_frontend_app/features/koinks/presentation/koinks_page.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/pages/personal_data_page.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/pages/registration_success_page.dart';
import 'package:challenge_frontend_app/features/profile/presentation/profile_page.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/created_operation.dart';
import 'package:challenge_frontend_app/features/transactions/domain/entities/pending_operation.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/pages/attach_voucher_page.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/pages/calculator_page.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/pages/complete_data_page.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/pages/transaction_created_page.dart';
import 'package:challenge_frontend_app/features/transactions/presentation/pages/transfer_info_page.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:challenge_frontend_app/shared/navigation/bottom_nav_bar.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppRouter {
  
  static final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');

  static final GlobalKey<NavigatorState> _homeNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'home');
  static final GlobalKey<NavigatorState> _historyNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'history');
  static final GlobalKey<NavigatorState> _accountsNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'accounts');
  static final GlobalKey<NavigatorState> _koinksNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'koinks');
  static final GlobalKey<NavigatorState> _profileNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'profile');

  static final GoRouter router = GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: AppRoutes.login,
    debugLogDiagnostics: true,
    routes: [
      // ---------- AUTH ----------
      GoRoute(
        path: AppRoutes.login,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) => const LoginPage(),
      ),

      // ---------- ONBOARDING ----------
      GoRoute(
        path: AppRoutes.onboardingPersonalData,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) => const PersonalDataPage(),
      ),
      GoRoute(
        path: AppRoutes.onboardingSuccess,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) => const RegistrationSuccessPage(),
      ),
      GoRoute(
        path: AppRoutes.operationCompleteData,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) {
          final operation = state.extra as PendingOperation;
          return CompleteDataPage(operation: operation);
        },
      ),
      // ---------- AGREGAR CUENTA ----------
      GoRoute(
        path: AppRoutes.addBankAccount,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) => const AddBankAccountPage(),
      ),
      GoRoute(
        path: AppRoutes.operationTransferInfo,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) {
          final operation = state.extra as PendingOperation;
          return TransferInfoPage(operation: operation);
        },
      ),
      GoRoute(
        path: AppRoutes.operationAttachVoucher,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) {
          final operation = state.extra as PendingOperation;
          return AttachVoucherPage(operation: operation);
        },
      ),
      GoRoute(
        path: AppRoutes.operationCreated,
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state) {
          final created = state.extra as CreatedOperation;
          return TransactionCreatedPage(createdOperation: created);
        },
      ),
      // ---------- BOTTOM BAR ----------
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return BottomNavScaffold(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            navigatorKey: _homeNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.home,
                builder: (context, state) => const CalculatorPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _historyNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.history,
                builder: (context, state) => const HistoryPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _accountsNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.accounts,
                builder: (context, state) => const AccountsPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _koinksNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.koinks,
                builder: (context, state) => const KoinksPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _profileNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.profile,
                builder: (context, state) => const ProfilePage(),
              ),
            ],
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) =>
        Scaffold(body: Center(child: Text('Ruta no encontrada: ${state.uri}'))),
  );
}
