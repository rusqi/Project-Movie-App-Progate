import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function MovieDetail({ navigation }: { navigation: any }): JSX.Element {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    marginVertical20: {
      marginVertical: 20,
    },
  })

  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button
        title="Kembali"
        onPress={() => navigation.goBack('Home')}
      />
    </View>
  )
}
