import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import UserDashboardScreen from './UserDashboardScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LogOut } from '../../redux/actions/authActions';
import ButtonCustom from '../../components/Buttons/ButtonCustom';
import Fonts from '../../../src/assets/fonts';
import { findBasicInfoByUserId, findDriverDoc } from '../../redux/actions/userActions';
import { Icon as IconPaper, MD3Colors } from 'react-native-paper';
import BasicInfo from './Registartion/BasicInfo';
const RegistartionScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
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

    console.log("DriverDoc", DriverDoc)
    // console;log()
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
        Informations de base
        </Text>
      </View>
      {
        BasicInfo &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("DriverLicense")}
    //   onPress={()=>Linking.openURL('tel:${197}')}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Permis de conduire
        </Text>
      </View>
     {
      DriverDoc?.permisConduirebackCard && DriverDoc?.permisConduirefrontCard &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>
    {/* <Pressable
      onPress={()=>navigation.navigate("IdConfirmation")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
          ID confirmation
        </Text>
      </View>
     {
        BasicInfo &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable> */}
    <Pressable
      onPress={()=>navigation.navigate("ProfessionalDrivingCard")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>

Pièce d'identité
        </Text>
      </View>
     {
      DriverDoc?.CinbackCard&& DriverDoc?.CinfrontCard &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("Assurence")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Certificat d'assurance
        </Text>
      </View>
     {
      DriverDoc?.assurance &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("ExploitCard")}
      style={
        styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        K-Bis
        </Text>
      </View>
     {
      DriverDoc?.kbis &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>
    <Pressable
      onPress={()=>navigation.navigate("ProofOfAddress")}
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
        Un justificatif de domicile
        </Text>
      </View>
     {
      DriverDoc?.proofOfAddress &&

      <IconPaper
    source="check"
    color={
      "#2df793"
    }
    size={20}
  />
      }
    </Pressable>

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
