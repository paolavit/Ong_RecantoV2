# Guia de Deploy

Este documento explica como fazer deploy da aplicação em diferentes plataformas.

## 📦 Build para Produção

```bash
npm run build
```

Isso gera a pasta `dist/` com todos os arquivos prontos para deploy. O arquivo `index.html` estará na raiz de `dist/`.

## 🌐 Estrutura de Deploy

Após o build, a pasta `dist/` contém:

```
dist/
├── index.html           ← Página principal (raiz)
├── adocao.html
├── apadrinhar.html
├── voluntario.html
├── contato.html
├── login.html
├── js/
│   └── main.js          ← Script principal compilado
├── assets/              ← Imagens e recursos
├── .htaccess            ← Para Apache
├── web.config           ← Para IIS
└── (arquivos estáticos)
```

## 🚀 Opções de Deploy

### 1. **Netlify** (Recomendado para iniciar)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

Ou conecte seu repositório Git para deploy automático. O arquivo `netlify.toml` já está configurado.

### 2. **Vercel** (Alternativa)

```bash
npm install -g vercel
npm run build
vercel --prod
```

O arquivo `vercel.json` já está configurado.

### 3. **GitHub Pages**

1. Configure seu repositório
2. Vá em Settings → Pages
3. Selecione branch e pasta `dist/`
4. Deploy automático em cada push

### 4. **Servidor Apache**

1. Upload da pasta `dist/` para seu servidor
2. O arquivo `.htaccess` já está incluído para reescrita de URLs
3. Certifique-se que `mod_rewrite` está habilitado

Configuração no `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

### 5. **Servidor IIS** (Windows)

1. Upload da pasta `dist/` para seu servidor
2. O arquivo `web.config` já está incluído
3. Certifique-se que `URL Rewrite Module` está instalado

### 6. **Node.js/Express** (Seu Backend)

Se quiser servir a partir do seu backend Node.js:

```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Rota catch-all para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('Servidor rodando!'));
```

## ✅ Checklist de Deploy

- [ ] Rodou `npm run build`
- [ ] Verificou se `dist/index.html` existe e é acessível na raiz
- [ ] Testou as páginas no ambiente local (`npm run dev`)
- [ ] URLs relativas estão corretas (./arquivo.html)
- [ ] Imagens em `assets/` estão sendo carregadas
- [ ] Scripts TypeScript estão funcionando

## 🔍 Testando Localmente

```bash
# Instalar http-server globalmente
npm install -g http-server

# Servir a pasta dist
http-server dist

# Acesse http://localhost:8080
```

## 📝 Variáveis de Ambiente

Se precisar de variáveis de ambiente em produção (como URL da API), crie um arquivo `.env`:

```
REACT_APP_API_URL=https://api.seu-dominio.com
```

Depois atualize seu código para usar:

```typescript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## 🆘 Troubleshooting

**Problema**: Páginas retornam 404
- **Solução**: Verifique se `.htaccess` ou `web.config` está configurado corretamente

**Problema**: Assets não carregam
- **Solução**: Verifique os caminhos relativos (use `./assets/...`)

**Problema**: JavaScript não funciona
- **Solução**: Verifique o console do navegador (F12) para erros

---

**Dúvidas?** Consulte a documentação da sua plataforma de hosting.
