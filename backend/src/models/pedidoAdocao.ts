import { PetCTR } from "../controllers/petController";
import { Usuario } from "./usuarioModel";
import { Pet } from "./petModel";

export interface PedidoAdocaoCompleto {
    idPedido: string;
    dataSolicitacao: string; // Formato ISO 8601 recomendado (ex: "YYYY-MM-DDTHH:mm:ssZ")
    status: "PENDENTE" | "APROVADA" | "REPROVADA";
    observacoesAdotante?: string;
    observacoesAdmin?: string;
    adotante: Usuario;
    animal: Pet;
}
