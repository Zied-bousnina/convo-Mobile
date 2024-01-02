/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {

  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,

  TouchableOpacity,
  View,
} from 'react-native';
// import MapView from 'react-native-leaflet-view';
// import {LatLng, LeafletView} from 'react-native-leaflet-view';
import {WebView} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../../redux/actions/binActions';
// import { fetchBins } from '../../redux/actions/binActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import FindDriver from './FindDriver';
import axios from 'axios';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInput from '../../../components/Inputs/AppInput';
import LoginButton from '../../../components/Buttons/LoginButton';
import Fonts from '../../../assets/fonts';
import CostomFormik from '../../../components/costomFormik/CostomFormik';
import { Button as BTN } from '@rneui/themed';
import { decreaseOffer, increaseOffer } from '../../../redux/actions/demandesActions';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Icon2 from 'react-native-vector-icons/AntDesign';
const RideDetails = ({route}) => {
  const navigation = useNavigation()
  const {
    data

  } =  route.params
  console.log(data)
  return (
    <>
 <TouchableOpacity
    onPress={()=>{
      navigation.navigate("RequestHistoryPage")
    }}
     style={[ { position: 'absolute',
    top: 10, // Adjust as needed
    left: 10,
    zIndex: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    }]}>
       <Icon2 name="back" size={30} color="black" />
    </TouchableOpacity>

    <View
    style={{
      marginTop:20,
    }}
    >

       <Card
          style={{

            width: '100%',
            height: 500,
            borderRadius: 20,
            // overflow: 'hidden',
            backgroundColor: 'red',
          }}
       >

          {/* <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          /> */}


  <CostomFormik
          initialValues={{
    // address:address,
    // destination: destination  ? destination: "" , // Set an initial value for other fields if needed
    tnd: "",
    comments: ""
  }}
          // validationSchema={validationSchema}
          // onSubmit={handleCreateProfile}
            >


        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}></Text>
          </View>

          <View style={styles.formCon}>



          <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="record-circle" size={20} color="#26cbfc" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="address"
                  placeholder="Address"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={data?.postalAddress}
                  editable = {false}
                  color={"#26cbfc"}



                />
              </View>
            </View>
          <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="record-circle" size={20} color="#2df793" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="destination"
                  placeholder="Destination"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={data?.postalDestination}
                  editable = {false}
                  color={"#2df793"}
                />
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="map-marker-distance" size={20} color="#f66" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="distance"
                  placeholder="distance"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={`${Math.floor(parseFloat(data?.distance)).toString()} KM`}
                  editable = {false}
                  color={"#f66"}
                />
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              {/* <Icon1 name="record-circle" size={20} color="#2df793" /> */}
              <Text>TND</Text>
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="TND"
                  placeholder="TND"
                  style={[styles.textInput, {fontWeight:"bold"}]}
                  placeholderTextColor={'black'}
                  value={data?.offer+", Cash"}
                  editable = {false}
                  color={"black"}
                />
              </View>
            </View>


            {/* <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
                <BioSvg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="bio"
                  placeholder="Bio"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View> */}
            <View style={styles.termsCon}>
            </View>
          </View>


        </View>

        </CostomFormik>

        </Card>
    </View>
    </>
  )
}

export default RideDetails
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // padding: 10,
    borderRadius: 20,
    backgroundColor: 'grey',
    // height:500
  },
  finding: {
    // flex: 1,
    //   justifyContent: '  ',
    top:"auto",
      alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
  },
  Webview: {
    flex: 2,
    height: Dimensions.get('window').height
    // borderRadius:20,
  },
  ButtonArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Button: {
    width: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  blackOverlay: {
    flex: 1,
    // backgroundColor: 'black',
    // opacity: 0.7, // You can adjust the opacity as needed
    position: 'absolute',
    top: '50%', // Position in the middle of the screen vertically
    left: 0,
    right: 0,
    bottom: 0,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    // Style your button as needed
  },
  currentFare: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  roundedProfileImage: {
    width:75, height:75, borderWidth:3,
    borderColor:'white', borderRadius:50
  },
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,


  },
  loginIcon: {
    alignSelf: 'center',
    marginTop: -30,
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: -50,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },
  show: {
    alignSelf: 'center',
    width: '10%',
    position: 'relative',
    right: 20,
    zIndex: 10,
  },
  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  textCon: {
    width: '90%',
  },
  passCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
    marginTop: -10,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  registerCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 0
  },
  registerLbl: {
    color: '#2df793',
    fontFamily: Fonts.type.NotoSansSemiBold
  },
  registerNew: {
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color: '#2df793',
    // textAlign: 'right',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  LoginBtn: {
    backgroundColor: '#2df793',
    borderRadius: 20,
    width:"100%",

    // paddingLeft:10

  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: '#aaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: '#aaa',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: 60,
    alignSelf: 'center',
    fontFamily: Fonts.type.NotoSansSemiBold,
    position: 'relative',
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: Fonts.type.NotoSansBlack,
  },
  termsCon: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  termsBy: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  termLbl: {
    color: '#2df793',
    fontFamily: Fonts.type.NotoSansSemiBold,
    fontSize: 12,
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerimg:{
    elevation:2,
    height:150,
    width:150,
    // width:windowWidth * 0.3,
    // height:windowHeight * 0.2,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
  //   marginTop: '1%',
    marginLeft:'10%',
    // alignItems: 'center',
},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:'lightgrey',
},
loginCon: {
  flexDirection: 'row', // This sets the flexDirection to row to place items horizontally
  justifyContent: 'center', // Center the items horizontally within the container
  alignItems: 'center', // Center the items vertically within the container
  marginVertical: 20, // Add vertical margin as needed
},
});