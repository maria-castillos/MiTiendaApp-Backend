import bcrypt from 'bcrypt';
import express from 'express';
import { UserModel } from '../models/userModel.js';
import { generateToken } from '../services/authService.js';
import { authMiddleware, adminOnly } from '../utils/authMiddleware.js';

const router = express.Router();
const userModel = new UserModel();

router.post('/register', async (req, res) => {
  const { fullname, email, phone_number, address, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(fullname, email, phone_number, address, hashed);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userFromDb = await userModel.findByEmail(email);
  console.log(userFromDb);
  if (!userFromDb) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, userFromDb.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = generateToken(userFromDb);
  res.json({ message: 'Login exitoso', token });
});


router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  const users = await userModel.findAll();
  res.json(users);
});

// 📌 Actualizar usuario
router.put('/users/:id', authMiddleware, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { fullname } = req.body;
  const userFromDb = await userModel.findById(id);
  if (!userFromDb) return res.status(404).json({ error: 'Usuario no encontrado' });
  const rows = await userModel.updateUserName(id, fullname);
  res.json(rows);
});

// 📌 Eliminar usuario
router.delete('/users/:id', authMiddleware, adminOnly, async (req, res) => {
  const { id } = req.params;
  await userModel.deleteById(id);
  res.json({ message: 'Usuario eliminado' });
});

export default router;