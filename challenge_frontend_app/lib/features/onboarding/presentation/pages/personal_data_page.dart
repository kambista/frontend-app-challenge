import 'package:challenge_frontend_app/features/onboarding/presentation/bloc/onboarding_bloc.dart';
import 'package:challenge_frontend_app/features/onboarding/presentation/widgets/personal_data_form.dart';
import 'package:challenge_frontend_app/injection_container.dart';
import 'package:challenge_frontend_app/shared/navigation/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class PersonalDataPage extends StatelessWidget {
  const PersonalDataPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Completa tus datos'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              context.push(AppRoutes.login);
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: BlocProvider(
            create: (_) => sl<OnboardingBloc>(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text.rich(
                  TextSpan(
                    text: 'Completa tus datos ',
                    style: Theme.of(context).textTheme.titleMedium,
                    children: const [
                      TextSpan(
                        text: 'como figuran en tu documento de identidad',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                const PersonalDataForm(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}