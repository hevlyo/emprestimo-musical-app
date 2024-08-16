import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database, ref, set, auth } from '../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Constants from 'expo-constants';

export default function Cadastro() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    matricula: '',
    telefone: '',
    dataNascimento: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const isValidDate = (date) => {
    const re = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[0-2])[\/]\d{4}$/;
    return re.test(date);
  };

  const validateForm = () => {
    if (!form.nome || !form.email || !form.matricula || !form.telefone || !form.dataNascimento || !form.password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return false;
    }
    if (!isValidEmail(form.email)) {
      Alert.alert("Erro", "Formato de email inválido.");
      return false;
    }
    if (!isValidPassword(form.password)) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    if (!isValidDate(form.dataNascimento)) {
      Alert.alert("Erro", "Formato de data inválido. Use dd/MM/AAAA.");
      return false;
    }
    return true;
  };

  const formatDate = (value) => {
    // Remove qualquer caractere que não seja número e limita a 8 caracteres (ddMMAAAA)
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 8);
  
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }
  
    return formatted;
  };

  const cadastrar = () => {
    if (!validateForm()) return;

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const userUID = userCredential.user.uid;
        set(ref(database, 'usuarios/' + userUID), {
          nome: form.nome,
          email: form.email,
          matricula: form.matricula,
          telefone: form.telefone,
          dataNascimento: form.dataNascimento,
        });

        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert("Erro", `Algo deu errado: ${error.message}`);
      });
  };

  const renderInputField = (label, value, onChangeText, placeholder, keyboardType = 'default', secureTextEntry = false) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCompleteType={label.toLowerCase()}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Cadastre-se</Text>

      {renderInputField("Nome", form.nome, (value) => handleChange('nome', value), "Seu nome")}
      {renderInputField("Email", form.email, (value) => handleChange('email', value), "Seu email", "email-address")}
      {renderInputField("Matrícula", form.matricula, (value) => handleChange('matricula', value), "Sua matrícula")}
      {renderInputField("Data de nascimento", form.dataNascimento, (value) => handleChange('dataNascimento', formatDate(value)), "DD/MM/AAAA", "numeric")}
      {renderInputField("Telefone celular", form.telefone, (value) => handleChange('telefone', value), "Seu telefone celular", "phone-pad")}
      {renderInputField("Crie uma senha", form.password, (value) => handleChange('password', value), "Deve ter no mínimo 6 caracteres", "default", true)}

      <Button title="Cadastrar-se" color="red" onPress={cadastrar} />
    </View>
  );
}
''
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
