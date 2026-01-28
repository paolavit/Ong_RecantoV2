# 🚀 Configuração de Ambientes - Projeto ONG

Este documento descreve como configurar e usar diferentes ambientes (Desenvolvimento, Homologação e Produção) para a aplicação.

## 📋 Estrutura de Configuração

A aplicação agora possui um sistema centralizado de configuração que permite trocar entre ambientes facilmente.

### Arquivos de Configuração

```
frontend/
├── .env.development      # Variáveis para DESENVOLVIMENTO
├── .env.staging          # Variáveis para HOMOLOGAÇÃO
├── .env.production       # Variáveis para PRODUÇÃO
├── .env.example          # Exemplo com todas as variáveis disponíveis
└── src/
    └── config/
        └── env.config.ts # Arquivo central de configuração
```

## 🔧 Configurar um Ambiente

### 1. **DESENVOLVIMENTO (Padrão)**

```bash
# Instalar dependências (se ainda não fez)
npm install

# Executar em modo desenvolvimento
npm run dev
```

**Arquivo:** `.env.development`
```env
NODE_ENV=development
REACT_APP_API_URL_DEVELOPMENT=http://localhost:3000
```

### 2. **HOMOLOGAÇÃO (Staging)**

```bash
# Compilar para staging
npm run build:staging

# Ou executar servidor de desenvolvimento com staging
npm run dev:staging
```

**Arquivo:** `.env.staging`
```env
NODE_ENV=staging
REACT_APP_API_URL_STAGING=https://api-staging.suaong.com.br
```

### 3. **PRODUÇÃO**

```bash
# Compilar para produção
npm run build:prod
```

**Arquivo:** `.env.production`
```env
NODE_ENV=production
REACT_APP_API_URL_PRODUCTION=https://api.suaong.com.br
```

## 📝 Scripts NPM Disponíveis

| Comando | Ambiente | Descrição |
|---------|----------|-----------|
| `npm run dev` | development | Inicia servidor de desenvolvimento (localhost:3000) |
| `npm run dev:staging` | staging | Inicia servidor de desenvolvimento com config staging |
| `npm run build` | production | Compila para produção (padrão) |
| `npm run build:dev` | development | Compila para desenvolvimento |
| `npm run build:staging` | staging | Compila para homologação |
| `npm run build:prod` | production | Compila para produção |

## 🔄 Como a Configuração Funciona

### 1. **Detecção Automática**

O arquivo `src/config/env.config.ts` detecta automaticamente o ambiente:

```typescript
import { getApiBaseUrl, getCurrentEnvironment } from '../config/env.config';

// Obter URL base da API
const apiUrl = getApiBaseUrl(); // http://localhost:3000 ou https://api-staging...

// Obter ambiente atual
const env = getCurrentEnvironment(); // 'development', 'staging' ou 'production'

// Verificar modo debug
if (isDebugMode()) {
  console.log('Modo debug ativado');
}
```

### 2. **Uso em Requisições**

Todos os arquivos de rotas foram atualizados para usar a função `buildApiUrl()`:

```typescript
import { buildApiUrl } from './api';

// Antes (hardcoded):
fetch('http://localhost:3000/api/petGet')

// Depois (com configuração):
fetch(buildApiUrl('/api/petGet'))
```

### 3. **Integração com Webpack**

O `webpack.config.js` carrega as variáveis de ambiente automaticamente:

```javascript
const environment = process.env.NODE_ENV || 'development';
const envFile = path.resolve(__dirname, `.env.${environment}`);

dotenv.config({ path: envFile });
```

## 🌐 URLs de API por Ambiente

### Desenvolvimento
- **URL Base:** `http://localhost:3000`
- **Uso:** Local, durante o desenvolvimento

### Homologação (Staging)
- **URL Base:** `https://api-staging.suaong.com.br`
- **Uso:** Testes antes de produção

### Produção
- **URL Base:** `https://api.suaong.com.br`
- **Uso:** Aplicação em produção

**⚠️ IMPORTANTE:** Atualize as URLs reais no arquivo `.env.staging` e `.env.production` com os domínios corretos da sua infraestrutura.

## 📦 Adicionar Novas Variáveis de Ambiente

Se precisar adicionar mais variáveis (ex: chave de API, timeouts, etc.):

### 1. Adicione ao arquivo `.env.example`
```env
REACT_APP_API_TIMEOUT=30000
REACT_APP_LOG_LEVEL=info
```

### 2. Adicione aos arquivos `.env.*`
```env
REACT_APP_API_TIMEOUT=30000
REACT_APP_LOG_LEVEL=debug
```

### 3. Atualize `src/config/env.config.ts`
```typescript
interface EnvironmentConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  environment: 'development' | 'staging' | 'production';
  debug: boolean;
}

const configs: Record<string, EnvironmentConfig> = {
  development: {
    apiBaseUrl: 'http://localhost:3000',
    apiTimeout: 30000,
    logLevel: 'debug',
    environment: 'development',
    debug: true,
  },
  // ... outros ambientes
};
```

### 4. Crie funções de acesso
```typescript
export function getApiTimeout(): number {
  return getConfig().apiTimeout;
}

export function getLogLevel(): string {
  return getConfig().logLevel;
}
```

## 🔍 Verificar Configuração Atual

Execute no console do navegador:

```javascript
// Verificar ambiente
import { getCurrentEnvironment, getApiBaseUrl } from './src/config/env.config.ts';

console.log(getCurrentEnvironment()); // 'development'
console.log(getApiBaseUrl()); // 'http://localhost:3000'
```

Ou verifique os logs na compilação:
```
📦 Compilando para ambiente: development
📄 Carregando arquivo: .env.development
```

## 🚨 Troubleshooting

### Variáveis não carregando?

1. Certifique-se que o arquivo `.env.{environment}` existe
2. Verifique se `NODE_ENV` está sendo definido corretamente
3. Limpe o cache: `npm run build:dev` depois `npm run dev`

### Arquivo .env.production não encontrado?

Crie o arquivo com:
```bash
# Windows
copy .env.example .env.production

# Linux/Mac
cp .env.example .env.production
```

## 📌 Checklist para Deploy

- [ ] Atualize as URLs de API nos arquivos `.env.staging` e `.env.production`
- [ ] Defina `debug: false` para produção
- [ ] Execute `npm run build:prod` antes de fazer deploy
- [ ] Teste as URLs em cada ambiente
- [ ] Verifique se as variáveis de ambiente são carregadas corretamente

## 📚 Referências

- [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
- [dotenv documentation](https://github.com/motdotla/dotenv)
- [Node.js Environment Variables](https://nodejs.org/en/learn/how-to-work-with-environmental-variables)
