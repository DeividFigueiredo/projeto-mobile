import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './scr/LoginScreen';
import RegisterScreen from './scr/RegisterScreen';
import DebugScreen from './scr/DebugScreen';
import HomePage from './scr/HomePage';
import ProdutosScreen from './scr/ProdutosScreen';
import { criarTabelaUsuarios, CriarTabelaProdutos } from './database/databaseMantis';

export default function App() {
  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState(null);

  // Cria as tabelas ao iniciar o app
  useEffect(() => {
    async function initDB() {
      await criarTabelaUsuarios();
      await CriarTabelaProdutos();
    }
    initDB();
  }, []);

  const handleLoginSuccess = (user) => {
    setUsuario(user);
    setTela('home');
  };

  const handleLogout = () => {
    setUsuario(null);
    setTela('login');
  };

  return (
    <View style={styles.container}>
      {tela === 'login' ? (
        <LoginScreen
          onGoToRegister={() => setTela('registro')}
          onGoToDebug={() => setTela('debug')}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : tela === 'registro' ? (
        <RegisterScreen onGoToLogin={() => setTela('login')} />
      ) : tela === 'debug' ? (
        <DebugScreen onGoToLogin={() => setTela('login')} />
      ) : tela === 'produtos' ? (
        <ProdutosScreen onGoToHome={() => setTela('home')} />
      ) : (
        <HomePage
          usuario={usuario}
          onLogout={handleLogout}
          OnGoProdutosScreen={() => setTela('produtos')}
        />
      )}
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