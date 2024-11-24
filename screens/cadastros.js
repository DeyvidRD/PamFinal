import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Cadastros({ navigation }) {
  const [form, setForm] = useState({
    cpf: '',
    nome: '',
    idade: '',
    cep: '',
    endereco: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const buscarCEP = async () => {
    if (!form.cep) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido!');
      return;
    }
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado!');
      } else {
        setForm({ 
          ...form, 
          endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade}` 
        });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP!');
    }
  };

  const cadastrar = async () => {
    if (!form.cpf || !form.nome || !form.idade || !form.cep || !form.endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const backendUrl = 'http://192.168.15.17:3000/cadastro';

    try {
      const response = await axios.post(backendUrl, form);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

      if (navigation && navigation.navigate) {
        navigation.navigate('Listagem', { novoUsuario: form });
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar!');
    }
  };

  const limparFormulario = () => {
    setForm({
      cpf: '',
      nome: '',
      idade: '',
      cep: '',
      endereco: '',
    });
    Alert.alert('Limpeza', 'Formulário limpo!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={form.cpf}
        onChangeText={(value) => handleInputChange('cpf', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={form.nome}
        onChangeText={(value) => handleInputChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={form.idade}
        onChangeText={(value) => handleInputChange('idade', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        keyboardType="numeric"
        value={form.cep}
        onChangeText={(value) => handleInputChange('cep', value)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={buscarCEP}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={(value) => handleInputChange('endereco', value)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={cadastrar}>
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão para limpar o formulário */}
      <TouchableOpacity style={styles.clearButton} onPress={limparFormulario}>
        <Text style={styles.clearButtonText}>Limpar Formulário</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a página de listagem */}
      <TouchableOpacity style={styles.listButton} onPress={() => navigation.navigate('Listagem')}>
        <Text style={styles.listButtonText}>Ir para Listagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#474747' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#007bff' },

  input: { 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff', 
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  searchButton: { 
    backgroundColor: '#007bff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 8, 
    height: 50, 
    marginBottom: 15 
  },
  submitButton: {
    backgroundColor: '#121111',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilo para o botão de limpar
  clearButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilo para o botão de navegação para a listagem
  listButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
