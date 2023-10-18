import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const UserCard = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets2.lottiefiles.com/private_files/lf30_IjOtaA.json'
        }}
        autoPlay
        loop
        style= {{
            // width: 300,
            // height:300
            backgroundColor:"white"
        }}
        />

    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
})