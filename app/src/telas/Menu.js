import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConnection';
import { database, ref, onValue } from '../firebaseConnection';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [username, setUsername] = useState('');

  useEffect(() => { 
    if (user && user.uid) {
        const usernameRef = ref(database, 'usuarios/' + user.uid);
        onValue(usernameRef, (snapshot) => {
          const data = snapshot.val();
          setUsername(data ? snapshot.val().nome : '');
        })
    }
  },[]);


  function deslogar() {
    signOut(auth).then(() => {
       navigation.navigate('Login');
    }).catch((error) => {
      // An error happened.
      alert(error.code);
    });
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.divBarra}>
        <View style={styles.barra}>
            <Text style={styles.textoBarra}>Bem-vindo, {username}</Text>
            <Icon style={styles.iconUser} name="home" size={30} color="#fff" />
        </View>
      </View>
      
      <View style={styles.divBtn}>  
        <Text style={styles.destaque}>Último acesso {user.metadata.lastSignInTime}</Text>
        <Button style={styles.btnMenu} title='Recursos disponíveis' color="red" onPress={() => navigation.navigate('Recursos')}/>
        <Button style={styles.btnMenu} title='Perfil' color="red" onPress={() => navigation.navigate('Perfil')}/>
        <Button style={styles.btnMenu} title='Sair' color="red" onPress={deslogar}/>
      </View>
      <Text style={styles.destaque}>Versão 1.0.0 (Beta)</Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },

  divBtn: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    maxHeight: 570,
    paddingHorizontal: 20,
    
  },


  barra: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconUser: {
    
  },
  textoBarra: {
    color: '#fff',
    fontSize: 15,
  },

  destaque: {fontWeight: '600', textAlign: 'center'},


});