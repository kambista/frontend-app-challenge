# Prueba Técnica - Front-End Developer

## 📱 Introducción

Este reto técnico consiste en desarrollar una aplicación de conversión de divisas con autenticación, siguiendo los diseños proporcionados en este [Figma](https://www.figma.com/design/0r7lOY04Vv3Ht9UJItO7yX/Prueba?node-id=0-1&node-type=canvas&t=xY3A9Vp4Xe4zmQCW-0).
  
### 🔧 Stack Tecnológico
*Experiencia sólida en **al menos uno** de los siguientes entornos:*

### 📱 React Native

| Categoría | Tecnologías                    |
|-----------|--------------------------------|
| Core      | Expo · React Native · TypeScript |
| Estilos   | NativeWind                     |
| Estado    | Redux · Zustand · Context      |
| API       | Axios o React Query            |

### 🐦 Flutter

| Categoría | Tecnologías                          |
|-----------|--------------------------------------|
| Core      | Flutter · Dart                       |
| Estilos   | Material 3 (built-in) · ThemeData    |
| Estado    | BLoC · Riverpod · Provider           |
| API       | Dio o http/retrofit                  |

## 🎯 Objetivos de Evaluación

**Calidad de código**: Arquitectura limpia, modularización y buenas prácticas  
**Fidelidad al diseño**: Fidelidad y creatividad en la resolución de los requerimientos de diseño  
**Performance**: Componentes optimizados y manejo eficiente de estado.    
**Mantenibilidad**:  Prioriza legibilidad y escalabilidad, con estructura de archivos clara y consistente.

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
        *Selector de banco* (usar mock proporcionado)   
        *Tipo de cuenta* (ahorro/crédito)   
        *Número de cuenta* (validación: solo dígitos)   
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
    name: 'DUPLICATE_DNI' | 'INVALID_PHONE' | 'SERVER_ERROR'; // Ejemplos
    title: string;
    message: string;
  };
}
``` 

## ⚙️ Requisitos Técnicos

### 🛠️ Configuración
- Sistema de estilos propio del framework (NativeWind / Material 3)
- Tipado estricto (TypeScript / Dart)
- Consumo de API con cliente HTTP y manejo de datos
- Gestión del estado global

### 🧩 Componentes y vistas
- Reutilización de UI (componentes / widgets)
- Props / parámetros bien tipados
- Simulación de calculadora de divisas con la API de Kambista
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
