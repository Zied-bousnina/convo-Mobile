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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBins } from '../../../redux/actions/binActions';
// import { fetchBins } from '../../redux/actions/binActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import FindDriver from './FindDriver';
import axios from 'axios';

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const mapRef = useRef(null);
  const dispatch  = useDispatch()
  const sheetRef = useRef(null);

  const bins = useSelector(state=>state?.fetchBins?.fetchBins)
  useEffect(() => {
    dispatch(fetchBins())

  }, [bins])
  // console.log("Bins",bins)

  const binLocations = [
    {lat: 36.798, lon: 30.588, fullness: true},
    {lat: 36.78368139354993, lon: 10.16122615993541, fullness: false, full: 40},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252321453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 30.588, fullness: true, full: 20},
    {lat: 36.77929252301453, lon: 10.18272819698375, fullness: false, full: 20},
    {
      lat: 36.97929252301453,
      lon: 30.588,
      fullness: true,
      full: 20,
    },
    {
      lat: 36.65929252301453,
      lon: 30.588,
      fullness: false,
      full: 20,
    },
    {
      lat: 36.8412929252301453,
      lon: 30.5885,
      fullness: true,
      full: 20,
    },
    {
      lat: 36.4129252301453,
      lon: 10.153538272819698375,
      fullness: false,
      full: 20,
    },
    {
      lat: 36.626929252301453,
      lon: 30.588,
      fullness: true,
      full: 20,
    },
    {
      lat: 36.626929252301453,
      lon: 30.588,
      fullness: true,
      full: 20,
    },
    {
      lat: 36.77929252301453,
      lon: 30.588,
      fullness: true,
      full: 20,
    },
    {
      lat: 36.77929252301453,
      lon: 30.588,
      fullness: true,
      full: 20,
    },
  ];

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
        console.log(
          '------------------------------------------------------------------------------------------------',
          position,
        );
        setCurrentLocation(position.coords);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  };
  const MAX_REQUESTS_PER_HOUR = 3;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000; // Number of milliseconds in an hour
let requestCount = 0;
let lastReset = Date.now(); // Initialize the last reset time to the current time

const fetchData = async () => {
  const currentTime = Date.now();

  if (currentTime - lastReset >= HOUR_IN_MILLISECONDS) {
    // If an hour has passed, reset the request count
    requestCount = 0;
    lastReset = currentTime;
  }

  if (requestCount >= MAX_REQUESTS_PER_HOUR) {
    console.log("Request limit exceeded for the hour. Please try again later.");
    return;
  }

  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
    params: {
      location: `${currentLocation.latitude},${currentLocation.longitude}`,
      language: 'en',
    },
    headers: {
      'X-RapidAPI-Key': '39e86bda9bmshc0974a764c850cap1440e6jsn8ed07a5e12ee',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  };

  let retryCount = 0;

  while (retryCount < 3) { // Limit the number of retries
    try {
      const response = await axios.request(options);
      console.log('---------------------------------------------------------------');
      setCurrentAddress(response.data);
      requestCount++; // Increment the request count
      break; // If the request is successful, break out of the retry loop
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If it's a 429 status code, wait and retry
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second (adjust as needed)
        retryCount++;
      } else {
        // console.error(error);
        break; // If it's not a 429 status code, break out of the retry loop
      }
    }
  }
};

// Call the fetchData function to make the API request
fetchData();


  // console.log('icon ', Icon.getImageSourceSync('line-chart', 60, 'green'));
  const fullBins =  binLocations.filter(bin => bin.fullness === true )[0];
  const lat = fullBins.lat
  const long = fullBins.lon
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
     <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
     <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
     <script>
         var map = L.map('map').setView([${currentLocation?.latitude}, ${
    currentLocation?.longitude
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
         var emptyBinIcon = L.icon({
           iconUrl: 'data:image/png;base64,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',


           iconSize: [32, 32],
           iconAnchor: [16, 32],
          //  html: '<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_HrDleL/delete_trash_05.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player>', // Use Icon component to get image source
          // html:'<img src="https://i.ibb.co/Yk4vmgs/green-icon-1.png" alt="green-icon-1" border="0" />'
          });

          var fullBinIcon = L.icon({
            iconUrl: 'data:image/png;base64,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6R30ymWsYo4b978bkdSy4QCRNzRkgBg/LoiIiEgZyxcAXqoayoZPBRQREZE0GwYQ0V09LHQSERERKZnt/KCGmoiqrAqAiIhIJdmlamiEWYzX4YiIiEjZ64yGR+RymgEQERGpJJncMM0AiIiIVBqz4RFOCR/6LSIiIsHlomERhmYAREREKon7sAhHewBEREQqifmwCLQEICIiUlHchkW4DQydQ0RERErIGBBhXhM6h4iIiJRUTQSoAIiIiFQS91oVABERkUpjkWYAREREKo67j9L2vgAAHmpJREFUCoCIiEjFMe0BEBERqTxOTQSmAiAiIlJJ8jMAugxQRESkwmgJQEREpAKpAIiIiFQeq4mATOgYIiIiUkr5GwGJiIhIhYmAbOgQIiIiUkq2LgI6Q8cQERGRUvJOFQAREZHK0xmBqQCIiIhUls4IXAVARESkkjhaAhAREak4pgIgIiJSeTQDICIiUoHMVABEREQqj+s+ACIiIhWoM8J1GaCIiEiF6YwwXxM6hYiIiJSQszYClofOISIiIiUUsSwCloXOISIiIiXktjzCTDMAIiIilcRyyyM8pwIgIiJSSdyXaQZARESk0kTR8gjXHgAREZGK4rllEVGkGQAREZFK0lm1PCKbVQEQERGpJOsGvhzR1aUlABERkcqxwhZd2RVx10GvALnQaURERKQklgFExqwc8ErgMCIiIlIaywGi/O99acgkIiIiUiq+YQHgmYBJREREpFQsegreLABLAkYRERGRUnHfoAC83gZEREQk5Tz/oT/a8B9EREQk5SLbsACYCoCIiEglyG1YACLXEoCIiEj65Vi29llYXwBeWvcUuhmQiIhI2v3HFrd2wusF4PV/eCFoJBERESm2N5b8oy19UURERFJpCwXAVABERERSzeyNPX9vFgBHGwFFRETSzHNbXAJ4svRJREREpGR8S0sAEY8GCSMiIiKlkeOR9b/dYAmgenGQMCIiIlIKq1m475Pr/+GNAmBts58H9FhgERGRVPKHjFlv3PMn2uRPHypxGhERESkFs41m+jcpAKZlABERkTTyrRUAdxUAERGRNPLcVgpApBkAERGRVKpia0sA2X+UMouIiIiUxEpub9nohn8bFQBrm7cUeLGkkURERKS4nMUGvuGXNr0KAEDLACIiImlim5/bt1QAtAwgIiKSKpvv8du8ALg2AoqIiKRK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',
             iconSize: [32, 32],
             iconAnchor: [16, 32],
            //  html: '<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_HrDleL/delete_trash_05.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player>',
         });

         // Filter full bins
         const fullBins = ${JSON.stringify(binLocations)}.filter(bin => bin.fullness );



   // Find closest full bin
let closestBin = null;
let closestDistance = Infinity;
const userLatLng = L.latLng(${currentLocation?.latitude}, ${currentLocation?.longitude});
fullBins.forEach(bin => {
  const binLatLng = L.latLng(bin.lat, bin.lon);
  const distance = userLatLng.distanceTo(binLatLng);
  if (distance < closestDistance) {
    closestBin = bin;
    closestDistance = distance;
  }
});

         L.Routing.control({
          waypoints: [

            L.latLng(${currentLocation?.latitude}, ${currentLocation?.longitude}),

            L.latLng(closestBin.lat, closestBin.lon)
            // L.latLng(fullBins[0].lat, fullBins[0].lon)
            // L.latLng(${JSON.stringify(fullBins)}.lat, ${JSON.stringify(fullBins)}.lon)
          ]
        }).addTo(map);

         ${JSON.stringify(binLocations)}.forEach(function (bin) {
             var marker = L.marker([bin.lat, bin.lon], {
                 icon: bin.fullness ? fullBinIcon : emptyBinIcon,
             }).addTo(map);


             marker.on('click', () => {

              marker.bindPopup('<body><div class="half-arc" style="--percentage: 25%"><div ><span class="label">25%</span><Span>Paper</Span></div></div><div class="half-arc" style="--percentage: 50%"><div><span class="label">50%</span><Span>Glass</Span></div></div><div class="half-arc" style="--percentage: 75%"><div><span class="label">75%</span><Span>Plastic</Span></div></div><div class="half-arc" style="--percentage: 05%"><div><span class="label">5%</span><Span>Metalic</Span></div></div></body>').openPopup();

            });
         });

     </script>
 </body>
 </html>
 `;
 useEffect(() => {
  // Open the BottomSheet when the component mounts
  sheetRef.current.open();
}, []);
  return (
    <>
    {/* <StatusBar barStyle="dark-content" /> */}
    <SafeAreaView style={styles.Container}>
      <WebView
      onTouchMove={
        () => {
          // console.log("touched")
          sheetRef.current.close()
        }
      }
      onTouchEnd={
        () => {
          // console.log("touched")
          sheetRef.current.open()
        }
      }

        ref={mapRef}
        source={{html: html_script}}
        style={styles.Webview}
      />
    <Button title="Open" onPress={() => sheetRef.current.open()} />
       <BottomSheet ref={sheetRef}
      //  height={Dimensions.get("screen").height}
       >
      <FindDriver currentLocation={currentLocation} currentAddress={currentAddress}/>
    </BottomSheet>
    </SafeAreaView>
  </>
  )
}

export default MapComponent
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
});