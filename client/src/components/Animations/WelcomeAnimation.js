import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const WelcomeAnimation = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            // uri: 'https://assets1.lottiefiles.com/packages/lf20_69HH48.json'
            uri: 'https://assets10.lottiefiles.com/packages/lf20_yx3PoF.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default WelcomeAnimation

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'white',
        zIndex: 1000,
    },
})