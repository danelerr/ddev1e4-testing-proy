# Sistema de Gestión de Iglesia

Este es un proyecto de aplicación web desarrollado con Node.js, Express y EJS para gestionar información relevante de una iglesia, como miembros, bautizos, matrimonios, cargos y ministerios.

## Características

*   Gestión de Miembros
*   Registro de Bautizos
*   Registro de Matrimonios
*   Administración de Cargos
*   Gestión de Ministerios
*   Manejo de Relaciones/Parentescos

## Tecnologías Utilizadas

*   **Backend:** Node.js, Express.js
*   **Frontend:** EJS (Embedded JavaScript templates), HTML, CSS, Bootstrap
*   **Base de Datos:** MySQL
*   **Módulos Node.js:** `express`, `ejs`, `mysql2`

## Prerrequisitos

*   Node.js (v16 o superior recomendado)
*   npm (generalmente viene con Node.js)
*   Docker (para la base de datos)

## Instalación y Ejecución

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone https://github.com/danelerr/ddev1e4-testing-proy
    cd ddev1e4-testing-proy
    ```

2.  **Instalar dependencias:**
    Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```
    Esto instalará todos los paquetes necesarios definidos en `package.json`, incluyendo `express`, `ejs` y `mysql2`.

3.  **Configurar la Base de Datos (MySQL con Docker):**

    *   **Levantar el contenedor Docker:** Ejecuta el siguiente comando en tu terminal para crear e iniciar un contenedor MySQL.
        ```bash
        docker run -d \
            --name mysql-iglesia \
            -p 3306:3306 \
            -e MYSQL_ROOT_PASSWORD=password \
            -v mysql_data_iglesia:/var/lib/mysql \
            mysql:latest
        ```
        *   `-d`: Ejecuta el contenedor en segundo plano.
        *   `--name mysql-iglesia`: Asigna un nombre al contenedor.
        *   `-p 3306:3306`: Mapea el puerto 3306 del contenedor al puerto 3306 de tu máquina local.
        *   `-e MYSQL_ROOT_PASSWORD=password`: Establece la contraseña para el usuario `root` de MySQL. **Asegúrate de que esta contraseña coincida con la configurada en `datos/conexion.js`**.
        *   `-v mysql_data_iglesia:/var/lib/mysql`: Crea un volumen llamado `mysql_data_iglesia` para persistir los datos de la base de datos, incluso si el contenedor se detiene o elimina.
        *   `mysql:latest`: Especifica la imagen de MySQL a utilizar.

    *   **Crear la base de datos y ejecutar el script SQL:** Una vez que el contenedor esté en ejecución, necesitas crear la base de datos `iglesia` y cargar la estructura inicial desde el archivo `database.sql`. Ejecuta el siguiente comando:
        ```bash
        docker exec -i mysql-iglesia mysql -uroot -ppassword < database.sql
        ```
        *   `docker exec -i mysql-iglesia`: Ejecuta un comando dentro del contenedor `mysql-iglesia` de forma interactiva.
        *   `mysql -uroot -ppassword`: Llama al cliente de línea de comandos de MySQL, usando el usuario `root` y la contraseña `password`.
        *   `< database.sql`: Redirige el contenido del archivo `database.sql` como entrada para el cliente MySQL, ejecutando así las sentencias SQL que contiene (esto creará la base de datos `iglesia` y sus tablas si están definidas en el script).

4.  **Ejecutar la aplicación:**

    *   **Modo de desarrollo (con reinicio automático ante cambios):**
        ```bash
        npm run dev
        ```
        Este comando utiliza `node app.js --watch` (según tu `package.json`).

    *   **Modo de producción:**
        ```bash
        npm start
        ```
        Este comando ejecuta `node app.js`.

5.  **Acceder a la aplicación:**
    Abre tu navegador web y ve a `http://localhost:PORT`, donde `PORT` es el puerto en el que tu aplicación Express está escuchando (generalmente 3000 o el especificado en `app.js`).



## Estructura del Proyecto

```
.
├── app.js              # Archivo principal de la aplicación Express
├── database.sql        # Script SQL para inicializar la base de datos
├── package.json        # Metadatos y dependencias del proyecto
├── datos/              # Capa de acceso a datos (interacción con la BD)
│   ├── conexion.js     # Configuración de la conexión a la BD
│   └── DB*.js          # Módulos específicos por entidad para operaciones CRUD
├── negocio/            # Capa de lógica de negocio
│   └── N*.js           # Módulos con la lógica para cada entidad
├── presentacion/       # Capa de presentación (vistas EJS)
│   └── P*.ejs          # Plantillas EJS para renderizar HTML
├── public/             # Archivos estáticos (CSS, JS cliente, imágenes)
│   ├── css/
│   ├── images/
│   └── js/
└── routes/             # Definición de rutas de la aplicación
    └── router.js       # Enrutador principal
```

