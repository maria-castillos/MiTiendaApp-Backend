import { BaseModel } from './BaseModel.js';
import pool from '../db/db.js';

export class ProductModel extends BaseModel {
  constructor() {
    super('products');
  }

  async createProduct(name, price, stock, imagen) {
    const [result] = await pool.query(
      'INSERT INTO products (name, price, stock, imagen) VALUES (?, ?, ?, ?)',
      [name, price, stock, imagen]
    );
    return { id: result.insertId, name, price, stock, imagen };
  }

  /**
   * Actualiza el producto de forma flexible, solo con los campos recibidos.
   */
  async updateProduct(id, name, price, stock, imagen) {
    let query = 'UPDATE products SET ';
    const updates = [];
    const values = [];

    // Comprueba qué campos existen y los agrega dinámicamente
    if (name !== undefined && name !== null) {
      updates.push('name = ?');
      values.push(name);
    }
    if (price !== undefined && price !== null) {
      updates.push('price = ?');
      values.push(price);
    }
    if (stock !== undefined && stock !== null) {
      updates.push('stock = ?');
      values.push(stock);
    }
    if (imagen !== undefined && imagen !== null) {
      updates.push('imagen = ?');
      values.push(imagen);
    }

    // Si no hay nada que actualizar (cuerpo vacío)
    if (updates.length === 0) {
      return this.findById(id); 
    }

    query += updates.join(', ');
    query += ' WHERE id = ?';
    values.push(id);

    await pool.query(query, values);
    
    // Devuelve el producto actualizado
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  }

 
  async deleteById(id) {
    // 1. Elimina los registros en order_items que contienen este product_id
    await pool.query('DELETE FROM order_items WHERE product_id = ?', [id]);
    
    // 2. Ahora, elimina el producto principal
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    return result.affectedRows > 0;
  }

  async updateStock(id, stock) {
    await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stock, id]);

  }
}

export default new ProductModel();