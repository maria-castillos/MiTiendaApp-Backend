import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { runMigrations } from './services/dbMigration.js';

dotenv.config();
const app = express();
app.use(express.json());

await runMigrations();
const path_prefix = '/api/v1';
app.use(`${path_prefix}`, userRoutes);
app.use(`${path_prefix}`, productRoutes);


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
