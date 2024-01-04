/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import MapView from 'react-native-leaflet-view';
// import {LatLng, LeafletView} from 'react-native-leaflet-view';
import {WebView} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../../redux/actions/binActions';
// import { fetchBins } from '../../redux/actions/binActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
// import FindDriver from './FindDriver';
import axios from 'axios';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInput from '../../../components/Inputs/AppInput';
import LoginButton from '../../../components/Buttons/LoginButton';
import Fonts from '../../../assets/fonts';
import CostomFormik from '../../../components/costomFormik/CostomFormik';
import { Button as BTN } from '@rneui/themed';
import { Button as BTN2, Icon as icon33, MD3Colors } from 'react-native-paper';
import { AccepteMission, RefuseMission, decreaseOffer, increaseOffer } from '../../../redux/actions/demandesActions';
import { useNavigation } from '@react-navigation/native';
import HorizontalLinearStepper from '../Components/Stepper';

const AcceptationScreen = ({route}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const mapRef = useRef(null);
  const dispatch  = useDispatch()
  const sheetRef = useRef(null);
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const [inc, setincrease] = useState(false)
  const [dec, setdecrease] = useState(false)
  const navigation = useNavigation()
  const RequestFindDriver = useSelector(state=>state?.ReqestFindDriver)
  const {
    address,
    destination,
    comments,
    distance,
    postalDestination,
    postalAddress,
    demandeId

  } =  route.params
  console.log(route.params)
  const [offer, setoffer] = useState(route.params?.offer)
  // console.log()

 const handleIncrease = ()=>{
    // console.log("increase")
    setdecrease(false)
    setincrease(true)
    setoffer(parseFloat(offer) + 0.5)
    dispatch(AccepteMission(demandeId,navigation ))
 }

 const handleDecrease = ()=> {
    // console.log("decrease")
    setincrease(false)
    setdecrease(true)
    setoffer(parseFloat(offer) - 0.5)
    dispatch(RefuseMission(demandeId, navigation))
 }



 const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    // Start the timer
    if (timer === 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    // Clear the interval when the component is unmounted or when the timer reaches a specific value
    return () => clearInterval(intervalId);
  }, [timer]);

  // Format the timer value into HH:MM:SS
  const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);

// console.log(destinationa)


  // console.log(fullBins)
  const html_script = `
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Leaflet Example</title>
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
     <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
     <style>
     html, body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-size: 32px;
      gap: 40px;
      // flex-wrap: wrap;
    }


         #map {
             height: 100%;
             width: 100%;
             position: absolute;
             top: 0;
             bottom: 0;
             left: 0;
             right: 0;
         }



     </style>
 </head>
 <body>
     <div id="map"></div>
     <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
     <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
     <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
     <script>
         var map = L.map('map').setView([${address?.latitude}, ${
          address?.longitude
  }], 13);

         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             tileSize: 512,
             zoomOffset: -1,
         }).addTo(map);
        //  <img src="https://img.icons8.com/ios-filled/50/40C057/delete--v1.png"/>

         // Define a custom icon for the markers






   // Find closest full bin
let closestBin = null;
let closestDistance = Infinity;
const userLatLng = L.latLng(${address?.latitude}, ${address?.longitude});


         L.Routing.control({
          waypoints: [

            L.latLng(${address?.latitude}, ${address?.longitude}),

            L.latLng(${destination?.latitude}, ${destination?.longitude})

          ]
        }).addTo(map);



     </script>
 </body>
 </html>
 `;

  return (
    <>
    {/* <StatusBar barStyle="dark-content" /> */}
    <SafeAreaView style={styles.Container}>
    <TouchableOpacity
    onPress={()=>{
      navigation.goBack()
    }}
     style={[ { position: 'absolute',
    top: 10, // Adjust as needed
    left: 50,
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
       <Icon name="back" size={40} color="#2df793" />
    </TouchableOpacity>
    <View style={{
  position: 'absolute',
  top: 40,
  left: '50%', // Set left to 50% to center horizontally
//   transform: [{ translateX: '-50%' }], // Move the element back by half of its width
  // backgroundColor: '#007BFF', // Customize the background color as needed
  padding: 10,
  borderRadius: 5,
  zIndex: 9999,
}}>
  <BTN2
    icon={'map'} mode="contained" onPress={() => {
      // Your onPress logic here
    }}>
    {/* Press me */}
    {formattedTime}
  </BTN2>
</View>

      <WebView


        ref={mapRef}
        source={{html: html_script}}
        style={styles.Webview}
      />
  <View style={styles.blackOverlay}>
  <View
    style={styles.finding}
>

     {/* <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}

      >
    </AnimatedLoader> */}
      {/* <Text
        style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2df793',
            }}

      >Finding driver...</Text> */}
      {/* <HorizontalLinearStepper/> */}
</View>
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
                  value={postalAddress}
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
                  value={postalDestination}
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
                  value={`${Math.floor(distance).toString()} KM`}
                  editable = {false}
                  color={"#f66"}
                />

              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              {/* <Icon1 name="record-circle" size={20} color="#2df793" /> */}
              {/* <Text>TND</Text> */}
              </View>
              {/* <View style={styles.textCon}>
                <AppInput
                  name="TND"
                  placeholder="TND"
                  style={[styles.textInput, {fontWeight:"bold"}]}
                  placeholderTextColor={'#aaa'}
                  value={offer+", Cash"}
                  editable = {false}
                  color={"white"}
                />
              </View> */}
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

          <View style={styles.loginCon}>
            {/* <LoginButton
              style={[styles.LoginBtn,{ marginRight: 10 }]}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"-0.5"}
            /> */}
            <View
            style={{
              // width:"40%",
              // justifyContent:"center",
              // alignItems:"center",
              // marginLeft: 20,
              marginRight:10
            }}
            >

            <BTN title="rejeté" type="solid" loading={isLoad && dec}
              buttonStyle={[styles.LoginBtn], {
                backgroundColor: '#f66',
                borderRadius: 20,
                width:"100%",
                // paddingLeft:10

              }}
              onPress={handleDecrease}
            />
            </View>
           {/* <AppInput
                  name="TND"
                  placeholder="TND"
                  style={[styles.textInput, {fontWeight:"bold",marginRight: 10 }]}
                  placeholderTextColor={'#aaa'}
                  value={"TND"+offer}
                  editable = {false}
                  color={"white"}
                /> */}
            {/* <LoginButton
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"+0.5"}


            /> */}
            <BTN title="accepté" type="solid" loading={isLoad && inc}
              buttonStyle={styles.LoginBtn}
              onPress={handleIncrease}
            />

          </View>
        </View>
        <BottomSheet ref={sheetRef}
        // height={Dimensions.get("screen").height}
        closeOnDragDown={
          true
        }
        // closeOnPressMask={true}
        // snapPoints={['100%']}

        // height={Dimensions.get("screen").height}

        >
       {/* <Destination/> */}
       {/* <Pressable
        onPress={()=>sheetRef.current.close()}
        style={{
          backgroundColor: '#6bc7ab',
          padding: 16,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
      </Pressable> */}

      {/* <FindDriver currentLocation={currentLocation} currentAddress={currentAddress}/> */}
    </BottomSheet>
        </CostomFormik>
  </View>

    </SafeAreaView>
  </>
  )
}

export default AcceptationScreen
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
    backgroundColor: 'black',
    opacity: 0.7, // You can adjust the opacity as needed
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