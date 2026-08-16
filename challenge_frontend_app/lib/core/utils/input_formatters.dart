import 'package:flutter/services.dart';

class DigitsOnlyFormatter extends FilteringTextInputFormatter {
  DigitsOnlyFormatter() : super.allow(RegExp(r'[0-9]'));
}

class CurrencyInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    if (newValue.text.isEmpty) {
      return newValue;
    }
    final regex = RegExp(r'^\d*\.?\d{0,2}$');
    if (regex.hasMatch(newValue.text)) {
      return newValue;
    }
    return oldValue;
  }
}
