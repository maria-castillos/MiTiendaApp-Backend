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

  async updateProduct(id, name, price, stock, imagen) {
    await pool.query(
      'UPDATE products SET name = ?, price = ?, stock = ?, imagen = ? WHERE id = ?',
      [name, price, stock, imagen, id]
    );
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
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async updateStock(id, stock) {
    await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stock, id]);
    // const [rows] = await pool.query('SELECT id, name, stock FROM products WHERE id = ?', [id]);
    // return rows[0];
  }
}