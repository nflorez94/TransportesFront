# Gestión de Transportes

Este proyecto es una aplicación web para la gestión de transportes, desarrollada con React y TypeScript.

## Características

- Registro de nuevos transportes
- Visualización de lista de transportes
- Autenticación de usuarios
- Rutas protegidas basadas en roles de usuario

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Instalación

1. Clone el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/gestion-transportes.git
   ```

2. Navegue al directorio del proyecto:
   ```bash
   cd gestion-transportes
   ```

3. Instale las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Asegúrese de que el backend esté corriendo en `http://localhost:3000`. Si no es así, actualice la URL base en el archivo `src/api/api.ts`.

## Ejecución

Para iniciar la aplicación en modo de desarrollo:

```
npm start
```

La aplicación se ejecutará en `http://localhost:4200`.

## Uso

1. Inicie sesión con las siguientes credenciales:
   - Usuario con rol válido:
     - Usuario: gestor
     - Contraseña: password123
   - Usuario sin rol válido:
     - Usuario: admin
     - Contraseña: admin123

2. Una vez autenticado con el usuario "gestor", podrá acceder a las funciones de registro y visualización de transportes.

3. Si inicia sesión con el usuario "admin", no tendrá acceso a las funciones de gestión de transportes y verá un mensaje de "No autorizado".

## Estructura del proyecto

- `src/components`: Contiene los componentes React de la aplicación.
- `src/api`: Contiene la configuración de axios para las llamadas a la API.
- `src/App.tsx`: Componente principal que maneja el enrutamiento y la estructura general de la aplicación.

## Scripts disponibles

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm test`: Ejecuta las pruebas.
- `npm run build`: Construye la aplicación para producción.

## Contribuir

Si desea contribuir al proyecto, por favor cree un pull request con sus cambios propuestos.

## Licencia

Este proyecto está bajo la licencia MIT.
