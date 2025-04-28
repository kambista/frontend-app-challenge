# Kambista App Challenge

## Descripción

Kambista App Challenge es una aplicación móvil creada para simular operaciones de cambio de divisas. La app incluye módulos como **login**, **onboarding**, **calculadora** y **operaciones de cambio de divisas**.

## Tecnologías Usadas

- **Zustand**: Manejo de estado global para gestionar los datos de la aplicación.
- **Native Wind**: Framework para estilizar la interfaz de usuario utilizando clases utilitarias.
- **Axios**: Librería para realizar solicitudes HTTP y consultas a la API.
- **React Hook Form**: Manejo eficiente de formularios.
- **Zod**: Validación de campos de formularios con seguridad de tipos.
- **React Native Bottom Tabs**: Barra de navegación inferior con iconos personalizados para la navegación entre pantallas.
- **Lucide**: Conjunto de iconos personalizados para la interfaz de usuario.
- **Modales personalizados**: Implementación de modales estilo BottomSheet simulando su comportamiento, debido a problemas con algunas librerías nativas.

## Instalación

1. Clona este repositorio:

    ```bash
    git clone [<URL_DEL_REPOSITORIO>](https://github.com/eliobrayan/frontend-app-challenge.git)
    ```

2. Navega al directorio de la aplicación:

    ```bash
    cd kambista-app-challenge
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Corre la aplicación en Android:

    ```bash
    npx expo run:android
    ```

## Estructura de la Aplicación

La aplicación está estructurada en varios módulos para facilitar el mantenimiento y la escalabilidad:

- **Login**: Módulo para el inicio de sesión de usuarios.
- **Onboarding**: Módulo de introducción y bienvenida para nuevos usuarios.
- **Calculadora**: Módulo para realizar operaciones de conversión de divisas.
- **Operaciones de Cambio de Divisas**: Módulo para realizar y consultar operaciones de cambio de divisas.

## Personalización y Estilo

La interfaz de usuario está completamente estilizada usando **Native Wind**, lo que proporciona un sistema de clases utilitarias similar a **TailwindCSS**, pero optimizado para React Native.
