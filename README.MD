# 🎭 Sistema de Votação de Apresentações

Sistema completo de votação em tempo real para apresentações, com backend centralizado em Node.js e interface responsiva.

## ✨ Funcionalidades

- **Votação em tempo real** com Socket.IO
- **Controle de sessão** para evitar votos múltiplos
- **Interface responsiva** otimizada para mobile
- **Painel administrativo** separado
- **Tratamento de empates** automático
- **Notificações elegantes** com Toastify
- **Música de fundo** opcional
- **Design futurista** com fonte Orbitron

## 🚀 Deploy na Vercel

### 1. Preparação
Certifique-se de que todos os arquivos estão commitados no Git:
```bash
git add .
git commit -m "feat: preparação para deploy na Vercel"
git push
```

### 2. Deploy Automático
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Importe o repositório do GitHub
5. A Vercel detectará automaticamente a configuração do `vercel.json`
6. Clique em "Deploy"

### 3. Configuração Manual (Alternativo)
Se preferir usar a CLI da Vercel:
```bash
npm i -g vercel
vercel login
vercel
```

## 🛠️ Desenvolvimento Local

### Instalação
```bash
npm install
```

### Execução
```bash
npm start
```

### Desenvolvimento com auto-reload
```bash
npm run dev
```

## 📱 URLs de Acesso

- **Página Principal**: `http://localhost:3000`
- **Painel Admin**: `http://localhost:3000/admin`

## 🏗️ Estrutura do Projeto

```
site-lucas/
├── server.js          # Servidor Node.js com Express e Socket.IO
├── index.html         # Página principal de votação
├── admin.html         # Painel administrativo
├── vercel.json        # Configuração para deploy na Vercel
├── package.json       # Dependências e scripts
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Estilização**: CSS Grid, Flexbox, Media Queries
- **Notificações**: Toastify.js
- **Fontes**: Google Fonts (Orbitron)
- **Deploy**: Vercel

## 🎨 Características do Design

- **Responsivo**: Otimizado para desktop, tablet e mobile
- **Futurista**: Fonte Orbitron e gradientes
- **Interativo**: Animações e transições suaves
- **Acessível**: Contraste adequado e navegação por toque

## 🔒 Controle de Votos

- **Por sessão**: Cada navegador tem uma sessão única
- **Cookies seguros**: httpOnly e sameSite strict
- **Dupla verificação**: Frontend e backend
- **Reset automático**: Limpeza em novas rodadas

## 📊 Funcionalidades do Admin

- **Status em tempo real** da votação
- **Contagem de votos** por grupo
- **Lista de apresentados** em ordem
- **Controles de rodada**: encerrar, reiniciar
- **Acesso direto** à página de votação

## 🌐 Configuração de Produção

O `vercel.json` está configurado para:
- Roteamento automático de APIs
- Suporte a WebSocket via Socket.IO
- Timeout de 30 segundos para funções
- Ambiente de produção otimizado

## 📝 Notas Importantes

- O sistema funciona perfeitamente em redes compartilhadas
- Cada dispositivo tem controle independente de votos
- Interface adapta-se automaticamente ao tamanho da tela
- Música de fundo é opcional e pode ser ativada pelo usuário

## 🎯 Próximas Melhorias

- [ ] Persistência de dados em banco
- [ ] Autenticação para painel admin
- [ ] Histórico de votações
- [ ] Exportação de resultados
- [ ] Temas personalizáveis

---

**Desenvolvido com ❤️ para apresentações especiais!**