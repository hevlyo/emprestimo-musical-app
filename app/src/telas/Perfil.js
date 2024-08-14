import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebaseConnection';
import { database, ref, set, push, onValue } from '../firebaseConnection';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Perfil() {
  const [usuario, setUsuario] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    if (user && user.uid) {
        const usernameRef = ref(database, 'usuarios/' + user.uid);
        onValue(usernameRef, (snapshot) => {
          const data = snapshot.val();
          setUsuario(data);
          return;
        })
    }
  }, [])

  return (
    
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus dados</Text>
      <Icon style={{textAlign: 'center'}} name="user" size={60} color="black" />

      <Text style={styles.tituloInfor}>Nome</Text>
      <View style={styles.divInfor}>
        <Text style={styles.textInfor}>{usuario.nome}</Text>
      </View>

      <Text style={styles.tituloInfor}>Matrícula</Text>
      <View style={styles.divInfor}>
        <Text style={styles.textInfor}>{usuario.matricula}</Text>
      </View>

      <Text style={styles.tituloInfor}>Data de nascimento</Text>
      <View style={styles.divInfor}>
        <Text style={styles.textInfor}>{usuario.dataNascimento}</Text>
      </View>

      <Text style={styles.tituloInfor}>Email</Text>
      <View style={styles.divInfor}>
        <Text style={styles.textInfor}>{usuario.email}</Text>
      </View>

      <Text style={styles.ituloInfor}>Telefone</Text>
      <View style={styles.divInfor}>
        <Text style={styles.textInfor}>{usuario.telefone}</Text>
      </View>

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
  }
});