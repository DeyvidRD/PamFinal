import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastros from './screens/cadastros';
import Listagem from './screens/listagem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastros">
        <Stack.Screen name="Cadastros" component={Cadastros} />
        <Stack.Screen name="Listagem" component={Listagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
