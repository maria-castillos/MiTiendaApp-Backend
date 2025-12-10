import { BaseModel } from './BaseModel.js';
import pool from '../db/db.js';

export class UserModel extends BaseModel {
  constructor() {
    super('users');
  }

  async createUser(fullname, email, phone_number, address, password, role = 'user') {
    const [result] = await pool.query(
      'INSERT INTO users (fullname, email, phone_number, address, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [fullname, email, phone_number, address, password, role]
    );
    return { id: result.insertId, fullname, email, role };
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

    async updateUserName(id, fullname) {
    await pool.query('UPDATE users SET fullname = ? WHERE id = ?', [fullname, id]);
    const [rows] = await pool.query('SELECT id, fullname, email FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}