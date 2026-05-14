import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = {
  id: string;
  descricao: string;
  comprado: boolean;
};

const CHAVE_STORAGE = '@lista_tarefas';

export default function App() {
  const [novaDescricao, setNovaDescricao] = useState<string>('');
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    carregarItens();
  }, []);

  useEffect(() => {
    salvarItens(itens);
  }, [itens]);

  const carregarItens = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (dados !== null) {
        setItens(JSON.parse(dados));
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os itens.');
    }
  };

  const salvarItens = async (lista: Item[]) => {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar os itens.');
    }
  };

  const incluirItem = () => {
    if (!novaDescricao.trim()) {
      Alert.alert('Atenção', 'Digite uma tarefa antes de adicionar.');
      return;
    }

    const novoItem: Item = {
      id: Date.now().toString(),
      descricao: novaDescricao.trim(),
      comprado: false,
    };

    setItens((anterior) => [...anterior, novoItem]);
    setNovaDescricao('');
  };

  const alternarStatus = (id: string) => {
    setItens((anterior) =>
      anterior.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  };

  const excluirItem = (id: string) => {
    setItens((anterior) => anterior.filter((item) => item.id !== id));
  };

  const limparLista = () => {
    Alert.alert(
      'Limpar lista',
      'Deseja remover todos os itens da lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => setItens([]),
        },
      ]
    );
  };

  const totalComprados = itens.filter((item) => item.comprado).length;
  const totalPendentes = itens.length - totalComprados;

  return (
    <View style={estilos.pagina}>
      <Text style={estilos.titulo}>Lista de Tarefas</Text>

      {/* Contador */}
      {itens.length > 0 && (
        <View style={estilos.contadorContainer}>
          <Text style={estilos.contadorTexto}>
            ✓ {totalComprados} comprado{totalComprados !== 1 ? 's' : ''}
          </Text>
          <Text style={estilos.contadorTexto}>
            ○ {totalPendentes} pendente{totalPendentes !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Campo de entrada */}
      <View style={estilos.linha}>
        <TextInput
          style={estilos.campo}
          placeholder="Nova tarefa..."
          placeholderTextColor="#999"
          value={novaDescricao}
          onChangeText={setNovaDescricao}
          onSubmitEditing={incluirItem}
          returnKeyType="done"
        />
        <TouchableOpacity style={estilos.botaoAdicionar} onPress={incluirItem}>
          <Text style={estilos.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={estilos.listaVazia}>Nenhuma tarefa adicionada.</Text>
        }
        renderItem={({ item }) => (
          <View style={[estilos.cartao, item.comprado && estilos.cartaoComprado]}>
            <TouchableOpacity
              style={estilos.areaTexto}
              onPress={() => alternarStatus(item.id)}
            >
              <Text style={[estilos.descricao, item.comprado && estilos.comprado]}>
                {item.comprado ? '✓ ' : '○ '}
                {item.descricao}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => excluirItem(item.id)}>
              <Text style={estilos.botaoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botão limpar lista */}
      {itens.length > 0 && (
        <TouchableOpacity style={estilos.botaoLimpar} onPress={limparLista}>
          <Text style={estilos.textoBotaoLimpar}>Limpar lista</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  contadorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  contadorTexto: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  campo: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  botaoAdicionar: {
    backgroundColor: '#4a90d9',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 14,
  },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cartaoComprado: {
    backgroundColor: '#f0f7f0',
    borderColor: '#b2dfb2',
  },
  areaTexto: {
    flex: 1,
  },
  descricao: {
    fontSize: 15,
    color: '#333',
  },
  comprado: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  botaoExcluir: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoLimpar: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e53935',
    alignItems: 'center',
  },
  textoBotaoLimpar: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 14,
  },
});