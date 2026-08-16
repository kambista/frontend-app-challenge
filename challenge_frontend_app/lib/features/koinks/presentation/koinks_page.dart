import 'package:flutter/material.dart';

class KoinksPage extends StatefulWidget {
  const new({super.key});

  @override
  State<KoinksPage> createState() => _KoinksPageState();
}

class _KoinksPageState extends State<KoinksPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Koinks'),
      ),
      body: const Center(
        child: Text('Koinks Page'),
      ),
    );
  }
}