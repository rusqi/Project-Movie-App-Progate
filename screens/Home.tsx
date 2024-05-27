import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeStackNavigation from '../src/navigations/HomeStackNavigation'
import MovieDetail from '../src/navigations/MovieDetail'

export default function Home(): JSX.Element {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStackNavigation" component={HomeStackNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

