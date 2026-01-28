import { UUID } from "crypto";

export interface SolicitacaoAdocao{
    id: UUID;
    idPet: UUID;
    idUsuario: UUID;
    idAdministrador?: UUID | null; // Pode ser undefined ou null se não for preenchido
    status: "Pendente" | "Concluido";
    resultado: "Aprovado" | "Reprovado" | null;
}