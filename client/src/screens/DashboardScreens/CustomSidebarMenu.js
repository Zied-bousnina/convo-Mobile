// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider } from 'react-native-elements';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Pressable,
} from 'react-native';
import Fonts from '../../../src/assets/fonts';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ProfileSection from './Components/ProfileSection';
import LoginButton from '../../components/Buttons/LoginButton';
import ButtonCustom from '../../components/Buttons/ButtonCustom';
import { SocialIcon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_DRIVER_MODE } from '../../redux/types';

import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { FindRequestDemande } from '../../redux/actions/demandesActions';
const CustomSidebarMenu = (props) => {
  const [isDriverMode, setIsDriverMode] = useState(false);
  const navigation = useNavigation()
  const dispatch = useDispatch()


  const toggleMode = () => {
    dispatch(
      {
        type: SET_IS_DRIVER_MODE,
        payload: !isDriverMode
      }

    )
    setIsDriverMode(!isDriverMode);
    navigation.navigate(isDriverMode? "CityPage": "Driver")
  };
  const state = useSelector(state=>state?.DriverMode)
  // console.log("sate", state)
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <ProfileSection/>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />


      </DrawerContentScrollView>
      <View style={styles.deviderCon}>
            <View style={styles.devider} />
            {/* <Text style={styles.or}>OR</Text> */}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>




          {
            isDriverMode? (
              <>

              <TouchableOpacity
  onPress={()=>navigation.navigate("MyAccountPage")}
  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <Icon5
               name="account"
               size={20}
               color={  'black'}
           />
  <Text style={{ marginLeft: 10, fontSize: 16, color: 'black'  }}>
    My Account
  </Text>
</TouchableOpacity>
 <TouchableOpacity
  onPress={()=>navigation.navigate("OnlineRegistrationPage")}
  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <Icon6
               name="edit"
               size={20}
               color={  'black'}
           />
  <Text style={{ marginLeft: 10, fontSize: 16, color: 'black'  }}>
  Online Registration
  </Text>
</TouchableOpacity>

              </>
              ) :(
                <TouchableOpacity
            onPress={()=>{
              dispatch(FindRequestDemande(navigation))
              navigation.navigate("RequestHistoryPage")

            }}
             style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  <Icon3
    name="clockcircleo"
    size={20}
    color={ 'black' }
  />
  <Text style={{ marginLeft: 10, fontSize: 16, color: 'black'  }}>
    Request History
  </Text>
</TouchableOpacity>


)
          }
          </View>

      <View style={styles.loginCon}>
            <ButtonCustom
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={isDriverMode ? "Passenger Mode" : "Driver Mode"}
          onPress={toggleMode}
              />
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
<SocialIcon
  type='facebook'
/>
<SocialIcon
  type='instagram'

/>
        </View>

          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
    color:'red'
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  devider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },

  deviderCon: {
    paddingVertical: 10,
  },
  loginCon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  paddingBottom:100
  }

});

export default CustomSidebarMenu;