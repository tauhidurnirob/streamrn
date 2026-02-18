import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const Placeholder = () => (
  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <Text>App Navigator</Text>
  </View>
);

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Placeholder} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
