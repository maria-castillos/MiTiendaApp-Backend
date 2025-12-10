import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import { runMigrations } from './services/dbMigration.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Configuración correcta de CORS
app.use(cors({
  origin: "*",               // Permitir todos los orígenes (incluye 'null')
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Migraciones
await runMigrations();

const path_prefix = '/api/v1';
app.use(path_prefix, userRoutes);
app.use(path_prefix, productRoutes);
app.use(path_prefix, orderRoutes);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
