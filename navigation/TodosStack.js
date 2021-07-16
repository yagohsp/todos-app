import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Todos from '../screens/Todos';

const Stack = createStackNavigator();

export default function TodosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Todos' component={Todos} />
    </Stack.Navigator>
  );
}