import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import ButtonCustom from '../../components/Buttons/ButtonCustom'
import Fonts from '../../../src/assets/fonts';
import { useNavigation } from '@react-navigation/native';
const OnlineRegistration = () => {
  const navigation =useNavigation()
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // paddingVertical: 10,
        // width:Dimensions.get("screen").width*0.8,

      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'left',
          marginTop: 20,
          color:"#333540",
          paddingHorizontal:5
        }}
      >Statuses:</Text>
      <Text
        style={{
          fontSize: 16,
          // fontWeight: 'bold',
          textAlign: 'left',
          // marginTop: 20,
          color:"#333540",
          paddingHorizontal:5
        }}
      >City \ Courier : Not Verified</Text>
      <View style={styles.loginCon}>

            <ButtonCustom
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={ "City \\ Courier"}
          onPress={()=>navigation.navigate("Registration")}
              />
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

        </View>

          </View>
    </View>
  )
}

export default OnlineRegistration

const styles = StyleSheet.create({
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
    borderRadius: 20,
    shadowColor: "black",
    borderColor: 'transparent',
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: "white",
    paddingVertical: 10,
  },
})