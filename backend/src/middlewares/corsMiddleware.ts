import cors from 'cors';
import { config } from '../config/environment';

/**
 * Middleware de CORS
 * Configura dinamicamente as origens permitidas baseado no ambiente
 */
export const corsMiddleware = cors({
  origin: config.corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
});
