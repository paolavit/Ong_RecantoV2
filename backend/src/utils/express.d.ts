import { Usuario } from '../models/usuarioModel';
//Utilizado para tipar o req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id_usuario: number;
        email: string;
        tipo_usuario: string;
      }
    }
  }
}