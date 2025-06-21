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