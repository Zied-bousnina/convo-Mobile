import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const AppLoader = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
     <ActivityIndicator size="large" color="#2df793" />

    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
})