import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import MapView from 'react-native-leaflet-view';
// import {LatLng, LeafletView} from 'react-native-leaflet-view';
import {WebView} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../../redux/actions/binActions';
// import { fetchBins } from '../../redux/actions/binActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import FindDriver from './FindDriver';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SET_LOCATION } from '../../../redux/types';

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const mapRef = useRef(null);
  const dispatch  = useDispatch()
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,


  })




  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {

        setCurrentLocation(position.coords);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  };





  const webviewRef = useRef(null);



  const [endpoint, setEndpoint] = useState('');
  const [response, setResponse] = useState('');


  const handleEndpointChange = (text) => {
    setEndpoint(text);
    // makeApiRequest()
  };


  // Function to make the API request
  const makeApiRequest = async () => {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endpoint}.json?access_token=pk.eyJ1IjoiemllZDE0NDEiLCJhIjoiY2xvOGgyYnNuMDA3bjJrcWxrb3VvdXBlYyJ9.dPaxxre7QPTB2F_Psyt4nQ`;
      const response = await axios.get(url);
      setResponse(response.data.features[0].center);

    } catch (error) {
      console.error(error);
    }
  };


  const html_script = `
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Leaflet Example</title>
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
     <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />

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

    .half-arc {
      position: relative;
      width: 100px;
      height: 50px;
      border-top-left-radius: 120px;
      border-top-right-radius: 120px;
      border-bottom: 0;
      background: #d9d9d9;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .half-arc:before {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 200%;
      border-radius: 50%;
      background-image: conic-gradient(#9c27b0, #3f51b5 calc(var(--percentage, 0) / 2), #bbb 0);
      transition: transform .5s ease-in-out;
      z-index: 1;
      transform: rotate(270deg);
    }

    .half-arc:after {
      content: "";
      position: absolute;
      display: block;
      background: #dddddd;
      z-index: 2;
      width: calc(100% - 32px);
      height: calc(200% - 32px);
      border-radius: 50%;
      top: 16px;
      left: 16px;
    }

    .half-arc span {
      color: #673ab7;
      z-index: 3;
      text-align: center;
    }
    .half-arc div {

      flex: auto;
      display: flex;
      flex-direction: column;
      padding-top: 15%;
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
     <script src="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.js"></script>
     <script src="https://unpkg.com/leaflet.locatecontrol@0.83.0/dist/L.Control.Locate.min.js"></script>

     <script>
     // Function to send new destination data to React Native
      function setNewDestination(latitude, longitude) {
        const data = { type: 'setDestination', payload: { latitude, longitude } };
        alert(data)
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }

     var map = L.map('map').setView([${response[1]}, ${response[0]}], 13);
         var destinationMarker;

         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             tileSize: 512,
             zoomOffset: -1,
         }).addTo(map);

         // Add your current location marker
         var currentLocationMarker = L.marker([${response[1]}, ${response[0]}]).addTo(map);


         // Initialize the geocoder control
         var geocoder = L.Control.Geocoder.nominatim();


         // Add the geocoder control to the map
         L.Control.geocoder({
            geocoder: geocoder
         }).addTo(map);

         // Initialize the locate control
         var locateControl = L.control.locate();


         // Add the locate control to the map
         locateControl.addTo(map);

         // Center the map on your current location when the current location icon is clicked
         document.getElementById('current-location').addEventListener('click', function() {

             map.setView([${currentLocation?.latitude}, ${currentLocation?.longitude}], 13);
         });

         // Set a new destination when the "Set Destination" button is clicked



     </script>
 </body>
 </html>
 `;

 setDesti = ()=> {

  dispatch({
    type: SET_LOCATION,
    payload: {

        latitude: response[0],
        longitude: response[1],


    },

  })
  navigation.navigate('CityPage')
 }

  return (
    <>
    {/* <StatusBar barStyle="dark-content" /> */}
    <SafeAreaView style={styles.Container}>
    {/* <TextInput
        placeholder="Enter endpoint"
        value={endpoint}
        onChangeText={handleEndpointChange}
      /> */}
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleEndpointChange}
        value={endpoint}
      />
      <View style={styles.ButtonContainer}

      >
        <Button title="Cancel"
        // onPress={handleCancel}
        onPress={
          () => navigation.navigate('CityPage')
        }
        color={'#2df793'}
         />
         {
          (response && endpoint?.length >0)  &&
          <Button title="Done"
        //  onPress={handleDone}

        color={'#2df793'}
        onPress={setDesti}
         />

         }

         <Button title="search"
        //  onPress={handleDone}
        color={'#26cbfc'}
        onPress={makeApiRequest}
         />
      </View>
      <WebView


        ref={webviewRef}
        source={{html: html_script}}
        style={styles.Webview}
        javaScriptEnabled={true}
  domStorageEnabled={true}

      />


    </SafeAreaView>
  </>
  )
}

export default Location
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // padding: 10,
    borderRadius: 20,
    backgroundColor: 'grey',
    // height:500
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
  ButtonContainer: {
    flexDirection: 'row', // This makes the buttons display horizontally
    justifyContent: 'space-around', // You can adjust this based on your layout preference
    alignItems: 'center', // You can adjust this based on your layout preference
    margin: 10, // Add margin as needed
  },
});