import postgres from 'postgres'
import { config } from '../config/environment'

/**
 * Conexão PostgreSQL para operações de banco de dados
 */
const sql = postgres(config.databaseUrl)

export default sql