// pedidosAdocaoRoutes.ts
import { Router, Request, Response } from 'express'
import { PedidoAdocaoController } from "../controllers/pedidoAdocaoController";
import { PedidoAdocaoCompleto } from "../models/pedidoAdocao";

const router = Router();

const pedidoAdocao = new PedidoAdocaoController();
// --- Rota GET para Pedidos de Adoção ---
//router.get("/", async (req: Request, res: Response) => await pedidoAdocao.getPedidosAdocao(req, res));

router.post("/aprovar", async (req: Request, res: Response) => {
    await pedidoAdocao.aprovarPedidoAdocao(req, res);
});

export default router;