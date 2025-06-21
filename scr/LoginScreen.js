import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { buscarUsuarios } from '../database/databaseMantis';

export default function LoginScreen({ onGoToRegister }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async () => {
    await buscarUsuarios(users => {
      const user = users.find(u => u.email === email && u.senha === senha);
      if (user) {
        setMensagem(`Bem-vindo, ${user.nome}!`);
      } else {
        setMensagem('Usuário ou senha inválidos!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar-se" onPress={onGoToRegister} />
      <Text style={styles.msg}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', justifyContent: 'center', padding: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
  title: { fontSize: 24, marginBottom: 20 },
  msg: { marginTop: 10, color: 'red' },
});