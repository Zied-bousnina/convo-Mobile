

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const SmartCityAnimation = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets1.lottiefiles.com/packages/lf20_ycXDlOyJWi.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default SmartCityAnimation

const styles = StyleSheet.create({
    container: {
      position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
        height:100,
        height:100
    },
})