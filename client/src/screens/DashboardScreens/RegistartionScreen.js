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
import ButtonCustom from '../../components/Buttons/ButtonCustom';
import Fonts from '../../../src/assets/fonts';

const RegistartionScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const handleLogOut= _ => {
      console.log("logout")
      dispatch(
        LogOut()
      )


    }
  return (
    <View
    style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 10,
      width:Dimensions.get("screen").width,

    }}
  >
    <Pressable
      onPress={()=>navigation.navigate("BasicInfo")}
      style={
        [styles.item,
        {
            borderTopLeftRadius:8,
            borderTopRightRadius:8
        }]
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          Basic info
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("DriverLicense")}
    //   onPress={()=>Linking.openURL('tel:${197}')}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          Driver license
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("IdConfirmation")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          ID confirmation
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("ProfessionalDrivingCard")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          بطاقة القيادة المهنية
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("AgentReferralCode")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          Agent Referral Code
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("ExploitCard")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          بطاقة إستغلال
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("VehicleInfo")}
      style={
        [styles.item,
        {
            borderBottomLeftRadius:8,
            borderBottomRightRadius:8
        }
        ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          Vehicle info
        </Text>
      </View>
      <Icon1
        name="arrow-forward-ios"
        size={20}
        color={'#2df793'}
      />
    </Pressable>
    <View style={styles.loginCon}>

            <ButtonCustom
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={ "Done"}
          onPress={()=>navigation.navigate("Registration")}
              />
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

        </View>

          </View>
  </View>
  )
}

export default RegistartionScreen
const styles = StyleSheet.create({
   item: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
    alignItems: 'center',
    // marginVertical: 20,

    margin: 0.5, // Margin around the entire View
    height:70,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
    padding:20
   },
   loginCon: {

    // paddingHorizontal: 20,
    paddingVertical: 10,
  paddingBottom:100,
  justifyContent: 'center',

  // flex:1,
  // justifyContent: 'center',
  // alignItems: 'center',


  },
  LoginBtn: {
    backgroundColor: "#2df793",
    borderRadius: 60,
    shadowColor: "black",
    borderColor: 'transparent',
    height:60
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: Fonts.type.NotoSansBlack,
    color: "white",
    paddingVertical: 10,
  },
  })
