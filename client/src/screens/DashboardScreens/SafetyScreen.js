import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';

const SafetyScreen = () => {
  return (

    <View style={{
      flexDirection: 'column',
              justifyContent: 'space-between',
              flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"white"
    }}>
    <View style={styles.circle}>
      <Icon1 name="safety-check" size={50} color="#4086e0" />
    </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
          color:"#333540",
          paddingHorizontal:5
        }}>
        Who do you want to contact?
      </Text>
      <View
  style={{
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width:Dimensions.get("screen").width*0.8,

  }}
>
  <Pressable
    onPress={()=>Linking.openURL('tel:${190}')}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon
        name="call-outline"
        size={20}
        color={'black'}
      />
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Ambulance
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
  <Pressable
    // onPress={()=>navigation.navigate("RequestHistoryPage")}
    onPress={()=>Linking.openURL('tel:${197}')}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon
        name="call-outline"
        size={20}
        color={'black'}
      />
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Police
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
  <Pressable
    // onPress={()=>navigation.navigate("RequestHistoryPage")}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon1
        name="safety-check"
        size={20}
        color={'black'}
      />
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Safety tips
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
</View>

    </View>
  )
}

export default SafetyScreen

const styles = StyleSheet.create({
  circle: {
    width: 100, // You can adjust the size as needed
    height: 100,
    borderRadius: 50, // Half of the width and height to create a circle
    backgroundColor: '#e5f4fe',
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
  },
});