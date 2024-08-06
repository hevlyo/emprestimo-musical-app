import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Constants from 'expo-constants';



export default function Login() {
  return (
    <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.titulo}>Sistema de Empréstimos</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
            />
            <Button
                title="Entrar"
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

      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
});