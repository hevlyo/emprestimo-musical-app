import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/telas/Login';
import Menu from './src/telas/Menu';
import Perfil from './src/telas/Perfil';
import Recursos from './src/telas/Recursos';
import Cadastro from './src/telas/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Recursos" component={Recursos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
