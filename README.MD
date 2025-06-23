# 🎭 Sistema de Votação de Apresentações

Sistema de votação em tempo real para escolher a ordem das apresentações dos grupos. Agora com backend centralizado para sincronização entre todos os participantes e painel administrativo separado.

## ✨ Funcionalidades

- **Votação em tempo real**: Todos os participantes veem os votos atualizados instantaneamente
- **Sincronização centralizada**: Backend Node.js gerencia todos os votos
- **Painel administrativo separado**: Interface dedicada para controle da votação
- **Notificações elegantes**: Toastify para alertas e notificações em tempo real
- **Interface responsiva**: Design moderno e intuitivo
- **Música de fundo**: Playlist automática durante a votação
- **Efeitos sonoros**: Sons para cliques e vencedores
- **Status de conexão**: Indicador visual de conectividade

## 🚀 Como usar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone ou baixe o projeto
2. Abra o terminal na pasta do projeto
3. Instale as dependências:

```bash
npm install
```

### Executando o projeto

1. Inicie o servidor:

```bash
npm start
```

2. Para desenvolvimento (com auto-reload):

```bash
npm run dev
```

3. Acesse no navegador:
   - **Página de votação**: `http://localhost:3000`
   - **Painel administrativo**: `http://localhost:3000/admin`

## 📱 Como funciona

### Para os participantes:
1. Acesse `http://localhost:3000` no navegador
2. Veja o status de conexão no canto superior direito
3. Clique no grupo que deseja votar
4. Acompanhe os votos em tempo real
5. Aguarde o anúncio do vencedor

### Para o administrador:
1. Acesse `http://localhost:3000/admin` no navegador
2. Monitore em tempo real:
   - Status da votação
   - Votos da rodada atual
   - Grupos já apresentados
   - Total de votos
3. Use os botões para:
   - **Encerrar Votação da Rodada**: Finaliza a rodada atual
   - **Reiniciar Votação Completa**: Reseta todo o sistema
   - **Abrir Página de Votação**: Abre a página principal em nova aba

## 🔧 Tecnologias utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Tempo real**: Socket.IO
- **Notificações**: Toastify.js
- **Estilização**: CSS customizado com fonte Orbitron
- **Áudio**: Web Audio API

## 📁 Estrutura do projeto

```
site-lucas/
├── index.html          # Interface principal de votação
├── admin.html          # Painel administrativo
├── server.js           # Servidor backend
├── package.json        # Dependências e scripts
├── iniciar.bat         # Script de inicialização (Windows)
└── README.MD          # Este arquivo
```

## 🎵 Músicas incluídas

O sistema inclui uma playlist automática com 4 músicas que rodam em loop durante a votação.

## 🔄 API Endpoints

- `GET /api/estado` - Retorna o estado atual da votação
- `POST /api/votar` - Registra um voto para um grupo
- `POST /api/encerrar-rodada` - Finaliza a rodada atual
- `POST /api/reiniciar` - Reinicia toda a votação

## 🌐 Eventos Socket.IO

- `estadoAtual` - Estado inicial enviado ao conectar
- `votoRegistrado` - Novo voto registrado
- `novaRodada` - Início de nova rodada
- `votacaoFinalizada` - Votação completamente finalizada
- `votacaoReiniciada` - Votação reiniciada

## 🎨 Personalização

Você pode personalizar:
- Cores e estilos no CSS
- Lista de grupos no arquivo `server.js`
- Músicas de fundo no array `musicas`
- Sons de efeitos nos elementos `<audio>`

## 📝 Licença

MIT License - Sinta-se livre para usar e modificar!