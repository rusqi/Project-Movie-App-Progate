import React from 'react'
import { ScrollView, View, StatusBar, StyleSheet, Text } from 'react-native'

const Favorite = (): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Favorite</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
})

export default Favorite
