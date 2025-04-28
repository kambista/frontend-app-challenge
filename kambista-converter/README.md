---

# 📱 Kambista Converter - Mobile App

**Kambista Converter** es una app móvil en React Native + Expo para gestionar conversión de divisas, usuarios, cuentas bancarias y transacciones simuladas.

---

## 🚀 Tecnologías principales

- **React Native** + **Expo**
- **Zustand** → Estado global
- **Axios** + **Axios Mock Adapter** → HTTP y mocks de APIs
- **AsyncStorage** → Almacenamiento local
- **NativeWind** + **TailwindCSS** → Estilizado rápido
- **Expo Document Picker** → Subida de archivos
- **Expo Clipboard** → Copiar datos
- **UUID** → Generación de IDs únicos

---

## 🧩 Funcionalidades principales

- Registro y login de usuarios simulados.
- Creación y listado de cuentas bancarias.
- Envío de evidencia (documentos).
- Catálogo de bancos y fuentes de fondos.

---

## 📂 Mock API

Archivo principal: `/api/mock.ts`

Simula:
- Registro `POST /onboarding/register`
- Login `POST /auth/login`
- Wallets `GET /user/wallets` y `POST /user/wallets`
- Bancos y fuentes de fondos `GET /catalog/*`

> 📂 La carpeta `mocks/` con los archivos JSON fue movida **dentro del proyecto** para mayor facilidad.

---

## 🧑‍💻 Datos de usuario por defecto

| Email               | Contraseña      |
|---------------------|-----------------|
| ejemplo@mail.com     | Contraseña123    |

Usuarios nuevos toman el **primer nombre** del registro + `@mail.com` como email.

---

## 🛠 Instalación

```bash
npm install
npm run start
```

---

## 📋 Notas
- Todo el backend es local usando `axios-mock-adapter`.
- Los datos persisten en `AsyncStorage`.
- Email generado automáticamente en el registro.

---

## 🎯 **Resumen**

```md
# Proyecto: Kambista Converter

- App en React Native + Expo
- Estado global: Zustand
- HTTP + Mock: Axios + Axios Mock Adapter
- Almacenamiento: AsyncStorage
- Estilos: NativeWind + Tailwind
- Subida de archivos: Expo Document Picker
- Copiar datos: Expo Clipboard

# Mock API
- /api/mock.ts controla: login, registro, wallets, bancos
- Usa datos locales de /mocks/
- Usuarios nuevos → primer nombre + @mail.com, contraseña fija Contraseña123
- Usuario demo: ejemplo@mail.com / Contraseña123
- Wallets se guardan enmascarando los 4 últimos dígitos

# Instalación
npm install
npm run start
```

---