import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const InternetDisconnected = () => {
  return (

      <LottieView
        // source={{
        //     uri: 'https://assets7.lottiefiles.com/packages/lf20_rb0swn6j.json'
        //     // uri: 'https://assets7.lottiefiles.com/packages/lf20_RGVbkI.json'
        // }}
        source={require('./internetDis.json')}
        colorFilters={[
        {
          keypath: "button",
          color: "#F00000",
        },
        {
          keypath: "Sending Loader",
          color: "#F00000",
        },
      ]}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop
        />

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