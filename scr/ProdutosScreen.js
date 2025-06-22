import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import { listarProd } from '../database/databaseMantis';

export default function ProdutosScreen({ onGoToHome }) {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      await listarProd((produtosData) => {
        setProdutos(produtosData);
        setFilteredProdutos(produtosData);
      });
    } catch (error) {
      alert('Erro ao buscar produtos!');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProdutos();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProdutos(produtos);
      return;
    }
    const filtered = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(query.toLowerCase()) ||
      (produto.categoria && produto.categoria.toLowerCase().includes(query.toLowerCase())) ||
      (produto.descricao && produto.descricao.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredProdutos(filtered);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TextInput
        placeholder="Buscar produtos..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        placeholderTextColor="#999"
      />
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery
          ? 'Nenhum produto encontrado para esta busca.'
          : 'Nenhum produto cadastrado ainda.'}
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => navigation && navigation.navigate ? navigation.navigate('CadastroProduto') : null}
      >
        <Text style={styles.emptyButtonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {/* Aqui você pode navegar para detalhes ou edição futuramente */}}
    >
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDesc}>{item.descricao}</Text>
      <Text style={styles.productPrice}>R$ {item.preco?.toFixed(2)}</Text>
      <Text style={styles.productCategory}>{item.categoria}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão Voltar fora do headerContainer */}
      <TouchableOpacity style={styles.backButton} onPress={onGoToHome}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      {renderHeader()}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProdutos}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2196F3']}
              tintColor="#2196F3"
            />
          }
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation && navigation.navigate ? navigation.navigate('CadastroProduto') : null}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    margintop: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  backButton: {
  marginTop: 40,
  marginLeft: 16,
  marginBottom: 8,
  alignSelf: 'flex-start',
  backgroundColor: 'transparent', // Garante que não tem fundo
  elevation: 0, // Remove sombra se houver
},
backButtonText: {
  color: '#2196F3',
  fontSize: 16,
  fontWeight: 'bold',
},
  searchBar: {
    flex: 1,
    height: 40,
    marginTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    color: '#333',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    right: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#2196F3',
    marginTop: 8,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});