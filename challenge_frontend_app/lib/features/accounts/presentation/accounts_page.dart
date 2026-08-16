import 'package:flutter/material.dart';

class AccountsPage extends StatefulWidget {
  const new({super.key});

  @override
  State<AccountsPage> createState() => _AccountsPageState();
}

class _AccountsPageState extends State<AccountsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cuentas'),
      ),
      body: const Center(
        child: Text('Cuentas Page'),
      ),
    );
  }
}