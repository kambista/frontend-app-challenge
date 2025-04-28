# Proyecto Mobile App

Aplicación móvil desarrollada en React Native usando TypeScript.

## Estructura de Carpetas

- **/app**:  
  Contiene las pantallas principales agrupadas en tabs: `home`, `profile`, `auth`, `dashboard`.

- **/assets**:  
  Archivos estáticos como imágenes (`.png`) y recursos gráficos.

- **/src**:  
  Código fuente organizado por módulos (features).

  - **/api**:  
    Configuración de llamadas a APIs usando `axios`.

  - **/data**:  
    Archivos `.json` para datos estáticos como `banks.json` y `sourceFunds.json`.

  - **/features**:  
    Arquitectura modular basada en "features". Cada módulo contiene:

    - `components`: Componentes propios del módulo.
    - `helpers`: Funciones auxiliares específicas del módulo.
    - `hooks`: Custom Hooks relacionados al módulo.
    - `store`: Estado global/local del módulo (posiblemente usando Zustand, Redux Toolkit, o Context API).

  - **/interfaces**:  
    Interfaces TypeScript para definir la estructura de datos. (Recomendado moverlo dentro de cada `feature`.)

  - **/screens**:  
    Pantallas principales como `login` y `register`. (Recomendado moverlas dentro de su feature relacionado.)

## Librerías utilizadas

- **React Native**: Framework principal para el desarrollo móvil.
- **TypeScript**: Tipado fuerte para mayor robustez del código.
- **Axios**: Cliente HTTP para la comunicación con APIs externas.
- **Tailwind (Nativewind)**: Utilizado para estilos rápidos y consistentes.
- **Expo**: (presente) para facilitar la ejecución y build de la app.

## Arquitectura de Código

- **Feature-based architecture**:  
  Cada funcionalidad (auth, home, profile, etc.) está organizada en su propio módulo bajo `/features`.

- **State Management**:  
  Estado local y global manejado desde las carpetas `store` de cada feature.

- **Hooks personalizados**:  
  Los `hooks` propios de cada feature están en la carpeta `/hooks` para mayor reutilización de lógica.

- **Errores y Validaciones**:
  - Se manejan a nivel de API utilizando interceptores de `axios` (en `/api/config.ts`).
  - Errores de formularios se manejan probablemente en los custom hooks o directamente en los componentes.

## Buenas prácticas aplicadas

- Tipado estricto con TypeScript.
- Modularización por features.
- Separación clara de componentes, hooks, helpers y estado.
- Uso de carpetas específicas para datos y assets.
- Código escalable y mantenible para nuevos features.

## Mejoras sugeridas

- **Reorganizar interfaces**:  
  Mover `/interfaces/auth` y `/interfaces/home` dentro de `/features/auth/interfaces` y `/features/home/interfaces` respectivamente.

- **Reorganizar screens**:  
  Mover las pantallas (`login`, `register`) dentro del módulo correspondiente (`features/auth/screens`).

- **Crear carpetas de constants si es necesario**:  
  Para manejar valores fijos como rutas de API, rutas de navegación, etc.

---

## Capturas de pantalla

### Pantalla Inicial

![Pantalla Inicial](https://res.cloudinary.com/react-romel/image/upload/v1745864990/apps/prueba-kambista/4dcaf6e8-08c1-40cd-9e84-1f10b9962f22.png)

### Pantalla de Login

![Pantalla Login](https://res.cloudinary.com/react-romel/image/upload/v1745865015/apps/prueba-kambista/1fc04c28-8e25-4287-af97-78474034fc25.png)

![Pantalla Login](https://res.cloudinary.com/react-romel/image/upload/v1745865059/apps/prueba-kambista/7ecf1052-5366-4ddc-a2ec-d4819a137a0c.png)

### Pantalla de creacion con éxito

![Pantalla Exito](https://res.cloudinary.com/react-romel/image/upload/v1745865087/apps/prueba-kambista/916fbf2b-3f1f-4530-ab98-f311e08d0cdc.png)

### Pantalla de Cambio

![Pantalla Cambio](https://res.cloudinary.com/react-romel/image/upload/v1745865096/apps/prueba-kambista/f1fe8f06-586c-4745-a04f-419e7398c1e1.png)

### Link de Descarga

![Link Descarga](https://expo.dev/artifacts/eas/iCBzVuaeUMFC2EUiHZ9b9L.apk)

### Pantalla de Transacciones

![Pantalla Transacciones](https://res.cloudinary.com/react-romel/image/upload/v1745865111/apps/prueba-kambista/541ede16-cfe9-46ea-9763-98c72ebd3568.png)

![Pantalla Transacciones](https://res.cloudinary.com/react-romel/image/upload/v1745865133/apps/prueba-kambista/f3ec2911-2bc2-45c4-80c5-7895480cdd68.png)

![Pantalla Transacciones](https://res.cloudinary.com/react-romel/image/upload/v1745865144/apps/prueba-kambista/9a8f8cb7-5a33-4582-b874-382b40645ef7.png)

![Pantalla Transacciones](https://res.cloudinary.com/react-romel/image/upload/v1745865166/apps/prueba-kambista/f93b605f-30fe-4859-b366-aeb15563701f.png)

![Pantalla Transacciones](https://res.cloudinary.com/react-romel/image/upload/v1745865177/apps/prueba-kambista/300aadd5-bdc1-48e0-96c9-a20b0d0ba77c.png)
