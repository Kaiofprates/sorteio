# 🚀 Instruções Rápidas - Sistema de Votação

## ⚡ Início Rápido

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```
   Ou execute o arquivo `iniciar.bat` (Windows)

3. **Acessar:**
   - **Votação**: http://localhost:3000
   - **Admin**: http://localhost:3000/admin

## 📱 URLs do Sistema

| Função | URL | Descrição |
|--------|-----|-----------|
| Votação | `http://localhost:3000` | Página principal para os participantes votarem |
| Admin | `http://localhost:3000/admin` | Painel administrativo para controle |

## 🎭 Como Usar

### Para os Participantes:
1. Acesse `http://localhost:3000`
2. Veja o status de conexão (🟢 Conectado)
3. Clique no grupo que deseja votar
4. Acompanhe os votos em tempo real

### Para o Administrador:
1. Acesse `http://localhost:3000/admin`
2. Monitore os votos em tempo real
3. Clique em "Encerrar Votação da Rodada" quando quiser
4. Use "Reiniciar Votação" para começar do zero

## 🔧 Comandos Úteis

```bash
# Desenvolvimento (auto-reload)
npm run dev

# Parar servidor
Ctrl + C

# Verificar se está rodando
curl http://localhost:3000/api/estado
```

## 📞 Suporte

- Status de conexão visível no canto superior direito
- Alertas automáticos para ações importantes
- Confirmações antes de ações críticas 