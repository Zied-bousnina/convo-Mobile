import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'


const MyIncome = () => {

  return (
    <>


    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
          color:"#333540",
          paddingHorizontal:5
        }}>
        All your previous requests will be shown here within 24 hours
      </Text>
    </View>
    </>
  )
}

export default MyIncome
