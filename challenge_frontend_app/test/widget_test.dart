import 'package:flutter_test/flutter_test.dart';
import 'package:challenge_frontend_app/main.dart';
import 'package:challenge_frontend_app/injection_container.dart' as di;

void main() {
  testWidgets('App initialization test', (WidgetTester tester) async {
    await di.init();
    await tester.pumpWidget(const KambistaApp());
    expect(find.byType(KambistaApp), findsOneWidget);
  });
}
