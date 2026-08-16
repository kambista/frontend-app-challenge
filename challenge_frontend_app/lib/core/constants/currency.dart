enum Currency {
  usd('USD', 'Dólares'),
  pen('PEN', 'Soles');

  final String code;
  final String label;
  const Currency(this.code, this.label);
}

enum OperationType {
  buy('Compra'),
  sell('Venta');

  final String label;
  const OperationType(this.label);
}