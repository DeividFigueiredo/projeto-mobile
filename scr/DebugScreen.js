import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { buscarUsuarios } from '../database/databaseMantis';
import { useEffect, useState } from 'react';

export default function DebugScreen() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function init() {
      await buscarUsuarios(setUsuarios);
    }
    init();
  }, []);

  const handleAtualizar = async () => {
    await buscarUsuarios(setUsuarios);
  };

  return (
    <View style={styles.container}>
      <Text>SQLite conectado! Usuários:</Text>
      {usuarios.map(u => (
        <Text key={u.id}>{u.nome}- {u.email} - {u.senha}</Text>
      ))}
      <Button title="Atualizar lista" onPress={handleAtualizar} />
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