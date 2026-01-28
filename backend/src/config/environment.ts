import dotenv from 'dotenv';
import path from 'path';

// Carrega o arquivo .env apropriado baseado no NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

export interface EnvironmentConfig {
  nodeEnv: 'development' | 'staging' | 'production';
  port: number;
  apiBaseUrl: string;
  databaseUrl: string;
  databaseApiKey: string;
  jwtSecret: string;
  jwtExpiration: number;
  corsOrigins: string[];
  uploadsDir: string;
  maxFileSize: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

function getConfig(): EnvironmentConfig {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production';

  // Valores padrão por ambiente
  const configs: Record<string, EnvironmentConfig> = {
    development: {
      nodeEnv: 'development',
      port: parseInt(process.env.PORT || '3000', 10),
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
      databaseUrl: process.env.DATABASE_URL || 'https://etvxlinxjweeyhgpamuj.supabase.co',
      databaseApiKey: process.env.DATABASE_API_KEY || '',
      jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
      jwtExpiration: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION, 10) : 24 * 60 * 60, // Default: 24h in seconds
      corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3001,http://127.0.0.1:3001').split(','),
      uploadsDir: process.env.UPLOADS_DIR || 'imagens',
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
      logLevel: 'debug',
    },
    staging: {
      nodeEnv: 'staging',
      port: parseInt(process.env.PORT || '3000', 10),
      apiBaseUrl: process.env.API_BASE_URL || 'https://staging-api.ong.com',
      databaseUrl: process.env.DATABASE_URL || '',
      databaseApiKey: process.env.DATABASE_API_KEY || '',
      jwtSecret: process.env.JWT_SECRET || '',
      jwtExpiration: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION, 10) : 24 * 60 * 60, // Default: 24h in seconds
      corsOrigins: (process.env.CORS_ORIGINS || 'https://staging.ong.com').split(','),
      uploadsDir: process.env.UPLOADS_DIR || '/var/www/uploads',
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
      logLevel: 'info',
    },
    production: {
      nodeEnv: 'production',
      port: parseInt(process.env.PORT || '3000', 10),
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.ong.com',
      databaseUrl: process.env.DATABASE_URL || '',
      databaseApiKey: process.env.DATABASE_API_KEY || '',
      jwtSecret: process.env.JWT_SECRET || '',
      jwtExpiration: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION, 10) : 24 * 60 * 60, // Default: 24h in seconds
      corsOrigins: (process.env.CORS_ORIGINS || 'https://ong.com').split(','),
      uploadsDir: process.env.UPLOADS_DIR || '/var/www/uploads',
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
      logLevel: 'error',
    },
  };

  const config = configs[nodeEnv];

  if (!config) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
  }

  // Validar variáveis obrigatórias em produção
  if (nodeEnv === 'production') {
    const requiredVars = ['JWT_SECRET', 'DATABASE_URL', 'DATABASE_API_KEY'];
    const missing = requiredVars.filter((v) => !process.env[v]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables in production: ${missing.join(', ')}`);
    }
  }

  return config;
}

export const config = getConfig();

console.log(`[${config.nodeEnv.toUpperCase()}] Configurações carregadas`);
