import pool from '../db/db.js';

export class BaseModel {
  constructor(tableName) {
    this._table = tableName;
  }

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this._table}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this._table} WHERE id = ?`, [id]);
    return rows[0];
  }

  async deleteById(id) {
    await pool.query(`DELETE FROM ${this._table} WHERE id = ?`, [id]);
    return { message: 'Eliminado correctamente' };
  }
}
