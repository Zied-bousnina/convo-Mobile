import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import ButtonCustom from '../../components/Buttons/ButtonCustom'
import Fonts from '../../../src/assets/fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { findBasicInfoByUserId, findDriverDoc } from '../../redux/actions/userActions';
const OnlineRegistration = () => {
  const navigation =useNavigation()

  const dispatch = useDispatch()
  // const navigation = useNavigation()
  const basicInfo = useSelector(state=>state?.BasicInfo?.basicInfo)

  useEffect(() => {
    dispatch(findBasicInfoByUserId(dispatch));

  }, [basicInfo?._id])



  useFocusEffect(
    React.useCallback(() => {
      dispatch(findBasicInfoByUserId(dispatch));
    }, [])
  );

  const DriverDoc = useSelector(state=>state?.document?.document?.driverDocuments)




  useFocusEffect(
    React.useCallback(() => {
      dispatch(findDriverDoc(dispatch));
    }, [])
  );

  useEffect(() => {
    dispatch(findDriverDoc(dispatch));

  }, [DriverDoc?._id])
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
      >Informations de base \ Permis de conduire: {
        DriverDoc?.permisConduirebackCard &&
        DriverDoc?.permisConduirefrontCard &&
        DriverDoc?.CinbackCard &&
        DriverDoc?.CinfrontCard &&
        DriverDoc?.kbis &&
        DriverDoc?.assurance &&
        DriverDoc?.proofOfAddress ?
        <Text style={{color:"#038946"}}>Vérifié</Text>:
        <Text style={{color:"#ff0000"}}>Incomplète</Text>
      }
      </Text>
      <View style={styles.loginCon}>

            <ButtonCustom
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={ "Informations de base \\ Permis de conduire"}
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
    // backgroundColor: "#2df793",
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