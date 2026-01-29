import sql from "../database/databaseClient";
import { UsuarioAdministrador } from "../models/usuarioAdministradorModel";

export class UsuarioAdministradorDAO {
  async insertUsuario(
    usuario: UsuarioAdministrador
  ): Promise<UsuarioAdministrador> {

    try {
      /* ===============================
         1. Verifica se email ou CPF já existem
      =============================== */
      const existente = await sql<{ id_usuario: number }[]>`
        SELECT id_usuario
        FROM usuario
        WHERE email = ${usuario.email}
           OR cpf   = ${usuario.cpf}
      `;

      if (existente.length > 0) {
        throw new Error("Já existe um usuário com este email ou CPF.");
      }

      /* ===============================
         2. Transaction
      =============================== */
      const [usuarioAdministrador] = await sql.begin(
        async (tx: any) => {

          /* ---------- INSERE USUARIO ---------- */
          const [usuarioInserido] = await tx<{
            id_usuario: number
          }[]>`
            INSERT INTO usuario (
              nome,
              sobrenome,
              email,
              senha,
              data_nascimento,
              cpf,
              telefone,
              tipo_usuario,
              escolaridade,
              possui_pet,
              logradouro,
              numero,
              complemento,
              bairro,
              cidade,
              estado,
              contribuir_ong,
              deseja_adotar
            ) VALUES (
              ${usuario.nome},
              ${usuario.sobrenome},
              ${usuario.email},
              ${usuario.senha},
              ${usuario.dataNascimento},
              ${usuario.cpf},
              ${usuario.telefone ?? null},
              ${usuario.tipo_usuario},
              ${usuario.escolaridade ?? null},
              ${usuario.possuiPet},
              ${usuario.logradouro ?? null},
              ${usuario.numero ?? null},
              ${usuario.complemento ?? null},
              ${usuario.bairro ?? null},
              ${usuario.cidade ?? null},
              ${usuario.estado ?? null},
              ${usuario.contribuir_ong},
              ${usuario.deseja_adotar}
            )
            RETURNING id_usuario
          `;

          /* ---------- INSERE USUARIO_ADMINISTRADOR ---------- */
          const [adminInserido] = await tx<UsuarioAdministrador[]>`
            INSERT INTO usuario_administrador (
              id_usuario,
              funcao,
              id_colab_especies_pets
            ) VALUES (
              ${usuarioInserido.id_usuario},
              ${usuario.funcao},
              ${usuario.id_colab_especies_pets}
            )
            RETURNING *
          `;

          return adminInserido;
        }
      );

      console.log("DAO -> USUÁRIO ADMINISTRADOR INSERIDO COM SUCESSO");
      return usuarioAdministrador;

    } catch (error: any) {
      console.error("ERRO NO DAO - ADMINISTRADOR:", error.message);
      throw new Error(error.message);
    }
  }
}
