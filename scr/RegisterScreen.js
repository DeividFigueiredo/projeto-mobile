import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { adicionarUsuario } from '../database/databaseMantis';

export default function RegisterScreen({ onGoToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRegistrar = async () => {
    if (!nome || !email || !senha) {
      setMensagem('Preencha todos os campos!');
      return;
    }
    await adicionarUsuario(nome, email, senha);
    setMensagem('Usuário registrado com sucesso!');
    setTimeout(onGoToLogin, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <Button title="Registrar" onPress={handleRegistrar} />
      <Button title="Já tem conta? Login" onPress={onGoToLogin} />
      <Text style={styles.msg}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', justifyContent: 'center', padding: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
  title: { fontSize: 24, marginBottom: 20 },
  msg: { marginTop: 10, color: 'green' },
});