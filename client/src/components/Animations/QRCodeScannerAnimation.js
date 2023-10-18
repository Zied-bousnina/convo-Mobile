import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const QRCodeScannerAnimation = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets10.lottiefiles.com/packages/lf20_2sapbqfh.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default QRCodeScannerAnimation

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1000,
    },
})