import { Usuario } from '../models/usuarioModel';
//Utilizado para tipar o req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        tipoUsuario: string;
      }
    }
  }
}