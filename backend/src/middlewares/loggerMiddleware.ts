import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';

/**
 * Middleware de logging
 * Loga requisições em desenvolvimento e staging
 * Em produção, apenas loga o método e path
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (config.nodeEnv !== 'production') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    
    if (config.nodeEnv === 'development') {
      console.log('Headers:', req.headers);
    }
  } else {
    // Em produção, log mínimo
    if (config.logLevel === 'debug') {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    }
  }
  
  next();
}
