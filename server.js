import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js';

dotenv.config();
const app = express();
app.use(express.json());

// Crear tabla si no existe
await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(200)
  )
`);

// 📌 Registrar usuario
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login exitoso', token });
});

// 📌 Obtener usuarios
app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email FROM users');
  res.json(rows);
});

// 📌 Actualizar usuario
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await pool.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
  const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
  res.json(rows[0]);
});

// 📌 Eliminar usuario
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'Usuario eliminado' });
});

// Servidor corriendo
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
