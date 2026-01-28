# Frontend - ONG Recanto dos Animais

Projeto frontend desenvolvido com **TypeScript**, **Webpack** e **Tailwind CSS** com navegação **multi-página** (não SPA).

## 📁 Estrutura de Pastas

```
src/
├── pages/                    # Páginas HTML (cada página é uma rota)
│   ├── index.html           # Home
│   ├── adocao.html          # Adoção
│   ├── apadrinhar.html      # Apadrinhar
│   ├── voluntario.html      # Voluntário
│   ├── contato.html         # Contato
│   └── login.html           # Login
│
├── scripts/                 # Lógica TypeScript
│   ├── utils/               # Funções utilitárias
│   │   └── api.ts           # Funções de API e utilitários
│   └── services/            # Serviços da aplicação
│       └── authService.ts   # Serviço de autenticação
│
├── styles/                  # Arquivos CSS
│   └── global.css          # Estilos globais
│
├── assets/                  # Imagens, ícones, etc.
│
├── index.ts                 # Ponto de entrada (script global)
└── index.html              # ❌ Removido (agora em pages/)

dist/                        # Arquivos compilados (gerado automaticamente)
```

## 🚀 Instalação

```bash
npm install
```

## 💻 Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🔨 Build para Produção

```bash
npm run build
```

## 📄 Páginas Disponíveis

- **Home** (`/index.html`) - Página inicial
- **Adoção** (`/adocao.html`) - Lista de animais para adoção
- **Apadrinhar** (`/apadrinhar.html`) - Programa de apadrinhamento
- **Voluntário** (`/voluntario.html`) - Formulário de voluntário
- **Contato** (`/contato.html`) - Página de contato
- **Login** (`/login.html`) - Página de login

## ⚙️ Configuração

- `tsconfig.json` - Configuração do TypeScript
- `webpack.config.js` - Configuração do Webpack (suporte a múltiplas páginas HTML)
- `package.json` - Dependências do projeto

## 📦 Tecnologias

- **TypeScript** - Linguagem tipada para JavaScript
- **Webpack** - Bundler de módulos com suporte a múltiplas páginas
- **Tailwind CSS** - Framework de CSS utilitário
- **Webpack Dev Server** - Servidor de desenvolvimento com hot reload

## 🔄 Migração do Mustache

✅ Removidas todas as referências ao Mustache
✅ Convertidas para navegação clássica (multi-página)
✅ Links navegáveis entre páginas
✅ HTML estático pré-renderizado

## 📝 Como Adicionar Nova Página

1. Crie um arquivo `.html` em `src/pages/`
2. O Webpack detectará automaticamente
3. Acesse em `http://localhost:3000/seu-arquivo.html`
4. Adicione um link de navegação no header

Exemplo:
```html
<!-- src/pages/nova-pagina.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Página</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- Seu conteúdo aqui -->
</body>
</html>
```

