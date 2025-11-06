# 🛍️ MiTiendaApp Backend

Este es el **backend de MiTiendaApp**, desarrollado con **Node.js** y **Express**.
Proporciona una API REST para gestionar usuarios (registro, inicio de sesión, consulta, actualización y eliminación) conectada a una base de datos **MySQL**.

---

## 🚀 Tecnologías utilizadas

* **Node.js**
* **Express.js**
* **MySQL2**
* **bcrypt** (encriptación de contraseñas)
* **jsonwebtoken (JWT)** (autenticación)
* **dotenv** (manejo de configuración segura)

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/)
* [MySQL Server](https://www.mysql.com/)
* [Git](https://git-scm.com/)

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
│
├── db.js              # Configuración de conexión a MySQL
├── server.js          # Servidor principal y rutas
├── .gitignore         # Archivos ignorados por Git
├── package.json       # Dependencias y scripts
└── README.md
```

## 🧠 Autor

**María Castillos**
[GitHub](https://github.com/maria-castillos)

**Jossuar Lemus**

**Juan Esteban Bejarano**


