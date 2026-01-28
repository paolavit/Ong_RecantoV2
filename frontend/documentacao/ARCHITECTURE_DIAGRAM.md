# 🏗️ Arquitetura do Sistema de Ambientes

## Fluxo de Configuração

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICAÇÃO INICIA                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   webpack.config.js            │
        │   - Detecta NODE_ENV           │
        │   - Carrega .env.{NODE_ENV}    │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   .env.development             │
        │   .env.staging                 │
        │   .env.production              │
        │   (Variáveis carregadas)       │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   src/config/env.config.ts     │
        │   - Lê NODE_ENV                │
        │   - Retorna configuração       │
        │   - Exporta funções auxiliares │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   src/scripts/utils/api.ts     │
        │   - buildApiUrl()              │
        │   - Constrói URLs completas    │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   Todos os scripts/rotas       │
        │   - Usam buildApiUrl()         │
        │   - URLs dinâmicas             │
        └────────────────────────────────┘
```

## Estrutura de Arquivos

```
frontend/
│
├── 📄 .env.development
│   └─ NODE_ENV=development
│      REACT_APP_API_URL_DEVELOPMENT=http://localhost:3000
│
├── 📄 .env.staging
│   └─ NODE_ENV=staging
│      REACT_APP_API_URL_STAGING=https://api-staging.suaong.com.br
│
├── 📄 .env.production
│   └─ NODE_ENV=production
│      REACT_APP_API_URL_PRODUCTION=https://api.suaong.com.br
│
├── 📄 .env.example (✅ Sempre atualizar este)
│   └─ Exemplo com todas as variáveis disponíveis
│
├── 📄 webpack.config.js ✏️ (modificado)
│   └─ Carrega dotenv automaticamente
│
├── 📄 package.json ✏️ (modificado)
│   └─ Scripts para cada ambiente
│
├── src/
│   ├── config/
│   │   └── 📄 env.config.ts ✨ (novo)
│   │       └─ getConfig()
│   │         getApiBaseUrl()
│   │         getCurrentEnvironment()
│   │         isDebugMode()
│   │
│   └── scripts/
│       ├── utils/
│       │   ├── 📄 api.ts ✏️ (modificado)
│       │   │   └─ buildApiUrl() [NOVA]
│       │   ├── 📄 rotaAnimais.ts ✏️
│       │   ├── 📄 rotaLogin.ts ✏️
│       │   ├── 📄 rotaCadastroUsuarioComum.ts ✏️
│       │   ├── 📄 rotaCadastroVoluntario.ts ✏️
│       │   └── 📄 rotaPedidoAdocao.ts ✏️
│       │
│       ├── 📄 adocao.ts ✏️
│       ├── 📄 animaisAdotados.ts ✏️
│       ├── 📄 cadastroUsuario.ts ✏️
│       ├── 📄 cadastroVoluntario.ts ✏️
│       ├── 📄 cadastroAdm.ts ✏️
│       ├── 📄 pedidosAdocao.ts ✏️
│       │
│       └── services/
│           └── 📄 authService.ts ✏️
│
├── 📄 ENVIRONMENT_CONFIG.md ✨ (novo)
├── 📄 QUICK_START_ENVIRONMENTS.md ✨ (novo)
├── 📄 IMPLEMENTATION_CHECKLIST.md ✨ (novo)
└── 📄 SETUP_SUMMARY.md ✨ (novo)

Legenda:
✨ = Novo arquivo criado
✏️  = Arquivo modificado
```

## Fluxo de Requisição

```
┌─────────────────────────────────────┐
│   fetch(buildApiUrl('/api/petGet')) │
└────────────────┬────────────────────┘
                 │
                 ▼
    ┌──────────────────────────────┐
    │ buildApiUrl(endpoint)        │
    │ - Obtém getApiBaseUrl()      │
    │ - Concatena com endpoint     │
    │ - Retorna URL completa       │
    └────────────┬─────────────────┘
                 │
                 ▼
    ┌──────────────────────────────┐
    │ getApiBaseUrl()              │
    │ - Obtém config do ambiente   │
    │ - Retorna apiBaseUrl         │
    └────────────┬─────────────────┘
                 │
                 ▼
    ┌──────────────────────────────┐
    │ getConfig()                  │
    │ - Detecta NODE_ENV           │
    │ - Retorna config[NODE_ENV]   │
    └────────────┬─────────────────┘
                 │
         ┌───────┴────────┬────────────┐
         │                │            │
         ▼                ▼            ▼
    'development'  'staging'     'production'
         │                │            │
         ▼                ▼            ▼
    http://       https://api-  https://api.
    localhost:3000 staging....   suaong.com.br
```

## Exemplos de Uso

### Exemplo 1: Requisição GET
```typescript
import { buildApiUrl } from './utils/api';

// URL Construída Automaticamente
const url = buildApiUrl('/api/petGet');
// Desenvolvimento:   http://localhost:3000/api/petGet
// Staging:          https://api-staging.suaong.com.br/api/petGet
// Produção:         https://api.suaong.com.br/api/petGet

const response = await fetch(url);
```

### Exemplo 2: Imagem com URL Dinâmica
```typescript
// Antes (hardcoded)
<img src="http://localhost:3000/uploads/foto.jpg" />

// Depois (dinâmico)
<img src="${buildApiUrl('/uploads/foto.jpg')}" />
```

### Exemplo 3: Requisição POST
```typescript
import { buildApiUrl } from './utils/api';

fetch(buildApiUrl('/usuarios'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'João' })
});
```

## Comandos Por Ambiente

```bash
# DESENVOLVIMENTO
npm run dev              # Inicia servidor webpack-dev-server
                        # URL: http://localhost:3001
                        # API: http://localhost:3000

# HOMOLOGAÇÃO/STAGING
npm run dev:staging     # Inicia com config de staging
npm run build:staging   # Compila para staging
                        # API: https://api-staging.suaong.com.br

# PRODUÇÃO
npm run build           # Alias para build:prod (recomendado)
npm run build:prod      # Compila modo produção
npm run build:production # Alias também válido
                        # API: https://api.suaong.com.br
```

## Detecção de Ambiente

```typescript
// src/config/env.config.ts detecta baseado em:

1. NODE_ENV (variável de ambiente)
   - npm run dev           → NODE_ENV=development
   - npm run dev:staging   → NODE_ENV=staging
   - npm run build:prod    → NODE_ENV=production

2. Se não definido → Padrão é 'development'

3. Carrega arquivo .env.{NODE_ENV}
   - .env.development
   - .env.staging
   - .env.production
```

## Decisões de Design

### 1. Por que centralizar em env.config.ts?
- ✅ Único lugar para mudar configurações
- ✅ Fácil de testar e debugar
- ✅ Exporta funções bem documentadas
- ✅ Type-safe com TypeScript

### 2. Por que função buildApiUrl()?
- ✅ Adiciona trailing slash se necessário
- ✅ Evita duplicação de código
- ✅ Fácil de manter em um lugar
- ✅ Reutilizável em toda aplicação

### 3. Por que arquivos .env separados?
- ✅ Diferentes URLs por ambiente
- ✅ Variaveis de ambiente isoladas
- ✅ Facilita CI/CD
- ✅ Segurança (não commita .env)

## Segurança

### ✅ O que está protegido
- Arquivos `.env` locais não são commitados (.gitignore)
- URLs sensíveis em `.env.production` não são versionadas
- Cada desenvolvedor tem sua própria cópia local

### ⚠️ Importante para Produção
1. Configure URLs reais em `.env.production`
2. Não exponha variáveis sensíveis no frontend
3. Use HTTPS em todos os ambientes
4. Mantenha `.env.production` seguro no servidor

## Próximos Passos Recomendados

1. **Hoje:** Instale dependências com `npm install`
2. **Hoje:** Teste com `npm run dev`
3. **Esta semana:** Configure URLs reais de staging/produção
4. **Próxima semana:** Configure pipeline de CI/CD
5. **Quando pronto:** Deploy com `npm run build:prod`

---

**Documentação pronta para uso!** 🎉
