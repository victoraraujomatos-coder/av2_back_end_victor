const express = require('express');
const app = express();
app.use(express.json());

let filmes = [
  { id: 1, titulo: "O Poderoso Chefão", genero: "Drama", ano: 1972, duracao: 175 },
  { id: 2, titulo: "Interestelar", genero: "Ficção Científica", ano: 2014, duracao: 169 },
  { id: 3, titulo: "Matrix", genero: "Ação", ano: 1999, duracao: 136 }
];

let usuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com", plano: "Premium" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", plano: "Básico" }
];

let favoritos = [
  { id: 1, id_usuario: 1, id_filme: 1, data: "2024-01-15" },
  { id: 2, id_usuario: 1, id_filme: 3, data: "2024-02-20" },
  { id: 3, id_usuario: 2, id_filme: 2, data: "2024-03-10" }
];

let idFilme = 4;
let idUsuario = 3;
let idFavorito = 4;

// PÁGINA PRINCIPAL COM TODOS OS LINKS
app.get('/', (req, res) => {
  res.json({
    mensagem: "Bem-vindo à API CineStream!",
    link_principal: "http://localhost:3000",
    rotas: {
      filmes: {
        ver_todos: "GET http://localhost:3000/filmes",
        adicionar: "POST http://localhost:3000/filmes/add",
        atualizar: "PUT http://localhost:3000/filmes/update/1",
        deletar: "DELETE http://localhost:3000/filmes/delete/1"
      },
      usuarios: {
        ver_todos: "GET http://localhost:3000/usuarios",
        adicionar: "POST http://localhost:3000/usuarios/add",
        atualizar: "PUT http://localhost:3000/usuarios/update/1",
        deletar: "DELETE http://localhost:3000/usuarios/delete/1"
      },
      favoritos: {
        ver_todos: "GET http://localhost:3000/favoritos",
        adicionar: "POST http://localhost:3000/favoritos/add",
        ver_por_usuario: "GET http://localhost:3000/favoritos/usuario/1",
        deletar: "DELETE http://localhost:3000/favoritos/delete/1"
      }
    }
  });
});

// ============ FILMES ============

app.get('/filmes', (req, res) => {
  res.json(filmes);
});

app.post('/filmes/add', (req, res) => {
  const { titulo, genero, ano, duracao } = req.body;
  const novoFilme = { id: idFilme++, titulo, genero, ano, duracao };
  filmes.push(novoFilme);
  res.json(novoFilme);
});

app.put('/filmes/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const filme = filmes.find(f => f.id === id);
  const { titulo, genero, ano, duracao } = req.body;
  if (titulo) filme.titulo = titulo;
  if (genero) filme.genero = genero;
  if (ano) filme.ano = ano;
  if (duracao) filme.duracao = duracao;
  res.json(filme);
});

app.delete('/filmes/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = filmes.findIndex(f => f.id === id);
  const filmeRemovido = filmes.splice(index, 1)[0];
  res.json(filmeRemovido);
});

// ============ USUÁRIOS ============

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios/add', (req, res) => {
  const { nome, email, plano } = req.body;
  const novoUsuario = { id: idUsuario++, nome, email, plano };
  usuarios.push(novoUsuario);
  res.json(novoUsuario);
});

app.put('/usuarios/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  const { nome, email, plano } = req.body;
  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;
  if (plano) usuario.plano = plano;
  res.json(usuario);
});

app.delete('/usuarios/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  const usuarioRemovido = usuarios.splice(index, 1)[0];
  res.json(usuarioRemovido);
});

// ============ FAVORITOS ============

app.get('/favoritos', (req, res) => {
  res.json(favoritos);
});

app.post('/favoritos/add', (req, res) => {
  const { id_usuario, id_filme } = req.body;
  const novoFavorito = { 
    id: idFavorito++, 
    id_usuario, 
    id_filme, 
    data: new Date().toISOString().split('T')[0] 
  };
  favoritos.push(novoFavorito);
  res.json(novoFavorito);
});

app.get('/favoritos/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const favoritosUsuario = favoritos.filter(f => f.id_usuario === id);
  res.json(favoritosUsuario);
});

app.delete('/favoritos/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = favoritos.findIndex(f => f.id === id);
  const favoritoRemovido = favoritos.splice(index, 1)[0];
  res.json(favoritoRemovido);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando: http://localhost:3000");
});