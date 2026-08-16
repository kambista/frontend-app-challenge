import 'package:flutter/material.dart';

class HistoryPage extends StatefulWidget {
  const new({super.key});

  @override
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Historial de operaciones'),
      ),
      body: const Center(
        child: Text('Historial de operaciones'),
      ),
    );
  }
}