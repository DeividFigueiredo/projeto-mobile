import * as SQLite from 'expo-sqlite';

// Atenção: openDatabaseAsync retorna uma Promise!
export async function getDb() {
  return await SQLite.openDatabaseAsync('EcoCy.db');
}