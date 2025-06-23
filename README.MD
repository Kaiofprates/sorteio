# 🎭 Sistema de Votação de Apresentações

Sistema de votação em tempo real para escolher a ordem das apresentações dos grupos. Agora com backend centralizado para sincronização entre todos os participantes.

## ✨ Funcionalidades

- **Votação em tempo real**: Todos os participantes veem os votos atualizados instantaneamente
- **Sincronização centralizada**: Backend Node.js gerencia todos os votos
- **Interface responsiva**: Design moderno e intuitivo
- **Música de fundo**: Playlist automática durante a votação
- **Efeitos sonoros**: Sons para cliques e vencedores
- **Painel administrativo**: Controle da votação pelo administrador
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

3. Acesse no navegador: `http://localhost:3000`

## 📱 Como funciona

### Para os participantes:
1. Acesse o site no navegador
2. Veja o status de conexão no canto superior direito
3. Clique no grupo que deseja votar
4. Acompanhe os votos em tempo real
5. Aguarde o anúncio do vencedor

### Para o administrador:
1. Acompanhe os votos em tempo real
2. Clique em "Encerrar Votação da Rodada" quando quiser finalizar
3. O sistema automaticamente:
   - Anuncia o vencedor
   - Toca o som de vitória
   - Avança para a próxima música
   - Inicia a próxima rodada
4. Ao final, pode reiniciar a votação

## 🔧 Tecnologias utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Tempo real**: Socket.IO
- **Estilização**: CSS customizado com fonte Orbitron
- **Áudio**: Web Audio API

## 📁 Estrutura do projeto

```
site-lucas/
├── index.html          # Interface principal
├── server.js           # Servidor backend
├── package.json        # Dependências e scripts
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