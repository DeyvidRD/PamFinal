import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Listagem() {
  const [usuarios, setUsuarios] = useState([]);

  const buscarUsuarios = async () => {
    try {
      const response = await axios.get('http://192.168.15.17:3000/cadastros');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de usuários.');
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.text}>CPF: {item.cpf}</Text>
      <Text style={styles.text}>Idade: {item.idade}</Text>
      <Text style={styles.text}>Endereço: {item.endereco}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.cpf}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário cadastrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#474747',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10, // Bordas arredondadas para os itens
    marginBottom: 15,
    shadowColor: '#000', // Sombras para dar profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Sombras no Android
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
    fontStyle: 'italic',
  },
});
