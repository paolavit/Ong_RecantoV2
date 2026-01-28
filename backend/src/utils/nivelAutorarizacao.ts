import { Request, Response, NextFunction } from 'express';

export function autorizarTipoUsuario(...tiposPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {                                                    
    const { tipoUsuario } = req.user!;

    if (!tiposPermitidos.includes(tipoUsuario)) {
      res.status(403).json({ 
        erro: 'Acesso negado. Você não tem permissão para acessar este recurso.' 
      });
      return;  
    }

    next();
  };
}