import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'
import Favorite from '../screens/Favorite'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation
