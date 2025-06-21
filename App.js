import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import LoginScreen from './scr/LoginScreen';
import RegisterScreen from './scr/RegisterScreen';
import DebugScreen from './scr/DebugScreen';

export default function App() {
  const [tela, setTela] = useState('login'); // 'login' ou 'registro'

  return (
    <View style={styles.container}>
      {tela === 'login' ? (
        <LoginScreen
          onGoToRegister={() => setTela('registro')}
          onGoToDebug={() => setTela('debug')}
        />
      ) : tela === 'registro' ? (
        <RegisterScreen onGoToLogin={() => setTela('login')} />
      ) : (
        <DebugScreen onGoToLogin={() => setTela('login')} />
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