import { getDb } from './databaseConex';

// Criar tabela
export async function criarTabelaUsuarios() {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      senha TEXT
    );
  `);
}

export async function CriarTabelaProdutos() {
  try {
    console.log('Tentando criar tabela produtos...');
    const db = await getDb();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome varchar(50),
        descricao varchar(255),
        preco REAL,
        categoria varchar(50)
      );
    `);
    console.log('Tabela produtos criada ou já existe.');
  } catch (e) {
    console.log('Erro ao criar tabela produtos:', e);
    throw e;
  }
}
// Adicionar usuário (ordem correta dos parâmetros)
export async function adicionarUsuario(nome, email, senha, callback) {
  try {
    const db = await getDb();
    await db.runAsync('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);', [nome, email, senha]);
    if (callback) callback();
  } catch (e) {
    console.log('Erro ao adicionar usuário:', e);
  }
}

// Remover todos os usuários (comando correto)
export async function removerTodosUsuuarios(callback) {
  const db = await getDb();
  await db.runAsync('DELETE FROM usuarios;');
  if (callback) callback();
}

// Buscar usuários
export async function buscarUsuarios(callback) {
  const db = await getDb();
  const usuarios = await db.getAllAsync('SELECT * FROM usuarios;');
  if (callback) callback(usuarios);
}

export async function listarProd(callback) {
  const db = await getDb();
  const produtos = await db.getAllAsync('SELECT * FROM produtos;');
  if (callback) callback(produtos);
}

export async function adicionarProduto(produto, callback) {
  const db = await getDb();
  await db.runAsync(
    'INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?);',
    [produto.nome, produto.descricao, produto.preco, produto.categoria]
  );
  if (callback) callback();
}

export async function atualizarProduto(id, produto, callback) {
  const db = await getDb();
  await db.runAsync(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?;',
    [produto.nome, produto.descricao, produto.preco, produto.categoria, id]
  );
  if (callback) callback();
}
export async function removerProduto(id, callback) {
  const db = await getDb();
  await db.runAsync('DELETE FROM produtos WHERE id = ?;', [id]);
  if (callback) callback();
}
export async function buscarProdutoPorId(id, callback) {
  const db = await getDb();
  const produto = await db.getAsync('SELECT * FROM produtos WHERE id = ?;', [id]);
  if (callback) callback(produto);
}