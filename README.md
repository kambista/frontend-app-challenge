# Prueba Técnica - Front-End Developer

# 📖 Documentación del Proyecto

## ⚙️ Requisitos para Ejecutar el Proyecto

Tener instalado Node.js >= 18 y Yarn >= 1.22.19.

### Instalar las dependencias

Iniciar el servidor de desarrollo:

```bash
yarn install
```

Asegurarse de tener configurado correctamente el entorno de Expo.

```bash
yarn start
```

Agregar el archivo `.env` en la raíz del proyecto con las variables de entorno necesarias. Usar el archivo `.env.example` como referencia (únicamente tiene la variable del base URL de la API).

```bash
BASE_URL="https://api.kambista.com/v1"
```

El `.apk` generado se encuentra en el repositorio como `kambista.apk`. Para ejcutarlo, seguir los siguientes pasos:

1. Descargar el archivo `kambista.apk` en el dispositivo móvil.
2. Habilitar la instalación de aplicaciones de fuentes desconocidas en la configuración del dispositivo.
3. Abrir el archivo `kambista.apk` y seguir las instrucciones para instalar la aplicación.
4. Una vez instalada, abrir la aplicación desde el menú de aplicaciones del dispositivo.
5. Iniciar sesión con las credenciales de prueba:
   - **Email**: john@gmail.com
   - **Contraseña**: 123456

**Nota**: Si en caso tienes problemas con el apk, puedes probar la descarga del siguiente enlace [KAMBISTA APK](https://drive.google.com/file/d/1ScAVFeokfWnSNeb1mKD1RXCwycRrdZgS/view?usp=sharing).

# 📚 Descripción del Proyecto

## 🚀 Tecnologías Utilizadas (Principales)

| Categoría     | Librerías y Herramientas                     |
| ------------- | -------------------------------------------- |
| Core          | Expo SDK 52.0.46 · React 18.3.1 · TypeScript |
| Estado Global | Zustand · React Query                        |
| Formularios   | React Hook Form + Yup                        |
| Estilos       | NativeWind (Tailwind CSS)                    |
| Utilidades    | Currency.js · Day.js · AsyncStorage          |
| Código limpio | ESLint · Prettier                            |
| Logging       | react-native-logs                            |
| Navegación    | Expo Router                                  |

## 🏗️ Estructura y Organización

- **Gestión de estado global**: Se utilizó **Zustand**, estructurando el estado de forma modular para manejar datos de usuario, transacciones y tasas de cambio.
- **Validaciones**: Implementadas con **React Hook Form** y **Yup** para validación reactiva de formularios.
- **Servicios**: Consumo de API encapsulado en **clases bajo patrón Singleton**, asegurando una única instancia de los servicios y un acceso centralizado a los endpoints.
- **Formato de datos**: Se usaron **Currency.js** para formateo de montos monetarios y **Day.js** para manejo de fechas.
- **Persistencia local**: Almacenamiento de mocks y datos importantes usando **AsyncStorage**.
- **Estilizado de clases**: Creación de una función `cn` personalizada combinando `clsx` y `tailwind-merge`, optimizando la gestión dinámica de clases Tailwind.

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
```

- **Logger personalizado**: Integración de react-native-logs para registro de eventos de la aplicación, facilitando la depuración.

## 🧩 Funcionalidades Implementadas

- **Login**: Formulario de autenticación con validaciones en tiempo real.

- **Onboarding**: Captura de datos personales, validaciones específicas (ej: duplicidad de DNI).

- **Conversor de Divisas**: Cálculo dinámico entre PEN y USD con tasas actualizadas en tiempo real mediante API simulada.

- **Creación de Operaciones**: Flujo completo para registrar, adjuntar voucher y visualizar resumen de transacción.

- **Gestión de Cuentas Bancarias**: Agregado de cuentas con validaciones específicas por tipo de cuenta y número.

- **Bottom Bar Navigation**: Navegación entre módulos principales usando barra inferior.

- **Manejo de Errores**:
  - Validaciones de formularios.
  - Captura y tratamiento de errores provenientes de APIs simuladas.

## 🏛️ Organización del Proyecto

El proyecto se divide en módulos claros para separar responsabilidades y mantener la escalabilidad:

### Estructura Principal

```plaintext
├── app
|   ├── index.tsx
|   ├── _layout.tsx
│   ├── (auth)
|   ├── (operations)
|   ├── (tabs)
│
├── modules
│   ├── auth
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   └── types
│   │
│   ├── home
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   │
│   ├── onboarding
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   │
│   └── transactions
│       ├── components
│       ├── hooks
│       ├── screens
│       ├── services
│       ├── types
│       └── utils
│
├── services
│   ├── api
│   └── queryClient.ts
│
├── components
├── hooks
├── types
├── utils
├── mocks
```

### 📦 Organización de Servicios

Cada servicio sigue el patrón **Singleton**, garantizando una única instancia activa y centralizando las llamadas a API o datos locales.

**Ejemplo de `AuthService`**:

```typescript
class AuthService {
  private static instance: AuthService;

  static getInstance() {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  async login(email: string, password: string) {
    const users = await storageInitializer.getUsers();
    // ... Validaciones de email y contraseña
  }
}

export const authService = AuthService.getInstance();
```

Este patrón asegura:

- Instancia única y controlada.
- Acceso uniforme a los métodos de servicios.

### 🛠️ Hook Personalizado para Mutations: useCustomMutation

Se creó un hook reutilizable para manejar mutations integrando automáticamente la gestión de errores y toasts de error, evitando repetición de código.

```typescript
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useCustomMutation(mutationOptions) {
  return useMutation({
    ...mutationOptions,
    onError: (error, variables, context) => {
      Toast.show({
        type: "error",
        text1: (error as IErrorResponse)?.data?.title ?? "Error",
        text2:
          (error as IErrorResponse)?.data?.message ??
          "Ocurrió un error inesperado"
      });

      if (mutationOptions.onError)
        mutationOptions.onError(error, variables, context);
    }
  });
}
```

Este hook permite:

- Centralizar manejo de errores para todas los mutations.
- Mostrar toasts automáticos en caso de error.
- Reducir código duplicado en todos los custom hooks de interacción con servicios.

**Ejemplo de uso en useGetCurrentExchange**:

```typescript
export const useGetCurrentExchange = () => {
  const mutation = useCustomMutation({
    mutationFn: () => exchangeService.getCurrentExchangeRate()
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
```

### ✅ Beneficios de esta arquitectura

- **Escalabilidad**: Fácil de agregar nuevos módulos y funcionalidades.
- **Mantenibilidad**: Código limpio, reutilizable y predecible.
- **Optimización de desarrollo**: Agiliza el manejo de errores, la validación de formularios y la gestión de estado global.
- **Buena experiencia de usuario**: Integración de loaders y toasts de feedback inmediato.

---

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

````

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
````
