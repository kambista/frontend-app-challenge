# Prueba Técnica - Front-End Developer

## 🚀 Instalación y Ejecución

### 📦 Método 1: Instalación con APK (Producción)

1. Descargar el archivo `.apk` desde la raíz del repositorio
2. Transferir al dispositivo Android
3. Habilitar "Fuentes desconocidas" en Ajustes > Seguridad
4. Ejecutar el archivo APK e instalar
5. Abrir la aplicación

### 💻 Método 2: Entorno de Desarrollo

#### 📋 Requisitos Previos

- Node.js v18+
- npm v9+
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Dispositivo físico con [Expo Go](https://expo.dev/client) o emulador configurado

##### Dispositivo físico con Expo Go o emulador configurado

🔧 Configuración Inicial

```bash
# Clonar repositorio
git clone https://github.com/edu-rz/frontend-app-challenge.git
cd frontend-app-challenge

# Cambiar a rama de desarrollo
git checkout eduardo-ramon

# Instalar dependencias
cd kambista
npm install
```

⚙️ Variables de Entorno

Crear archivo .env en la raíz del proyecto con:

```env
EXPO_PUBLIC_DEBUG=true
EXPO_PUBLIC_BASE_URL=https://api.kambista.com/v1/exchange/
```
- ℹ️ Nota: El archivo .env se incluye en el repositorio con fines prácticos, en un proyecto real, debe agregarse al .gitignore.


🏃 Ejecutar Proyecto
```bash
npm start
```

**Escanea el código QR con Expo Go (dispositivo físico)**


## 🛠 Stack Tecnológico Ampliado

| Categoría         | Tecnologías                      | Razón de Uso                                               |
| ----------------- | -------------------------------- | ---------------------------------------------------------- |
| **Core**          | Expo · React Native · TypeScript | Requisito de Kambista                                      |
| **Estilos**       | NativeWind                       | Requisito de Kambista                                      |
| **Estado Global** | Zustand                          | Requisito de Kambista                                      |
| **API**           | Axios                            | Requisito de Kambista                                      |
| **Formularios**   | Formik + Yup                     | Manejo eficiente de formularios con validación declarativa |
| **Navegación**    | Expo Navigation                  | Solución estándar para navegación en React Native          |
| **Feedback UI**   | React Native Toast Message       | Notificaciones toast para feedback al usuario              |
| **Bottom Sheet**  | @gorhom/bottom-sheet             | Implementación de bottom sheets interactivas               |
| **Icons**         | @expo/vector-icons               | Librería completa de iconos                                |
| **Animaciones**   | React Native Reanimated          | Animaciones del aplicativo                                 |


## 📂 Estructura del Proyecto

```bash
/src
  /app          # Flujo de pantallas utilizando Expo Navigation
  /assets       # Imágenes y tipografía
  /components   # Componentes reutilizables
  /config       # Configuración de librerías (React Native Toast Message)
  /constants    # Constantes
  /hooks        # Custom hooks
  /lib          # Configuración de Axios
  /models       # Definiciones de entidades
  /screens      # Pantallas principales
  /services     # Lógica de APIs
  /stores       # Estados globales (Zustand)
  /utils        # Funciones utilitarias (Impresión en consola y Toast's)
```

## ✅ Funcionalidades Implementadas

- 🔐 Autenticación: Inicio y registro de sesión con validaciones en tiempo real. Incluye persistencia de sesión.
- 💱 Transacciones: Flujo de creación de transacción, bottom drawer, subida de voucher, entre otros.
- 🎨 UI/UX Features: Bottom navigation animada, feedback visual como toast notifications y validación en tiempo real.


<br/><br/><br/>
---
<br/><br/><br/>


## 📱 Introducción

Este reto técnico consiste en desarrollar una aplicación de conversión de divisas con autenticación, siguiendo los diseños proporcionados en este [Figma](https://www.figma.com/design/0r7lOY04Vv3Ht9UJItO7yX/Prueba?node-id=0-1&node-type=canvas&t=xY3A9Vp4Xe4zmQCW-0).

### 🔧 Stack Tecnológico

| Categoría | Tecnologías                      |
| --------- | -------------------------------- |
| Core      | Expo · React Native · TypeScript |
| Estilos   | NativeWind                       |
| Estado    | Zustand o Context API            |
| API       | Axios o React Query              |

## 🎯 Objetivos de Evaluación

**Calidad de código**: Arquitectura limpia, modularización y buenas prácticas  
**Fidelidad al diseño**: Fidelidad y creatividad en la resolución de los requerimientos de diseño  
**Performance**: Componentes optimizados y manejo eficiente de estado.  
**Mantenibilidad**: Prioriza legibilidad y escalabilidad, con estructura de archivos clara y consistente.

## 📋 Requerimientos funcionales

### 🔐 Módulo de Autenticación

**Pantallas**:

- **Login**
  - Formulario para el inicio de sesión de los usuarios.
  - Validación de campos en tiempo real

### 🔐 Módulo de Onboarding

- **Datos personales**

  - Formulario para completar los datos personales del usuario
  - Validación de campos en tiempo real
  - Manejo de errores específicos (ej: DNI duplicado)

  ```json
  // Ejemplo de error en servicio
  {
    "success": false,
    "data": {
      "name": "DUPLICATE_DNI",
      "title": "DNI en uso",
      "message": "El número de documento registrado ya está en uso."
    }
  }
  ```

- **Registro exitoso**
  - Vista para indicar que todos los datos son correctos.

### 💱 Módulo de Transacciones

**Pantalla principal**:

- Calculadora PEN ↔ USD
- Consumo de API simulada para calcular una operación
- Consumo de API simulada para obtener datos de tipo de cambio
- Manejo de tasas de cambio dinámicas
- Cálculos en tiempo real

**Crear una operación**:

- Resumen de la operación creada.
- Se deben seleccionar los bancos y el origen de fondos de acuerdo a mock anexo.

**Datos de transferencia**:

- Datos de la cuenta bancaria de Kambista.

**Adjuntar voucher de depósito**:

- Formulario para adjuntar voucher bancario del depósito efectuado.

**Transacción creada**:

- Resumen de la operación creada.

### 💱 Módulo de Cuentas bancarias

**Agregar cuenta**:

- Formulario para agregar cuenta bancaria con:  
   _Selector de banco_ (usar mock proporcionado)  
   _Tipo de cuenta_ (ahorro/crédito)  
   _Número de cuenta_ (validación: solo dígitos)
- Validación de campos en tiempo real
- Ver listado de bancos a agregar en mock anexo.

### 🟰 Navegación

Implementar un **Bottom Bar** para cambiar entre módulos principales

### 🚨 Manejo de errores

### Estrategias a Implementar

1. **Errores generales de los Formularios**:
   - Validación en tiempo real para:
     - Formato de email correcto.
     - Nombre sin caracteres especiales ni números.
     - Formato de documento de identificación acorde a DNI (8 dígitos), CE (9 dígitos), PASAPORTE (de 8 a 15 caracteres)
     - Teléfono (9 dígitos)
     - Fecha de nacimiento (Solo registro valido para mayores de edad)
     - Número de cuenta bancaria solo dígitos.
2. **Errores de API**:

- Considerar errores en servicios como:
  - Número de documento o celular en uso
  - Error general en la respuesta del servicio.

```typescript
interface APIError {
  success: false;
  data: {
    name: "DUPLICATE_DNI" | "INVALID_PHONE" | "SERVER_ERROR"; // Ejemplos
    title: string;
    message: string;
  };
}
```

## ⚙️ Requisitos Técnicos

### 🛠️ Configuración

- NativeWind para estilos
- Tipado estricto con TypeScript
- Simulación de API usando Axios o React Query.
- Gestión del estado global usando Context API o Zustand.

### 🧩 Componentes y vistas

- Reutilización de UI
- Props bien tipadas
- Simulación de calculadora de divisas con API de Kambista.
- Navegación fluida entre pantallas

### 🌐 Gestión de Estado

- Manejo de estado global para:
  - Datos de una transacción
  - Tasas de cambio

## Simulación de la API

1. Endpoint para obtener el tipo de cambio:

```
https://api.kambista.com/v1/exchange/kambista/current
```

2. Endpoint para la calculadora:

```
https://api.kambista.com/v1/exchange/calculates?originCurrency=PEN&destinationCurrency=USD&amount={cantidad}&active=S
```

## Mocks de data adicional

Se incluyen dos archivos JSON con datos de prueba:

1. **`bankAccounts.json`**

   - Listado completo de bancos
   - Uso:
     - Selector de banco al agregar cuenta
     - Elección de entidad financiera en operaciones

2. **`sourceFunds.json`**
   - Listado de orígenes de fondos
   - Uso:
     - Selector al crear operaciones

> Los archivos se encuentran en `/mocks`.

## 📤 Entrega

### 🔗 Repositorio Github

1. Hacer fork del repositorio: [frontend-app-challenge](https://github.com/USERNAME/frontend-app-challenge)
2. Clonar el fork:
   ```
   git clone git@github.com:USERNAME/FORKED-PROJECT.git
   ```
3. Crear un nuevo branch con tu nombre:
   ```
   git checkout -b {nombre-apellido}
   ```
4. Realizar commits con mensajes semánticos
5. Documentar en README.md instrucciones de ejecución
6. Crear un Pull Request y notificar a talentohumano@kambista.com

### 📦 APK

Generar y adjuntar un archivo APK usando Expo

## 🏆 Criterios de Evaluación

- Calidad de código
- Buenas prácticas de programación
- Manejo adecuado de errores

## 💡 Bonus (Opcional)

- Animaciones
- Agregar en la documentación (README.md) las decisiones técnicas relevantes

---

Para cualquier duda o consulta, por favor contactar a talentohumano@kambista.com
