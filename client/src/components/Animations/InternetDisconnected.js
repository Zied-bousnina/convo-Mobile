import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const InternetDisconnected = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        // source={{
        //     uri: 'https://assets7.lottiefiles.com/packages/lf20_rb0swn6j.json'
        //     // uri: 'https://assets7.lottiefiles.com/packages/lf20_RGVbkI.json'
        // }}
        source={require('./internetDis.json')}
        autoPlay
        loop
        />
        <Text
            style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 100
            }}
            
        >Internet Disconnected</Text>

    </View>
  )
}

export default InternetDisconnected

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
})