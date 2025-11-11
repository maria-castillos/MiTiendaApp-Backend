import express from 'express';
import { ProductModel } from '../models/productModel.js';
import { authMiddleware, adminOnly } from '../utils/authMiddleware.js';

const router = express.Router();
const productModel = new ProductModel();

// Crear producto (solo admin)
router.post('/products', authMiddleware, adminOnly, async (req, res) => {
  const { name, price, stock, imagen } = req.body;
  try {
    const product = await productModel.createProduct(name, price, stock, imagen);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los productos (solo admin)
router.get('/products', authMiddleware, adminOnly, async (req, res) => {
  try {
    const products = await productModel.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un producto por ID (solo admin)
router.get('/products/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto (solo admin)
router.put('/products/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, imagen } = req.body;
    
    const productExists = await productModel.findById(id);
    if (!productExists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const updatedProduct = await productModel.updateProduct(id, name, price, stock, imagen);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar producto (solo admin)
router.delete('/products/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const productExists = await productModel.findById(id);
    if (!productExists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await productModel.deleteById(id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar stock de producto (solo admin)
router.patch('/products/:id/stock', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const productExists = await productModel.findById(id);
    if (!productExists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await productModel.updateStock(id, stock);
    console.log('Updated stock for product ID:', id);
    const updatedProduct = await productModel.findById(id);
    console.log('Updated product details:', updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;