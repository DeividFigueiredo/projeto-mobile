import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { buscarUsuarios } from '../database/databaseMantis';
import { useEffect, useState } from 'react';
import { removerTodosUsuuarios, CriarTabelaProdutos, listarProd } from '../database/databaseMantis';

export default function DebugScreen({ onGoToLogin }) {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function init() {
      await buscarUsuarios(setUsuarios);
      
    }
    init();
  }, []);

  const handleAtualizar = async () => {
    await buscarUsuarios(setUsuarios);
  };
  const handleListarProdutos = async () => {
    await listarProd(setProdutos);
  };

  return (
    <View style={styles.container}>
      <Text>SQLite conectado! Usuários:</Text>
      {usuarios.map(u => (
        <Text key={u.id}>{u.nome}- {u.email} - {u.senha}</Text>
      ))}
      <Button title="Atualizar lista" onPress={handleAtualizar} />
      <Button title="Voltar ao Login" onPress={onGoToLogin} />
      <Button title="Remover todos usuários" onPress={async () => {
        await removerTodosUsuuarios(() => {
          setUsuarios([]);
          alert('Todos os usuários foram removidos!');
        });
      }} />
      <Button title="Adicionar tabela prd" onPress={async () => {
        await CriarTabelaProdutos(() => {
          alert('tabela adicionada');
        });
      }} />
      <Button title="Listar Produtos" onPress={handleListarProdutos} />
      <Text style={{marginTop: 20}}>Produtos:</Text>
      {produtos.map(p => (
        <Text key={p.id}>{p.nome} - {p.descricao} - R$ {p.preco}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});