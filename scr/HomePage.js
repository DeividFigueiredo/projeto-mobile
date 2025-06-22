import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function HomePage({ usuario, onLogout, navigation,OnGoProdutosScreen }) {
  // Exemplo de atividades recentes (simulado)
  const [recentActivities, setRecentActivities] = useState([
    { id: '1', type: 'venda', titulo: 'Venda Realizada', valor: 100, data: new Date() },
    { id: '2', type: 'produto', titulo: 'Produto Cadastrado', nome: 'Produto X', data: new Date() }
  ]);

  // Menu de opções
    const menuOptions = [
    {
        id: 'produtos',
        title: 'Produtos',
        icon: '🛍️',
        color: '#4CAF50',
        onPress: OnGoProdutosScreen // Corrigido aqui!
    },
    {
      id: 'vendas',
      title: 'Nova Venda',
      icon: '💰',
      color: '#2196F3',
      onPress: () => navigation && navigation.navigate ? navigation.navigate('Vendas') : null
    },
    {
      id: 'historico',
      title: 'Histórico de Vendas',
      icon: '📊',
      color: '#9C27B0',
      onPress: () => navigation && navigation.navigate ? navigation.navigate('HistoricoVendas') : null
    },
    {
      id: 'perfil',
      title: 'Meu Perfil',
      icon: '👤',
      color: '#FF9800',
      onPress: () => navigation && navigation.navigate ? navigation.navigate('PerfilUsuario') : null
    }
  ];

  const renderActivity = ({ item }) => {
    const formattedDate = item.data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>{item.titulo}</Text>
        <Text style={styles.activityDetail}>
          {item.type === 'venda' ? `R$ ${item.valor.toFixed(2)}` : item.nome}
        </Text>
        <Text style={styles.activityDate}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Olá, {usuario?.nome || usuario?.email?.split('@')[0] || 'Usuário'}
        </Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>
        <FlatList
          data={recentActivities}
          renderItem={renderActivity}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma atividade recente</Text>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <View style={styles.menuGrid}>
        {menuOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.menuItem, { backgroundColor: option.color }]}
            onPress={option.onPress}
          >
            <Text style={styles.menuIcon}>{option.icon}</Text>
            <Text style={styles.menuTitle}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    marginBottom: 30,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#AAA',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  menuItem: {
    width: '48%',
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});