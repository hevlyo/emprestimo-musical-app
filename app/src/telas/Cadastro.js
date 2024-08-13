import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database, ref, set, auth } from '../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import Constants from 'expo-constants';



export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nome, setNome] = useState();
  const [matricula, setMatricula] = useState();
  const [telefone, setTelefone] = useState();
  const [dataNasc, setDataNasc] = useState();

   function cadastrar() {
    if (nome === '' || email === '' || matricula === '' || telefone === '' ||  dataNasc === '' || password === '' ) {
        alert("Preencha todos os campos");

    } else {
       createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const userUID = userCredential.user.uid;
            // saving in database
            set(ref(database, 'usuarios/' + userUID), {
                nome: nome,
                email: email,
                matricula: matricula,
                telefone: telefone,
                dataNascimento: dataNasc
            });

            alert("Cadastro realizado com sucesso!");

            // Redireciona para a tela de Login
            navigation.navigate('Login');
            
        })
        .catch((error) => {
            const errorCode = error.code;
            alert("Algo deu errado "+errorCode);
            
        });
    }
  }

  return (
    <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.titulo}>Cadastre-se</Text>

            <Text style={styles.textInput}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu nome"
                onChangeText={(texto) => setNome(texto)}
                value={nome}
                
            />
            <Text style={styles.textInput}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />
            <Text style={styles.textInput}>Matrícula</Text>
            <TextInput
                style={styles.input}
                placeholder="Sua matrícula"
                onChangeText={(texto) => setMatricula(texto)}
                value={matricula}
                
            />
            <Text style={styles.textInput}>Data de nascimento</Text>
            <TextInput
                style={styles.input}
                placeholder="Formato (dd/MM/AAAA)"
                onChangeText={(texto) => setDataNasc(texto)}
                value={dataNasc}
                
            />
            <Text style={styles.textInput}>Telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu telefone"
                onChangeText={(texto) => setTelefone(texto)}
                value={telefone}
                
            />
            <Text style={styles.textInput}>Crie uma senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Deve ter no mínimo 6 caracteres"
                secureTextEntry
                onChangeText={(texto) => setPassword(texto)}
                value={password}
            />
            
            <Button
                title="Cadastra-se"
                color="red"
                onPress={cadastrar}
            />

        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        padding: 20,
      },
      input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
      },

      textInput: {
        textAlign: 'left',
      },

      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
});