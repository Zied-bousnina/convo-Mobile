import { View, Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'

const MyAccount = () => {
  const navigation= useNavigation()
  return (
    <View>
      <Button
              title="Online check"
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{

                height: 40,
                width: Dimensions.get("screen").width*0.7,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{
                color: 'white',
                marginHorizontal: 20,
              }}
              onPress={() => navigation.navigate('OnlineRegistrationPage')}
            />
    </View>
  )
}

export default MyAccount