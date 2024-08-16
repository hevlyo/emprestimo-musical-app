import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { database, ref, set, push, onValue, auth } from '../firebaseConnection';
import { update } from 'firebase/database';

const Item = ({ data }) => (
  <View style={styles.divListRecursos}>
    <Text style={styles.title}>{data.nome}</Text>
    <View style={styles.divInterna}>
      <View style={styles.divIntRow}>
        <Text style={{ fontWeight: 'bold' }}>Código:</Text>
        <Text style={{ textTransform: 'uppercase' }}>{"  " + data.codigo + "    "}</Text>
        <Text style={{ fontWeight: 'bold' }}>Ano:</Text>
        <Text>{"  " + data.ano}</Text>
      </View>
      <View style={styles.divIntRowDir}>
        <Text style={{ fontWeight: 'bold' }}>Marca:</Text>
        <Text>{"  " + data.marca}</Text>
      </View>
    </View>
  </View>
);

export default function Recursos() {
  const user = auth.currentUser;
  const [recursos, setRecursos] = useState([]);
  const [codRecurso, setCodRecurso] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listarRecursos = async () => {
      const dbRef = ref(database, 'recursos');
      onValue(dbRef, (snapshot) => {
        const recursosArray = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.disponivel) {
            recursosArray.push({
              nome: data.nome,
              codigo: data.codigo,
              ano: data.ano,
              marca: data.marca,
              key: childSnapshot.key,
            });
          }
        });
        setRecursos(recursosArray);
      });
    };
    listarRecursos();
  }, []);

  const reservarRecurso = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const dbRef = ref(database, 'recursos');
    let recursoReservado = null;

    try {
      await new Promise((resolve) => {
        onValue(dbRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.codigo.toLowerCase().trim() === codRecurso.toLowerCase().trim() && data.disponivel) {
              recursoReservado = {
                nome: data.nome,
                key: childSnapshot.key,
              };
              deixarRecursoIndisponivel(childSnapshot.key);
              return true;
            }
          });
          resolve();
        }, { onlyOnce: true });
      });

      if (recursoReservado) {
        cadastrarRecurso(recursoReservado.nome, user.uid, user.email, recursoReservado.key);
        Alert.alert(`${recursoReservado.nome} reservado com sucesso`);
      } else {
        Alert.alert('Recurso não encontrado ou não disponível');
      }
    } catch (error) {
      Alert.alert('Erro ao reservar recurso:', error.message);
    } finally {
      setCodRecurso('');
      setLoading(false);
    }
  }, [codRecurso, loading, user]);

  const cadastrarRecurso = (nomeRecurso, keyUser, emailUser, keyRecurso) => {
    const emprestimoRef = ref(database, 'emprestimos');
    const newEmprestimoRef = push(emprestimoRef);
    
    set(newEmprestimoRef, {
      nomeRecurso,
      keyRecurso,
      keyUser,
      emailUser,
    })
      .then(() => console.log('Recurso cadastrado com sucesso'))
      .catch((error) => console.log('Erro ao cadastrar recurso:', error));
  };

  const deixarRecursoIndisponivel = (keyRecurso) => {
    const updates = {};
    updates[`recursos/${keyRecurso}/disponivel`] = false;

    update(ref(database), updates)
      .then(() => console.log('Recurso marcado como indisponível'))
      .catch((error) => console.error('Erro ao atualizar recurso:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reserve um recurso</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite o código do recurso para reservá-lo'
        onChangeText={setCodRecurso}
        value={codRecurso}
      />
      <Button title='Reservar recurso' onPress={reservarRecurso} disabled={loading} />
      <Text style={styles.titulo}>Recursos Disponíveis</Text>
      <FlatList
        data={recursos}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Item data={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  titulo: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
  },
  divListRecursos: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 15,
    borderLeftWidth: 5,
    borderLeftColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  divIntRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  divIntRowDir: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  },
});
