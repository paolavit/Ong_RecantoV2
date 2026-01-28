# ⚙️ Guia Rápido de Ambientes

## Comandos Principais

```bash
# Desenvolvimento (default)
npm run dev                # Inicia servidor em http://localhost:3001

# Homologação
npm run dev:staging        # Inicia servidor com config staging
npm run build:staging      # Compila para staging

# Produção
npm run build:prod         # Compila para produção
npm run build              # Alias para build:prod
```

## Variáveis de Ambiente

Cada ambiente tem seu próprio arquivo:

### `.env.development`
```env
NODE_ENV=development
REACT_APP_API_URL_DEVELOPMENT=http://localhost:3000
```

### `.env.staging`
```env
NODE_ENV=staging
REACT_APP_API_URL_STAGING=https://api-staging.suaong.com.br
```

### `.env.production`
```env
NODE_ENV=production
REACT_APP_API_URL_PRODUCTION=https://api.suaong.com.br
```

## Usar em Código TypeScript

```typescript
import { buildApiUrl, getApiBaseUrl, getCurrentEnvironment } from '../config/env.config';

// Construir URL de API
const url = buildApiUrl('/api/petGet');  // Retorna URL completa baseada no ambiente

// Obter URL base
const base = getApiBaseUrl();  // 'http://localhost:3000' ou 'https://api-staging...'

// Verificar ambiente atual
const env = getCurrentEnvironment();  // 'development', 'staging', 'production'

// Usar em requisições
fetch(buildApiUrl('/usuarios'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'João' })
});
```

## Fluxo de Deploy

```
1. Desenvolvimento Local
   npm run dev  →  http://localhost:3001

2. Testes em Staging
   npm run build:staging  →  Deploy em staging
   
3. Produção
   npm run build:prod  →  Deploy em produção
```

## Arquivos Alterados

✅ Todos os `fetch()` foram atualizados para usar `buildApiUrl()`

- ✅ `src/scripts/utils/api.ts` - Adicionado `buildApiUrl()`
- ✅ `src/scripts/utils/rotaAnimais.ts`
- ✅ `src/scripts/utils/rotaLogin.ts`
- ✅ `src/scripts/utils/rotaCadastroUsuarioComum.ts`
- ✅ `src/scripts/utils/rotaCadastroVoluntario.ts`
- ✅ `src/scripts/utils/rotaPedidoAdocao.ts`
- ✅ `src/scripts/pedidosAdocao.ts`
- ✅ `webpack.config.js` - Carrega `.env.*` automaticamente
- ✅ `package.json` - Scripts para cada ambiente

## Troubleshooting

**Problema:** "Arquivo .env.production não encontrado"
```bash
# Solução:
copy .env.example .env.production  # Windows
cp .env.example .env.production    # Linux/Mac
```

**Problema:** URL de API errada
```typescript
// Verificar qual URL está sendo usada:
console.log(getApiBaseUrl());
```

**Problema:** Variáveis não carregando
```bash
# Limpar cache e reconstruir:
npm run build:dev
npm run dev
```

---

📖 Para mais informações, veja `ENVIRONMENT_CONFIG.md`
