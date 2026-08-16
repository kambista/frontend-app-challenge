# Kambista — Frontend App Challenge

Aplicación Flutter que implementa los módulos de **Autenticación**, **Onboarding**,
**Transacciones (calculadora + flujo de operación)** y **Cuentas bancarias**, siguiendo
Clean Architecture y BLoC como gestor de estado.

---

## 🚀 Instrucciones para levantar el proyecto

### Requisitos previos

- Flutter SDK `>=3.47.0` (channel stable)
- Dart SDK `>=3.13.0`
- Android Studio / Xcode configurados (según plataforma de destino)
- Un emulador/dispositivo con arquitectura **x86_64** o **arm64-v8a** (evitar imágenes `x86` puras, generan errores al cargar librerías nativas)

Verificar el entorno:

```bash
flutter doctor -v
```

### 1. Instalar dependencias

```bash
flutter pub get
```

### 2. Correr la aplicación

```bash
flutter run
```

O especificando un dispositivo puntual:

```bash
flutter devices
flutter run -d <device_id>
```

### 3. Correr los tests

Ejecución estándar:

```bash
flutter test
```

> **Nota sobre los mensajes en consola:**  
> Por defecto, Flutter utiliza el reportero compacto (`--reporter compact`), el cual sobrescribe la misma línea en consola durante la ejecución. Si deseas ver cada test listado línea por línea con su descripción completa y resultado:

```bash
flutter test --reporter expanded
```

Para incluir logs detallados (`stdout`/`print`):

```bash
flutter test -v
```


---

## 🏗️ Decisiones técnicas

### Arquitectura: Clean Architecture por feature

El proyecto se organiza en **features independientes** (`auth`, `onboarding`,
`transactions`, `bank_accounts, etc.`), cada una dividida en 3 capas:

```
lib/features/<feature>/
├── data/
│   ├── datasources/   # Fuente real de datos (HTTP, assets locales)
│   ├── models/        # DTOs que extienden las entities y parsean JSON
│   └── repositories/  # Implementación concreta del contrato del dominio
├── domain/
│   ├── entities/       # Modelos de negocio puros (sin dependencias de Flutter)
│   ├── repositories/   # Contratos (interfaces) que la capa data implementa
│   └── usecases/       # Una responsabilidad de negocio por clase
└── presentation/
    ├── bloc/            # Eventos, estados y lógica de UI
    ├── pages/           # Screens (Scaffold)
    └── widgets/         # Componentes específicos de la feature
```

Código compartido entre features vive en `lib/core/` (constantes, errores, red,
tema, validadores) y `lib/shared/` (widgets reutilizables, navegación, catálogos
usados por más de una feature, como bancos y orígenes de fondos).

**Por qué esta estructura:** aísla el dominio de negocio de Flutter y de la fuente
de datos concreta. Si mañana cambia el backend (por ejemplo, pasa a GraphQL), solo
se reescribe la capa `data` de cada feature — `domain` y `presentation` no se tocan.

### Gestión de estado: BLoC (con eventos explícitos)

Se usa `flutter_bloc` en toda la aplicación. Cada Bloc expone:

- Un archivo de **eventos** (`*_event.dart`) — acciones disparadas por la UI.
- Un archivo de **estado** (`*_state.dart`) — inmutable, comparado con `Equatable`.
- El **Bloc** (`*_bloc.dart`) — mapea eventos a nuevos estados vía `on<Event>()`.

**Por qué eventos explícitos y no solo Cubit:** cada cambio de estado queda
nombrado y trazable (`OperationTypeSelected`, `CurrenciesSwapped`,
`DestinationAccountSelected`, etc.), lo que facilita debug, testing con
`bloc_test`, y una futura integración de analíticas sin tocar la lógica interna
del Bloc.

### Inyección de dependencias: `get_it`

Se usa un único `ServiceLocator` (`lib/injection_container.dart`) que registra:

- **Singletons** (`registerLazySingleton`) para datasources, repositories y
  usecases — se instancian una sola vez y se reutilizan.
- **Factories** (`registerFactory` / `registerFactoryParam`) para Blocs que
  necesitan una instancia nueva por pantalla, o que requieren un parámetro de
  construcción (por ejemplo, `CompleteDataBloc` recibe la operación calculada
  en la calculadora como parámetro inicial).
- Una excepción: `BankAccountsBloc` se registra como singleton **y se provee en
  la raíz de la app** (`BlocProvider.value` en `main.dart`), porque las cuentas
  guardadas del usuario se consultan desde más de un módulo (Transacciones y
  Cuentas bancarias) y no existe un endpoint de persistencia en el challenge —
  el estado se mantiene en memoria durante la sesión.

### Navegación: `go_router` con `StatefulShellRoute`

El Bottom Bar (Inicio, Historial, Cuentas, Koinks, Perfil) se implementa con
`StatefulShellRoute.indexedStack`, que le da a cada tab su propio stack de
navegación independiente — si el usuario navega dentro de "Cuentas" y cambia a
"Inicio", al volver a "Cuentas" continúa donde lo dejó.


### Manejo de errores

Se definieron 3 capas de errores, siguiendo el patrón `Exception` (capa data) →
`Failure` (capa domain/presentation):

```
core/errors/
├── exceptions.dart   # ServerException, ApiException, NetworkException
└── failures.dart     # ServerFailure, ApiFailure, NetworkFailure, ValidationFailure
```

El cliente HTTP (`AppHttpClient`) centraliza la detección de errores de API: si
la respuesta tiene la forma `{ success: false, data: { name, title, message } }`,
lanza automáticamente una `ApiException` con el código intacto (`DUPLICATE_DNI`,
etc.). Esto significa que **cualquier código de error nuevo que el backend agregue
en el futuro funciona sin cambios de código** — solo la UI decide si le da un
tratamiento visual particular (por ejemplo, `OnboardingState.isDuplicateDni` pinta
el snackbar de un color distinto para ese caso puntual).

Se optó por **excepciones + try/catch** en lugar de `Either<Failure, Success>`
(programación funcional con `dartz`) para mantener el código más simple de
explicar y depurar, priorizando legibilidad sobre pureza funcional.

### Validaciones

Centralizadas en `core/utils/validators.dart`, con validación en tiempo real
(`AutovalidateMode.onUserInteraction`) en todos los formularios:

- Email, contraseña, nombre completo (sin números ni caracteres especiales).
- Documento de identidad según tipo: DNI (8 dígitos), CE (9 dígitos), Pasaporte
  (8 a 15 caracteres alfanuméricos).
- Teléfono (9 dígitos), fecha de nacimiento (formato + mayoría de edad).
- Número de cuenta bancaria (solo dígitos).

### Theming centralizado

- `AppColors` — paleta de colores de marca.
- `AppTextStyles` — estilos de texto nombrados semánticamente (`fieldLabel`,
  `link`, `button`, etc.), en vez de `TextStyle` sueltos repetidos por pantalla.
- `AppTheme` — `ThemeData` global que conecta ambos con los widgets de Material
  (`ElevatedButtonThemeData`, `InputDecorationTheme`, `CheckboxThemeData`, etc.),
  para que los widgets reutilizables (`PrimaryButton`, `CustomTextField`) hereden
  estilos por defecto sin necesidad de repetirlos en cada instancia.

### Consumo de API

Se consumen los 2 endpoints reales provistos por Kambista:

| Endpoint | Uso |
|---|---|
| `GET /v1/exchange/kambista/current` | Tasa de cambio vigente (`bid`/`ask`) |
| `GET /v1/exchange/calculates` | Cálculo de una operación (monto a recibir, ahorro estimado, validación `operate`) |

### Testing

El proyecto cuenta con un conjunto de pruebas automatizadas que cubren las capas clave de la arquitectura:

- **Domain (UseCases)**: `test/features/auth/domain/usecases/login_usecase_test.dart`
  - Verificación de la lógica de negocio del inicio de sesión (retorno exitoso de usuario y propagación de `ApiFailure`).
- **Presentation (BLoC)**: `test/features/transactions/presentation/bloc/calculator_bloc_test.dart`
  - Verificación con `bloc_test` de la secuencia de estados al cambiar monedas, pestañas de Compra/Venta y realizar swap de divisas.
- **Widgets**: `test/widget_test.dart`
  - Verificación del renderizado e inicialización básica del widget principal `KambistaApp`.

**Herramientas empleadas:**
- `mocktail` para simular repositorios y dependencias sin generación de código (`codegen`).
- `bloc_test` para aserciones declarativas sobre secuencias de estados emitidos por los Blocs.

**Comandos útiles para testing:**
```bash
# Ver cada test desglosado línea por línea con su descripción y resultado
flutter test --reporter expanded

# Ver salida detallada (incluyendo prints e información interna)
flutter test -v

# Ejecutar un archivo de test específico
flutter test test/features/transactions/presentation/bloc/calculator_bloc_test.dart
```

---

## 📦 Dependencias principales

| Paquete | Uso |
|---|---|
| `flutter_bloc` + `equatable` | Gestión de estado |
| `get_it` | Inyección de dependencias |
| `go_router` | Navegación declarativa |
| `http` | Cliente HTTP |
| `image_picker` / `file_picker` | Selección de imágenes y archivos (voucher) |
| `intl` | Formateo de fechas |
| `bloc_test` + `mocktail` | Testing |

---

## 🧭 Estructura de navegación

```
/login
/onboarding/personal-data
/onboarding/success

/home            ─┐
/history          │  Bottom Bar (StatefulShellRoute)
/accounts         │
/koinks           │
/profile         ─┘

/accounts/add

/transaction/complete        ─┐
/transaction/transfer-info    │  Stepper fuera del shell
/transaction/voucher          │
/transaction/created         ─┘
```
