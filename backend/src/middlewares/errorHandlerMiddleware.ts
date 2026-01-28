import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';

/**
 * Middleware de tratamento de erros global
 * Deve ser o último middleware a ser registrado
 */
export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Erro:', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    erro: 'Erro interno do servidor',
    message: config.nodeEnv === 'development' ? message : undefined,
    status: config.nodeEnv === 'development' ? statusCode : undefined
  });
}
