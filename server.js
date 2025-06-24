const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Estado global da votação
let estadoVotacao = {
  grupos: ["Rosa", "Verde", "Vermelho", "Amarelo"],
  apresentados: [],
  votos: {},
  totalVotos: 0,
  votacaoAtiva: true,
  rodadaAtual: 1,
  ultimoVencedor: null
};

// Controle de sessões que já votaram na rodada atual
let sessoesVotaramRodada = new Set();

// Função para inicializar votos da rodada atual
function inicializarVotosRodada() {
  const restantes = estadoVotacao.grupos.filter(g => !estadoVotacao.apresentados.includes(g));
  estadoVotacao.votos = {};
  estadoVotacao.totalVotos = 0;
  restantes.forEach(grupo => {
    estadoVotacao.votos[grupo] = 0;
  });
  // Limpar registro de sessões que votaram
  sessoesVotaramRodada.clear();
}

// Inicializar primeira rodada
inicializarVotosRodada();

// Rotas da API
app.get('/api/estado', (req, res) => {
  res.json(estadoVotacao);
});

app.post('/api/votar', (req, res) => {
  const { grupo } = req.body;
  
  // Gerar ou obter ID de sessão único
  let sessionId = req.cookies?.sessionId;
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    res.cookie('sessionId', sessionId, { 
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      httpOnly: true,
      secure: false, // false para desenvolvimento local
      sameSite: 'strict'
    });
  }
  
  if (!estadoVotacao.votacaoAtiva) {
    return res.status(400).json({ erro: 'Votação encerrada' });
  }
  
  if (!estadoVotacao.votos.hasOwnProperty(grupo)) {
    return res.status(400).json({ erro: 'Grupo inválido' });
  }
  
  // Verificar se esta sessão já votou na rodada atual
  if (sessoesVotaramRodada.has(sessionId)) {
    return res.status(400).json({ erro: 'Você já votou nesta rodada' });
  }
  
  estadoVotacao.votos[grupo]++;
  estadoVotacao.totalVotos++;
  
  // Registrar que esta sessão já votou na rodada atual
  sessoesVotaramRodada.add(sessionId);
  
  // Emitir atualização para todos os clientes
  io.emit('votoRegistrado', {
    grupo,
    votos: estadoVotacao.votos,
    totalVotos: estadoVotacao.totalVotos
  });
  
  res.json({ 
    sucesso: true, 
    mensagem: `Voto computado para o grupo ${grupo}`,
    votos: estadoVotacao.votos,
    totalVotos: estadoVotacao.totalVotos
  });
});

app.post('/api/encerrar-rodada', (req, res) => {
  if (!estadoVotacao.votacaoAtiva) {
    return res.status(400).json({ erro: 'Votação já encerrada' });
  }
  
  // Encontrar vencedor
  let vencedor = null;
  let maxVotos = -1;
  let empate = false;
  let gruposEmpatados = [];
  
  for (let grupo in estadoVotacao.votos) {
    if (estadoVotacao.votos[grupo] > maxVotos) {
      maxVotos = estadoVotacao.votos[grupo];
      vencedor = grupo;
      gruposEmpatados = [grupo];
      empate = false;
    } else if (estadoVotacao.votos[grupo] === maxVotos) {
      gruposEmpatados.push(grupo);
      empate = true;
    }
  }
  
  if (!vencedor) {
    return res.status(400).json({ erro: 'Nenhum voto foi registrado nesta rodada' });
  }
  
  // Verificar se há empate
  if (empate && gruposEmpatados.length > 1) {
    // Em caso de empate, reiniciar a rodada
    inicializarVotosRodada();
    
    io.emit('empateDetectado', {
      gruposEmpatados: gruposEmpatados,
      votosEmpate: maxVotos,
      rodadaAtual: estadoVotacao.rodadaAtual
    });
    
    return res.json({
      sucesso: true,
      empate: true,
      gruposEmpatados: gruposEmpatados,
      votosEmpate: maxVotos,
      mensagem: `Empate detectado! ${gruposEmpatados.join(', ')} com ${maxVotos} votos cada. Rodada reiniciada.`
    });
  }
  
  // Adicionar vencedor à lista de apresentados
  estadoVotacao.apresentados.push(vencedor);
  
  // Armazenar informações do último vencedor
  estadoVotacao.ultimoVencedor = {
    grupo: vencedor,
    votos: maxVotos,
    rodada: estadoVotacao.rodadaAtual
  };
  
  // Emitir evento de grupo vencedor para remover botão imediatamente
  io.emit('grupoVencedor', {
    vencedor: vencedor,
    votos: maxVotos
  });
  
  // Verificar se ainda há grupos para votar
  const restantes = estadoVotacao.grupos.filter(g => !estadoVotacao.apresentados.includes(g));
  
  if (restantes.length === 0) {
    // Todas as apresentações foram definidas
    estadoVotacao.votacaoAtiva = false;
    io.emit('votacaoFinalizada', {
      apresentados: estadoVotacao.apresentados,
      ultimoVencedor: estadoVotacao.ultimoVencedor
    });
  } else {
    // Iniciar próxima rodada
    estadoVotacao.rodadaAtual++;
    inicializarVotosRodada();
    io.emit('novaRodada', {
      vencedor,
      maxVotos,
      restantes: restantes,
      rodadaAtual: estadoVotacao.rodadaAtual,
      ultimoVencedor: estadoVotacao.ultimoVencedor
    });
  }
  
  res.json({
    sucesso: true,
    vencedor,
    maxVotos,
    apresentados: estadoVotacao.apresentados,
    votacaoAtiva: estadoVotacao.votacaoAtiva,
    empate: false
  });
});

app.post('/api/reiniciar', (req, res) => {
  estadoVotacao = {
    grupos: ["Rosa", "Verde", "Vermelho", "Amarelo"],
    apresentados: [],
    votos: {},
    totalVotos: 0,
    votacaoAtiva: true,
    rodadaAtual: 1,
    ultimoVencedor: null
  };
  
  inicializarVotosRodada();
  
  io.emit('votacaoReiniciada', estadoVotacao);
  
  res.json({ sucesso: true, estado: estadoVotacao });
});

// Socket.IO para comunicação em tempo real
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);
  
  // Enviar estado atual para o novo cliente
  socket.emit('estadoAtual', estadoVotacao);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para o painel administrativo
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🎭 Sistema de votação ativo!`);
}); 