import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';



export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nome, setNome] = useState();
  const [matricula, setMatricula] = useState();
  const [telefone, setTelefone] = useState();
  const [dataNasc, setDataNasc] = useState();
  return (
    <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.titulo}>Cadastre-se</Text>

            <Text style={styles.textInput}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu nome"
                
            />
            <Text style={styles.textInput}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.textInput}>Matrícula</Text>
            <TextInput
                style={styles.input}
                placeholder="Sua matrícula"
                
            />
            <Text style={styles.textInput}>Data de nascimento</Text>
            <TextInput
                style={styles.input}
                placeholder="Formato (dd/MM/AAAA)"
                
            />
            <Text style={styles.textInput}>Telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu telefone"
                
            />
            <Text style={styles.textInput}>Crie uma senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Deve ter no mínimo 6 caracteres"
                secureTextEntry
            />
            
            <Button
                title="Cadastra-se"
                color="red"
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