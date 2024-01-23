/* eslint-disable prettier/prettier */
import React, { Component, useRef, useState } from 'react';
import { StyleSheet, View, Button, Text, Dimensions } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
const FindDriverScreen = ({route}) => {

    const {address, destination, comments, offer} = route?.params


    const webviewRef = useRef(null);
    const [endpoint, setEndpoint] = useState('');
    const [response, setResponse] = useState('');


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

        var map = L.map('map').setView([${address?.latitude}, ${address?.longitude}], 13);
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
            var currentLocationMarker = L.marker([${address?.latitude}, ${address?.longitude}]).addTo(map);


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

                 map.setView([${address?.latitude}, ${address?.longitude}], 13);
            });

            // Set a new destination when the "Set Destination" button is clicked



        </script>
    </body>
    </html>
    `;
  return (
    <SafeAreaView>

<View
    style={styles.container}
>

     {/* <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}

      >
    </AnimatedLoader> */}
      <Text
        style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#26cbfc',
            }}

      >Finding driver...</Text>
</View>
 <WebView


ref={webviewRef}
source={{html: html_script}}
style={styles.Webview}
javaScriptEnabled={true}
domStorageEnabled={true}

/>
    </SafeAreaView>

  )
}

export default FindDriverScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    lottie: {
      width: 100,
      height: 100,


    },
  });