import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import PlantStackNavigation from './PlantStackNavigation'
import AuthenNaviga from './authen/AuthenNaviga'
const PlantNavigation = () => {
  return (
    <NavigationContainer>
      
        <PlantStackNavigation/>
        </NavigationContainer>
  )
}

export default PlantNavigation