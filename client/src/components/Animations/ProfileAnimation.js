import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const ProfileAnimation = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets3.lottiefiles.com/packages/lf20_8pL7DHZXvo.json'
        }}
        autoPlay
        loop
        style={{
          width:400,
          height:400,
          top:20
        }}
        
        />

    </View>
  )
}

export default ProfileAnimation

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        // zIndex: 1000,
    },
})