# 🔧 Sistema de Configuração por Ambiente

## 📋 Resumo da Implementação

O projeto agora utiliza um sistema centralizado de configuração que se adapta automaticamente baseado na variável de ambiente `NODE_ENV`.

## 📁 Arquivos de Configuração

### `src/config/environment.ts`
Arquivo centralizado que carrega e gerencia todas as variáveis de ambiente por ambiente (development, staging, production).

**Variáveis disponíveis:**
- `nodeEnv` - Ambiente atual (development | staging | production)
- `port` - Porta do servidor
- `apiBaseUrl` - URL base da API
- `databaseUrl` - URL de conexão do banco de dados (Supabase)
- `databaseApiKey` - Chave API do Supabase
- `jwtSecret` - Chave secreta para JWT
- `jwtExpiration` - Tempo de expiração do JWT
- `corsOrigins` - Array de origens permitidas para CORS
- `uploadsDir` - Diretório para armazenar uploads
- `maxFileSize` - Tamanho máximo de arquivo (em bytes)
- `logLevel` - Nível de log (debug | info | warn | error)

## 🔐 Arquivos .env

### `.env.development`
Configuração para desenvolvimento local
```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=...
JWT_SECRET=...
```

### `.env.staging`
Configuração para ambiente de staging/teste
```bash
NODE_ENV=staging
PORT=3000
DATABASE_URL=...
JWT_SECRET=...
```

### `.env.production`
Configuração para ambiente de produção
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=...
JWT_SECRET=...
```

## 🚀 Como Usar

### Desenvolvimento
```bash
npm run dev
```
Carrega automaticamente `.env.development`

### Staging
```bash
npm run dev:staging
```
Carrega automaticamente `.env.staging`

### Produção
```bash
npm run build
npm run start:production
```
Carrega automaticamente `.env.production`

## 📦 Arquivos Atualizados para Usar `config`

1. **`src/database/databaseClient.ts`**
   - Usa `config.databaseUrl` e `config.databaseApiKey`

2. **`src/utils/auth.ts`**
   - Usa `config.jwtSecret`
   - Logs apenas em desenvolvimento

3. **`src/services/loginService.ts`**
   - Usa `config.jwtSecret`
   - Usa `config.jwtExpiration`
   - Logs apenas em desenvolvimento

4. **`src/server.ts`**
   - Usa `config.port`
   - Usa `config.corsOrigins`
   - Usa `config.uploadsDir`
   - Usa `config.maxFileSize`
   - Usa `config.apiBaseUrl`
   - Logs apenas em desenvolvimento/staging

## ⚠️ Importante para Produção

Antes de fazer deploy em produção:

1. **Gere um JWT_SECRET seguro:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Atualize `.env.production` com:**
   - URLs reais do seu domínio
   - Credenciais corretas do Supabase
   - JWT_SECRET seguro e único
   - CORS_ORIGINS corretos para seu domínio

3. **Validação de produção:**
   O sistema valida automaticamente que as variáveis obrigatórias estão preenchidas em produção:
   - `JWT_SECRET`
   - `DATABASE_URL`
   - `DATABASE_API_KEY`

## 🔄 Fluxo de Carregamento

1. Node inicia com `NODE_ENV`
2. `environment.ts` lê o arquivo `.env.{NODE_ENV}` correspondente
3. Valores das variáveis de ambiente são carregados
4. Valores padrão são usados se as variáveis não existirem (exceto em produção)
5. Retorna o objeto `config` tipado

## 💡 Boas Práticas

- ✅ Sempre use `import { config } from '../config/environment'` em vez de `process.env`
- ✅ Nunca commite `.env` files (já está no `.gitignore`)
- ✅ Use a validação de produção para evitar erros em deploy
- ✅ Mantenha `.env.development` com valores de teste
- ✅ Gere um novo JWT_SECRET para cada ambiente

## 🛠️ Adicionando Novas Variáveis

Para adicionar uma nova variável ao sistema:

1. Adicione ao arquivo `.env.development`, `.env.staging` e `.env.production`
2. Adicione a interface `EnvironmentConfig` em `src/config/environment.ts`
3. Adicione a lógica de carregamento nos objetos `configs`
4. Use `config.novaVariavel` nos seus arquivos
