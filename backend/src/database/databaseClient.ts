import { createClient } from '@supabase/supabase-js'
import { config } from '../config/environment'

/**
 * Cliente Supabase para upload de arquivos e operações de banco de dados
 */
export const supabaseClient = createClient(
  config.databaseUrl, 
  config.databaseApiKey
)

export default supabaseClient