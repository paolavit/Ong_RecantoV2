import express from 'express';
import path from 'path';
import { config } from '../config/environment';

/**
 * Middleware para servir arquivos estáticos (imagens e uploads)
 */
export function setupStaticFiles(app: express.Application) {
  const imagensPath = path.join(__dirname, '../../', config.uploadsDir);

  // Servir uploads
  app.use('/uploads', express.static(config.uploadsDir));

  // Servir imagens estáticas
  app.use('/imagens', express.static(imagensPath));

  console.log(`[${config.nodeEnv.toUpperCase()}] Servindo imagens estáticas de: ${imagensPath} em /imagens`);
  console.log(`[${config.nodeEnv.toUpperCase()}] Servindo uploads de: ${config.uploadsDir}/ em /uploads`);
}
