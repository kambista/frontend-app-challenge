class Validators {

  static String? email(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'El correo es obligatorio.';
    }
    final regex = RegExp(r'^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,4}$');
    if (!regex.hasMatch(value.trim())) {
      return 'Ingresa un correo válido.';
    }
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return 'La contraseña es obligatoria.';
    }
    if (value.length < 6) {
      return 'Debe tener al menos 6 caracteres.';
    }
    return null;
  }

  static String? notEmpty(String? value, {String fieldName = 'Este campo'}) {
    if (value == null || value.trim().isEmpty) {
      return '$fieldName es obligatorio.';
    }
    return null;
  }

  /// Nombre completo: solo letras y espacios (incluye tildes y ñ).
  static String? fullName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'El nombre es obligatorio.';
    }
    final regex = RegExp(r'^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$');
    if (!regex.hasMatch(value.trim())) {
      return 'El nombre no debe tener números ni caracteres especiales.';
    }
    if (value.trim().split(RegExp(r'\s+')).length < 2) {
      return 'Ingresa nombres y apellidos.';
    }
    return null;
  }

  /// Número de documento según tipo. DNI: 8 dígitos, CE: 9 dígitos,
  /// Pasaporte: 8 a 15 caracteres alfanuméricos.
  static String? documentNumber(String? value, DocumentType? type) {
    if (value == null || value.trim().isEmpty) {
      return 'El número de documento es obligatorio.';
    }
    if (type == null) {
      return 'Selecciona el tipo de documento.';
    }
    final trimmed = value.trim();
    switch (type) {
      case DocumentType.dni:
        if (!RegExp(r'^\d{8}$').hasMatch(trimmed)) {
          return 'El DNI debe tener 8 dígitos.';
        }
        break;
      case DocumentType.ce:
        if (!RegExp(r'^\d{9}$').hasMatch(trimmed)) {
          return 'El CE debe tener 9 dígitos.';
        }
        break;
      case DocumentType.passport:
        if (!RegExp(r'^[a-zA-Z0-9]{8,15}$').hasMatch(trimmed)) {
          return 'El pasaporte debe tener entre 8 y 15 caracteres.';
        }
        break;
    }
    return null;
  }

  /// Teléfono: 9 dígitos.
  static String? phone(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'El celular es obligatorio.';
    }
    if (!RegExp(r'^\d{9}$').hasMatch(value.trim())) {
      return 'El celular debe tener 9 dígitos.';
    }
    return null;
  }

  /// Fecha de nacimiento en formato DD/MM/AAAA, solo mayores de edad.
  static String? birthDate(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'La fecha de nacimiento es obligatoria.';
    }
    final regex = RegExp(r'^(\d{2})/(\d{2})/(\d{4})$');
    final match = regex.firstMatch(value.trim());
    if (match == null) {
      return 'Formato inválido. Usa DD/MM/AAAA.';
    }
    final day = int.parse(match.group(1)!);
    final month = int.parse(match.group(2)!);
    final year = int.parse(match.group(3)!);

    DateTime parsedDate;
    try {
      parsedDate = DateTime(year, month, day);
      if (parsedDate.day != day || parsedDate.month != month) {
        return 'La fecha ingresada no es válida.';
      }
    } catch (_) {
      return 'La fecha ingresada no es válida.';
    }

    if (parsedDate.isAfter(DateTime.now())) {
      return 'La fecha no puede ser futura.';
    }

    final age = _calculateAge(parsedDate);
    if (age < 18) {
      return 'Debes ser mayor de edad para registrarte.';
    }
    return null;
  }

  static int _calculateAge(DateTime birthDate) {
    final now = DateTime.now();
    int age = now.year - birthDate.year;
    if (now.month < birthDate.month ||
        (now.month == birthDate.month && now.day < birthDate.day)) {
      age--;
    }
    return age;
  }
}

enum DocumentType {
  dni('DNI'),
  ce('CE'),
  passport('PASAPORTE');

  final String label;
  const DocumentType(this.label);
}