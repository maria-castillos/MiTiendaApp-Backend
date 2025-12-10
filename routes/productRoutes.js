import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateStock,
  deleteProduct
} from '../controllers/productController.js';

import { authMiddleware, adminOnly } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/products', authMiddleware, getProducts);          // listado requiere login
router.get('/products/:id', authMiddleware, getProductById);   // detalle requiere login

// --- RUTAS PROTEGIDAS (solo admin) ---
router.post('/products', authMiddleware, adminOnly, createProduct);
router.put('/products/:id', authMiddleware, adminOnly, updateProduct);
router.patch('/products/:id/stock', authMiddleware, adminOnly, updateStock);
router.delete('/products/:id', authMiddleware, adminOnly, deleteProduct);

export default router;
