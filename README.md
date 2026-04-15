## Prueba Técnica Front-End - Kambista

Este repositorio corresponde a la implementacion del reto tecnico de **frontend**.  
El objetivo principal de este README es documentar como ejecutar la app, que tecnologias se usaron y como se integra con la API para las pruebas.

## Stack Tecnologico (Frontend)

- Expo
- React Native
- TypeScript
- NativeWind
- Zustand
- Axios
- React Navigation

## Instrucciones de ejecucion (Frontend)

### Requisitos
- Node.js 18 o superior (LTS recomendado)
- npm
- Expo (via `npx`)

### Instalacion

```bash
npm install
```

### Variables de entorno

Crear un archivo `.env` en la raiz del proyecto con:

```bash
EXPO_PUBLIC_API_URL=https://own-api-kambista-production.up.railway.app/api/v1/
```

Tambien puedes guiarte por `.env.example`.

Notas:
- En emulador/dispositivo fisico, evita `localhost`; usa la IP LAN de tu PC.
- Si cambias variables `EXPO_PUBLIC_*`, reinicia el bundler:

```bash
npx expo start -c
```

### Ejecucion

```bash
npm start
```

Comandos por plataforma:

```bash
npm run android
npm run ios
npm run web
```

### Flujo para probar la app

Para probar la app, primero **registrate** (pantalla de registro; equivale a `POST /auth/register` en la API documentada mas abajo). Despues **inicia sesion** para obtener los tokens y seguir con el flujo protegido (catalogos, tipo de cambio, cuentas, etc.). Sin usuario registrado no podras completar el recorrido como usuario autenticado.

## API para la prueba tecnica

### A) API publica Kambista (referencia del challenge)

1. Tipo de cambio actual:
```
https://api.kambista.com/v1/exchange/kambista/current
```

2. Calculadora:
```
https://api.kambista.com/v1/exchange/calculates?originCurrency=PEN&destinationCurrency=USD&amount=<monto>&active=S
```

### B) Backend de apoyo (Express + Sequelize + MySQL)

Se creo un backend de apoyo con el proposito de mejorar la experiencia de usuario y permitir persistencia de datos en el flujo de la app. Esta API provee autenticacion JWT (access + refresh), catalogos de bancos y origenes de fondos, cuentas de usuario y proxy del tipo de cambio actual de Kambista.

Tecnologias usadas en el backend:
- Express
- Sequelize
- MySQL
- JWT

Formato de error alineado al challenge:

```json
{
  "success": false,
  "data": {
    "name": "ERROR_CODE",
    "title": "Titulo",
    "message": "Mensaje"
  }
}
```

#### Rutas `http://<host>:<PORT>/api/v1`

Header para rutas protegidas: `Authorization: Bearer <accessToken>`.

| Metodo | Ruta | Auth | Notas |
|--------|------|------|-------|
| `POST` | `/auth/register` | No | `email`, `password`, `nombresCompletos`, `tipoDocumento`, `numeroDocumento`, `celular`, `fechaNacimiento` |
| `POST` | `/auth/login` | No | `email`, `password` -> `user`, `accessToken`, `refreshToken` |
| `POST` | `/auth/refresh` | No | `refreshToken` |
| `POST` | `/auth/logout` | No | `refreshToken` |
| `GET` | `/auth/me` | Bearer | Perfil autenticado |
| `GET` | `/exchange/current` | Bearer | Proxy tipo cambio -> `ask`, `bid` |
| `GET` | `/exchange/calculate` | Bearer | Query: `originCurrency`, `destinationCurrency`, `amount`, `active`; reenvia a Kambista `calculates` -> `data` es el JSON crudo de la API publica |
| `GET` | `/banks` | Bearer | Catalogo de bancos |
| `GET` | `/source-funds` | Bearer | Catalogo de origen de fondos |
| `GET` | `/cuentas-usuario?userId=` | Bearer | Listado de cuentas |
| `POST` | `/cuentas-usuario` | Bearer | `userId`, `entidadId`, `tipoCuenta`, `numeroCuenta`, `moneda` (`PEN` \| `USD`), `alias`, opcional `esPropietario` |

Respuestas exitosas:

```json
{ "success": true, "data": {} }
```

#### Nota para React Native (cliente movil)

1. **Base URL**: `https://own-api-kambista-production.up.railway.app/api/v1/`.
2. **Sesion**: login -> guardar tokens -> enviar `Authorization: Bearer` en rutas protegidas -> usar `POST /auth/refresh` cuando caduque el access token.
3. **Cotizacion en Home**: la pantalla principal usa `GET /exchange/calculate` (Bearer + query) para obtener el monto convertido (`data.exchange` en la respuesta de Kambista). Si la llamada falla, se usa el calculo local con `bid`/`ask` de `GET /exchange/current`. La URL publica de la seccion A sigue siendo la referencia del contrato de Kambista.

## Decisiones tecnicas

- JWT access + refresh persistido (hash) para cierre de sesion controlado.
- Catalogos y cuentas en MySQL; en desarrollo se usa `alter: true` por tratarse del challenge.