# 🛍️ MiTiendaApp Backend

Este es el **backend de MiTiendaApp**, desarrollado con **Node.js** y **Express**.
Proporciona una API REST para gestionar usuarios (registro, inicio de sesión, consulta, actualización y eliminación) conectada a una base de datos **MySQL**.

---

## 🚀 Tecnologías utilizadas

* **Node.js** v22.20.0
* **Express.js** 5.1.0
* **MySQL2** 3.15.3
* **bcrypt** (encriptación de contraseñas) 6.0.0
* **jsonwebtoken (JWT)** (autenticación) 9.0.2
* **dotenv** (manejo de configuración segura) 17.2.3

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) v22.20.0
* [MySQL Server](https://www.mysql.com/)
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/) 28.5.1

---

## 📦 Instalación y ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/maria-castillos/MiTiendaApp-Backend.git
   cd MiTiendaApp-Backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar conexión a base de datos**
   La conexión a MySQL se encuentra definida en el archivo `db.js` mediante un pool de conexiones configurado con variables de entorno.

4. **Ejecutar el servidor**

  ```bash
  node server.js
  ```

  o, si tienes instalado **Nodemon**:

  ```bash
  npx nodemon server.js
  ```

5. El servidor estará disponible en:

  ```
  http://localhost:3000
  ```

---
## EJECUCION CON DOCKER


1. Construye las imágenes:

```bash
docker compose build
```

2. Inicia los servicios:

```bash
docker compose up -d
```

3. Verifica los logs:

```bash
docker compose logs -f
```

4. Detener los servicios:

```bash
docker compose down
```

---

## 📡 Endpoints principales

| Método     | Ruta         | Descripción                           |
| ---------- | ------------ | ------------------------------------- |
| **POST**   | `/register`  | Registra un nuevo usuario             |
| **POST**   | `/login`     | Inicia sesión y devuelve un token JWT |
| **GET**    | `/users`     | Lista todos los usuarios              |
| **PUT**    | `/users/:id` | Actualiza el nombre de un usuario     |
| **DELETE** | `/users/:id` | Elimina un usuario                    |

---

## 🧩 Estructura del proyecto

```
MiTiendaApp-Backend/
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
├─ server.js                       # Punto de entrada, monta rutas y middlewares
├─ db/
│  └─ db.js                        # Pool de conexión MySQL
├─ models/
│  ├─ baseModel.js                 # Clase base para modelos (CRUD genérico)
│  ├─ userModel.js                 # Consultas y operaciones sobre la tabla users
│  ├─ productModel.js              # Consultas y operaciones sobre la tabla products
│  └─ orderModel.js                # Consultas y operaciones sobre la tabla orders
├─ routes/
│  ├─ userRoutes.js                # Rutas públicas/privadas para usuarios (register/login/users)
│  ├─ productRoutes.js             # Rutas CRUD para productos (requieren auth + admin)
│  └─ orderRoutes.js               # Rutas para gestión de pedidos/carrito
├─ controllers/                    # Controladores (separación de lógica)
│  ├─ productController.js         # Lógica de negocio para productos (usado por productRoutes)
│  └─ orderController.js           # Lógica de negocio para pedidos (usado por orderRoutes)
├─ services/
│  ├─ authService.js               # Generación/validación de JWT
│  └─ dbMigration.js               # Creación de tablas
└─ utils/
   └─ authMiddleware.js            # authMiddleware y adminOnly
```

## 🧠 Autor

**María Castillos**
[GitHub](https://github.com/maria-castillos)

**Jossuar Lemus** 
[GitHub](https://github.com/Lemus1456B)

**Juan Esteban Bejarano**
[GitHub](https://github.com/jebejaranobe)


