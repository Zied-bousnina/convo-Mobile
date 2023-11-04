import { View, Text } from 'react-native'
import React from 'react'
import UserDashboardScreen from './UserDashboardScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LogOut } from '../../redux/actions/authActions';
const SettingsScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleLogOut= _ => {
    console.log("logout")
    dispatch(
      LogOut()
    )
  //  setTimeout(() => {

  //    navigation.navigate("Login")
  //  }, 3000);

  }
  return (
    <>

<View
  style={{
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width:Dimensions.get("screen").width,

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

      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Phone number
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
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Notifications
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
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Rules and terms
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
  <Pressable
    onPress={handleLogOut}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Log out
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
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'red' }}>
        Delete Account
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
</View>
      {/* <UserDashboardScreen/> */}
    </>
  )
}

export default SettingsScreen
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