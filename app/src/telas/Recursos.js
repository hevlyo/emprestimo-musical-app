import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { database, ref, set, push, onValue, auth} from '../firebaseConnection';

import { update } from 'firebase/database';

const Item = ({data}) => (


  <View style={styles.divListRecursos}>
    <Text style={styles.title}>{data.nome}</Text>
    <View style={styles.divInterna}>
        <View style={styles.divIntRow}>
          <Text style={{fontWeight: 'bold'}}>Código:</Text>
          <Text style={{textTransform: 'uppercase'}}>{"  "+data.codigo+"    "}</Text>
          <Text style={{fontWeight: 'bold'}}>Ano:</Text>
          <Text>{"  "+data.ano}</Text>
        </View>
        <View style={styles.divIntRowDir}>
          <Text style={{fontWeight: 'bold'}}>Marca:</Text>
          <Text>{"  "+data.marca}</Text>
        </View>
        
    </View>
    
  </View>
);

export default function Recursos() {
  const user = auth.currentUser;
  const [recursos, setRecursos] = useState([]);
  const [nomeRecurso, setNomeRecurso] = useState('');
  const [codRecurso, setCodRecurso] = useState('');
  const [anoRecurso, setAnoRecurso] = useState();
  const [marca, setMarca] = useState('');

  useEffect(() =>{
    
    function listarRecursos() {
      setRecursos([]);
      const dbRef = ref(database, 'recursos');
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          if (childSnapshot.val().disponivel === true) {
            let data = {
              nome: childSnapshot.val().nome,
              codigo: childSnapshot.val().codigo,
              ano: childSnapshot.val().ano,
              marca: childSnapshot.val().marca
            }
            setRecursos(oldArray => [...oldArray, data]);
          }
        }); 
      }, {
          onlyOnce: true
      });
      
    }
    listarRecursos();

  }, [])

  /* async function cadastrarRecurso() {
    const recursoRef = ref(database, 'recursos');
    const newRecursoRef = push(recursoRef);
    await set(newRecursoRef, {
        nome: nomeRecurso,
        ano: Number(anoRecurso),
        codigo: codRecurso,
        marca: marca,
        disponivel: true
    })

    .then(() => {
      alert("Recurso cadastrado com sucesso");
    })

    .catch((error) => {
      alert("Ocorreu um erro: "+error.code)
    })
}
 */

  function deixarRecursoIndisponivel(keyRecurso){
    const updates = {};
    updates['/recursos/'+keyRecurso+'/disponivel'] = false;

    update(ref(database), updates)
      .then(() =>{
        console.log("Dados atualizados com sucesso!");
      })

      .catch((error) =>{
        console.error("Erro ao atualizar dados: ", error);
      })

  }

  function reservarRecurso() {
    const dbRef = ref(database, 'recursos');
    const codRecursoLowcase = codRecurso; 
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        if (childSnapshot.val().codigo === codRecursoLowcase.toLowerCase().trim() &&  childSnapshot.val().disponivel === true) {
            deixarRecursoIndisponivel(childKey);
            alert(childSnapshot.val().nome + " reservado com sucesso");
            setCodRecurso('');
            return;
        }
      });
    });
  }

  

  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>Reserve um recurso</Text>
       <TextInput
        style={styles.input}
        placeholder='Digite o código do recurso para reserva-lo'
        onChangeText={(texto) => setCodRecurso(texto)}
        value={codRecurso}
      />
      <Button title='Reservar recurso' onPress={reservarRecurso}/>
      <Text style={styles.titulo2}>Recursos Disponíveis</Text>

      {/* TextInput
        style={styles.input}
        placeholder='Nome do recurso'
        onChangeText={(texto) => setNomeRecurso(texto)}
        value={nomeRecurso}
      />

      <TextInput
        style={styles.input}
        placeholder='Código do recurso'
        onChangeText={(texto) => setCodRecurso(texto)}
        value={codRecurso}
      />

      <TextInput
        style={styles.input}
        placeholder='Ano de fabricação'
        onChangeText={(texto) => setAnoRecurso(texto)}
        value={anoRecurso}
      />

      <TextInput
        style={styles.input}
        placeholder='Marca'
        onChangeText={(texto) => setMarca(texto)}
        value={marca}
      />

      <Button title='Salvar' onPress={cadastrarRecurso}/>
 */}
      <FlatList
        data={recursos}
        keyExtractor={item => item.key}
        renderItem={ ({item}) => <Item data={item} />}
        
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
    //width: '200%',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  divIntRowDir: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  }
});