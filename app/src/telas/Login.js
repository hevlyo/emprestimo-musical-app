import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Constants from 'expo-constants';


export default function() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

   async function logar() {

    if (email === '' || password === '') {
        alert("Digite seu email e sua senha");
    } else {
       await signInWithEmailAndPassword(auth, email, password)
        .then((userCredencial) => {
          setEmail('');
          setPassword('');
          navigation.navigate('Menu');
        })

        .catch((error) => {
            alert("Email ou senha inválidos");
        });
    }
    
  }
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.divLogin}>
            <Text style={styles.titulo}>Sistema de Empréstimos da Escola de Música</Text>
          <Text>Email</Text>
          <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(texto) => setEmail(texto)}
              value={email}
          />
          <Text>Senha</Text>
          <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={(texto) => setPassword(texto)}
              value={password}
          />
          <Button
              title="Entrar"
              color="red"
              onPress={logar}
              
          />

          <Button title="Crie uma conta" color="gray" onPress={ () => navigation.navigate('Cadastro')}  />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 100,
      },
      
      input: {
        //width: '200%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        marginBottom: 40,
        marginTop: 10,
        borderColor: '#ccc',
        borderRadius: 10,
        
      },

      titulo: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        marginBottom: 50,
      },
});