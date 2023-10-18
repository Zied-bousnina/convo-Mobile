import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const RequestSent = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets5.lottiefiles.com/packages/lf20_wdetpydn.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default RequestSent

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1001,
    },
})