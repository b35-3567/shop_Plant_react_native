import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FocusExample from '../screens/FocusExample'
import Home_Plant from '../tabs/Home_Plant'
const Stack = createNativeStackNavigator()
const AuthenNaviga = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen  name="login" component={FocusExample}/>
        <Stack.Screen name="home" component={Home_Plant}/>
        </Stack.Navigator>
  )
}

export default AuthenNaviga