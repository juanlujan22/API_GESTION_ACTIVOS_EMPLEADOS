
# API GESTION DE ACTIVOS Y EMPLEADOS

Esta Api rest, es un sistema de gestión de empleados y activos asignados a estos. Un empleado puede tener más de un activo, tal como Laptop, Silla de Oficina, etc.
# Tecnologías
Se utilizo el entorno de ejecución NodeJS, acompañado de las siguientes librerias:

    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.15.0",
    "morgan": "^1.10.0",
    "mysql2-promise": "^0.1.4"
    


## Installation

Copia la URL del repositorio: 
https://github.com/juanlujan22/API_GESTION_ACTIVOS_EMPLEADOS.git

Abre la terminal o línea de comandos en tu máquina local.

Navega hasta la carpeta donde deseas clonar el repositorio usando el comando "cd".

Ejecuta el comando "git clone" seguido de la URL del repositorio que copiaste anteriormente. Por ejemplo:

git clone https://github.com/juanlujan22/API_GESTION_ACTIVOS_EMPLEADOS.git

```bash
git clone https://github.com/juanlujan22/API_GESTION_ACTIVOS_EMPLEADOS.git
```
Luego de completado el clone, instala las dependencias o librerias del proyecto. Para ello, navega hasta la carpeta del proyecto en tu máquina local y ejecuta el comando "npm install" o "yarn" (según el administrador de paquetes utilizado en el proyecto).

Librerias: 
```bash
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.15.0",
    "morgan": "^1.10.0",
    "mysql2-promise": "^0.1.4"
    "nodemon": "^2.0.21"}
```
Una vez instaladas las dependencias, ejecuta 

```bash
npm start
```
## Environment Variables

Para iniciar esta Api, necesitaras configurar las siguientes variables de entorno en el archivo .env 

`DB_HOST= localhost`
`DB_NAME= db_employees`
`DB_USER= root`
`DB_PORT= 3000`
`DB_PASSWORD=` 
## Documentation

Esta Api cuenta con dos endpoints iniciales:
http://localhost:3001/api/v1/employees
Que trae todos los empleados de la base de datos, por medio de una solicitud tipo GET 

http://localhost:3001/api/v1/assets
Que trae todos los activos de la base de datos, por medio de una solicitud tipo GET

Por medio de valores numéricos, en las query params, en la url(page y limit), se obtiene paginado de estos resultados. 
ej:  
http://localhost:3001/api/v1/employees?page=1&limit=10
Devuelve 10 empleados en la página 1
http://localhost:3001/api/v1/assets?page=1&limit=10
Devuelve 10 assets en la página 1

#SERVICIOS CRUD DE EMPLOYEES

El endpoint de employees, cuenta con métodos crud en las siguientes rutas:

"/:employee_id" Trae empleado según id, por medio de solicitud tipo GET a:
http://localhost:3001/api/v1/employees/:employee_id

"/create" Creación de un empleado, por medio de solicitud tipo POST a:
http://localhost:3001/api/v1/employees/create

"/delete/:employee_id" Elimina un empleado según id, por medio de solicitud tipo DELETE a:
http://localhost:3001/api/v1/employees/delete/:employee_id

"/update/:employee_id" Edición de un empleado según id, por medio de solicitud tipo PUT a:
http://localhost:3001/api/v1/employees/update/:employee_id



#SERVICIOS CRUD DE ASSETS

El endpoint de assets, cuenta con métodos crud en las siguientes rutas:

"/:asset_id" Trae empleado según número de id, por medio de solicitud tipo GET a:
http://localhost:3001/api/v1/assets/:asset_id

"/empid/:employee_id" Trae los assets pertenecientes a un empleado, segun id de empleado, por medio de solicitud tipo GET a:
http://localhost:3001/api/v1/assets/empid/:employee_id

"/create" Creación de un asset, por medio de solicitud tipo POST a:
http://localhost:3001/api/v1/assets/create

"/update/:asset_id" Edición de un asset según id, por medio de solicitud tipo PUT a:
http://localhost:3001/api/v1/assets/update/:asset_id

"/delete/:asset_id" Elimina un asset según id, por medio de la solicitud tipo DELETE a: 
http://localhost:3001/api/v1/assets/delete/:asset_id