import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { auth } from '../firebaseConnection';
import { database, ref, set, onValue } from '../firebaseConnection';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Perfil() {
  const [usuario, setUsuario] = useState({
    nome: '',
    matricula: '',
    dataNascimento: '',
    email: '',
    telefone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user && user.uid) {
      const usernameRef = ref(database, 'usuarios/' + user.uid);
      onValue(usernameRef, (snapshot) => {
        const data = snapshot.val();
        setUsuario(data || {});
      });
    }
  }, []);

  function handleSave() {
    if (user && user.uid) {
      const userRef = ref(database, 'usuarios/' + user.uid);
      set(userRef, usuario)
        .then(() => {
          setIsEditing(false);
          alert('Dados salvos com sucesso!');
        })
        .catch((error) => {
          alert('Erro ao salvar os dados: ' + error.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus dados</Text>
      <Icon style={{ textAlign: 'center' }} name="user" size={60} color="black" />

      <Text style={styles.tituloInfor}>Nome</Text>
      <View style={styles.divInfor}>
        <TextInput
          style={styles.textInput}
          value={usuario.nome}
          editable={isEditing}
          onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
        />
      </View>

      <Text style={styles.tituloInfor}>Matrícula</Text>
      <View style={styles.divInfor}>
        <TextInput
          style={styles.textInput}
          value={usuario.matricula}
          editable={isEditing}
          onChangeText={(text) => setUsuario({ ...usuario, matricula: text })}
        />
      </View>

      <Text style={styles.tituloInfor}>Data de nascimento</Text>
      <View style={styles.divInfor}>
        <TextInput
          style={styles.textInput}
          value={usuario.dataNascimento}
          editable={isEditing}
          onChangeText={(text) => setUsuario({ ...usuario, dataNascimento: text })}
        />
      </View>

      <Text style={styles.tituloInfor}>Email</Text>
      <View style={styles.divInfor}>
        <TextInput
          style={styles.textInput}
          value={usuario.email}
          editable={isEditing}
          onChangeText={(text) => setUsuario({ ...usuario, email: text })}
        />
      </View>

      <Text style={styles.tituloInfor}>Telefone</Text>
      <View style={styles.divInfor}>
        <TextInput
          style={styles.textInput}
          value={usuario.telefone}
          editable={isEditing}
          onChangeText={(text) => setUsuario({ ...usuario, telefone: text })}
        />
      </View>

      <Button
        title={isEditing ? 'Salvar' : 'Editar'}
        onPress={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },

  titulo: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    fontWeight: '500',
  },

  divInfor: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },

  tituloInfor: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  textInput: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
