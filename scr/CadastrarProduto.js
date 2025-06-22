import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { adicionarProduto, atualizarProduto } from '../database/databaseMantis'; // Implemente essas funções!
import { AppInput } from '../components/FormComponents'; // Ou use TextInput padrão
import { AppButton, Spacer } from '../components/UIComponents'; // Ou use Button padrão

export default function CadastroProdutoScreen({
  onGoBack,
  onProdutoSalvo,
  produtoParaEditar = null,
}) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!produtoParaEditar;

  useEffect(() => {
    if (isEditing && produtoParaEditar) {
      setNome(produtoParaEditar.nome || '');
      setCategoria(produtoParaEditar.categoria || '');
      setPreco(produtoParaEditar.preco?.toString() || '');
      setDescricao(produtoParaEditar.descricao || '');
    }
  }, [isEditing, produtoParaEditar]);

  const validateForm = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!categoria.trim()) newErrors.categoria = 'Categoria é obrigatória';
    if (!preco.trim() || isNaN(parseFloat(preco.replace(',', '.'))) || parseFloat(preco.replace(',', '.')) <= 0) {
      newErrors.preco = 'Informe um preço válido maior que zero';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const precoNumerico = parseFloat(preco.replace(',', '.'));
      const produtoData = {
        nome,
        categoria,
        preco: precoNumerico,
        descricao: descricao.trim() || '',
        imagem: `https://via.placeholder.com/200/4CAF50/FFFFFF?text=${nome.charAt(0) || 'P'}`,
        dataCadastro: isEditing ? produtoParaEditar.dataCadastro : new Date(),
      };

      if (isEditing) {
        await atualizarProduto(produtoParaEditar.id, produtoData);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        await adicionarProduto(produtoData);
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      }
      if (onProdutoSalvo) onProdutoSalvo();
      if (onGoBack) onGoBack();
    } catch (error) {
      Alert.alert('Erro', `Não foi possível salvar o produto.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Text>
          <Text style={styles.subtitle}>
            {isEditing ? 'Atualize as informações do produto abaixo' : 'Preencha as informações do produto abaixo'}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.previewContainer}>
            <Image
              source={{
                uri: isEditing
                  ? produtoParaEditar.imagem
                  : `https://via.placeholder.com/200/4CAF50/FFFFFF?text=${nome.charAt(0) || 'P'}`
              }}
              style={styles.previewImage}
            />
            <Text style={styles.previewText}>Imagem do Produto</Text>
          </View>
          <AppInput
            label="Nome do Produto *"
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Garrafa PET"
            error={errors.nome}
          />
          <AppInput
            label="Categoria *"
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Ex: Plástico"
            error={errors.categoria}
          />
          <AppInput
            label="Preço (R$) *"
            value={preco}
            onChangeText={setPreco}
            placeholder="Ex: 5,90"
            keyboardType="numeric"
            error={errors.preco}
          />
          <AppInput
            label="Descrição (opcional)"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva o produto aqui..."
            multiline
            numberOfLines={4}
          />
          <Spacer size="l" />
          <AppButton
            title={isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'}
            onPress={handleSave}
            loading={loading}
            disabled={loading}
          />
          <Spacer size="m" />
          <AppButton
            title="Cancelar"
            onPress={onGoBack}
            type="secondary"
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, padding: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  formContainer: { backgroundColor: '#FFFFFF' },
  previewContainer: { alignItems: 'center', marginBottom: 24 },
  previewImage: { width: 120, height: 120, borderRadius: 10, backgroundColor: '#F0F0F0', marginBottom: 8 },
  previewText: { fontSize: 14, color: '#666' },
});