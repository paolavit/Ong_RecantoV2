import express from 'express';
import { config } from '../config/environment';

/**
 * Middleware para processar corpo de requisições
 * Converte maxFileSize de bytes para MB
 */
export function setupBodyParser(app: express.Application) {
  const maxFileSize = config.maxFileSize / (1024 * 1024); // Converter para MB

  app.use(express.json({ limit: `${maxFileSize}mb` }));
  app.use(express.urlencoded({ extended: true, limit: `${maxFileSize}mb` }));
}
