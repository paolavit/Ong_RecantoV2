import { Request, Response, NextFunction } from 'express';

export function autorizarTipoUsuario(...tiposPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {                                                    
    const { tipo_usuario } = req.user!;

    if (!tiposPermitidos.includes(tipo_usuario)) {
      res.status(403).json({ 
        erro: 'Acesso negado. Você não tem permissão para acessar este recurso.' 
      });
      return;  
    }

    next();
  };
}