/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  Platform
} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import LogInScreen from './src/screens/AuthScreens/LoginScreen';

import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import VerifyEmailScreen from './src/screens/AuthScreens/VerifyEmailScreen';
import { LogBox } from 'react-native';
import ForgotPasswordScreen from './src/screens/AuthScreens/ForgotPasswordScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { LogOut, setCurrentUser } from './src/redux/actions/authActions';
import { SetAuthToken } from './src/utils/SetAuthToken';
import store from './src/redux/store/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './src/screens/DashboardScreens/CustomSidebarMenu';
import ProfileSettings from './src/screens/DashboardScreens/ProfileSettings';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/Feather';
import RequestHistory from './src/screens/DashboardScreens/RequestHistory';
import SafetyScreen from './src/screens/DashboardScreens/SafetyScreen';
import SettingsScreen from './src/screens/DashboardScreens/SettingsScreen';
import FAQScreen from './src/screens/DashboardScreens/FAQScreen';
import SupportScreen from './src/screens/DashboardScreens/SupportScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Destination from './src/screens/DashboardScreens/Components/Destination';
import Location from './src/screens/DashboardScreens/Components/Location';
import FindDriverScreen from './src/screens/DashboardScreens/Components/FindDriverScreen';
import Dashboard from './src/screens/DashboardScreens/DriverDashboard/Dashboard';
import OnlineRegistration from './src/screens/DashboardScreens/OnlineRegistration';
import MyAccount from './src/screens/DashboardScreens/MyAccount';
import RegistartionScreen from './src/screens/DashboardScreens/RegistartionScreen';
import BasicInfo from './src/screens/DashboardScreens/Registartion/BasicInfo';
import DriverLicense from './src/screens/DashboardScreens/Registartion/DriverLicense';
import IDConfirmation from './src/screens/DashboardScreens/Registartion/IDConfirmation';
import Professionaldrivingcard from './src/screens/DashboardScreens/Registartion/Professionaldrivingcard';
import AgentReferralCode from './src/screens/DashboardScreens/Registartion/AgentReferralCode';
import ExploitCard from './src/screens/DashboardScreens/Registartion/Exploi_tCard';
import VehicleInfo from './src/screens/DashboardScreens/Registartion/VehicleInfo';
import NumberPlate from './src/screens/DashboardScreens/Registartion/Vehicule Info/NumberPlate';
import PhotoVehicle from './src/screens/DashboardScreens/Registartion/Vehicule Info/PhotoVehicle';
import CertificateVehicle from './src/screens/DashboardScreens/Registartion/Vehicule Info/CertificateVehicle';
import {  GetMissions } from './src/redux/actions/demandesActions';
import RideDetails from './src/screens/DashboardScreens/Components/RideDetails';
import { findBasicInfoByUserId } from './src/redux/actions/userActions';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import PushNotification from "react-native-push-notification";
import { useColorScheme } from 'react-native';
import { get, save } from './src/Storage';
import MissionDetails from './src/screens/DashboardScreens/DriverDashboard/MissionDetails';
import InternetDisconnected from './src/components/Animations/InternetDisconnected';
import NetInfo from '@react-native-community/netinfo';
function App(): JSX.Element {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      // console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // console.log("ACTION:", notification.action);
      // console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
    requestPermissions: Platform.OS === 'ios'
  });
  const missions = useSelector(({ missions }) => missions?.missions);
  const [cuuerentLength, setcuuerentLength] = useState(missions?.length)
  const user = useSelector(state => state?.auth);

  const sendNotification = (mission) => {
    PushNotification.localNotification({
      channelId: "channel-id", // (required)
      // channelName: "My channel", // (required)
      title: "New Mission",
      message: `A new mission is in progress\nDistance: ${parseInt(missions[missions?.length-1]?.distance)}KM \nDate Depart: ${missions[missions?.length-1]?.dateDepart ? missions[missions?.length-1]?.dateDepart.toString() : ''}\nDriver Auto: ${missions[missions?.length-1]?.driverIsAuto ? 'Yes' : 'No'}`,
      playSound: true, // (optional) default: true
      soundName: "default",
      vibrate: true,
      allowWhileIdle: true
    });
  };
  useEffect(() => {
    sendNotification()
    if(
      missions?.length != cuuerentLength && user.isConnected
    ){
      setcuuerentLength(missions?.length)
      sendNotification()
    }
    },[missions, cuuerentLength])
  useEffect(() => {
    AsyncStorage.getItem('jwtToken')
    .then(value => {
      if (value) {
        const decode = jwt_decode(value);
        store.dispatch(setCurrentUser(decode));
        store.dispatch(findBasicInfoByUserId());
        store.dispatch(GetMissions());
        SetAuthToken(value); // Corrected typo here
      }
    })
    .catch(err => {
    });
    const activeExpires = new Date(user?.user?.iat);
    const currentDate = new Date();
    if (currentDate > activeExpires) {
      AsyncStorage.removeItem('jwtToken');
      store.dispatch(LogOut())
    }
  }, [])
  // -------------theme----------------------------
  const [isConnected, setIsConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const appearance = useColorScheme();
  const setAppTheme = useCallback(async () => {
    const IS_FIRST = await get('IS_FIRST');
    // console.log(IS_FIRST);
    if (IS_FIRST === null) {
      save('Theme', appearance);
      save('IsDefault', true);
      save('IS_FIRST', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  // -------------theme----------------------------
  useEffect(() => {
    AsyncStorage.getItem('jwtToken')
      .then(value => {
        if (value) {
          const decode = jwt_decode(value);
          store.dispatch(setCurrentUser(decode));

          SetAuthToken(value);
        }
      })
      .catch(err => {
      });

    const activeExpires = new Date(user?.user?.iat);
    const currentDate = new Date();
    // console.log(`activeExpires-----------------------------------------------------------------------------------`,
    //  activeExpires < currentDate);
    if (currentDate > activeExpires) {
      AsyncStorage.removeItem('jwtToken');
      store.dispatch(LogOut())
      // store.dispatch(setCurrentUser({}));
    }
  }, []);









  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowMessage(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 1000); // Delay for 1 second
    }
  }, [showMessage]);

  // console.log('isConnected', isConnected);
  // console.log(showMessage);
  // console.log(isConnected);
// console.log(user)
  if (!isConnected) {
    return <InternetDisconnected />;
  }
  return (
    <SafeAreaProvider>

    <>
      {/* {!isConnected && <InternetDisconnected />} */}
      {/* {!isConnected && <OTPVerified/>} */}

      <NavigationContainer>
      {user.isConnected && user.isDriver ? (
       <Drawer.Navigator
       screenOptions={{
         activeTintColor: '#e91e63',
         itemStyle: {marginVertical: 5},

                    // headerShown: false,


       }}
       drawerContent={props => <CustomSidebarMenu {...props} />}>
       {/* <Drawer.Screen
         name="FirstDrawerPage"
         options={{drawerLabel: 'Home'
          , title: 'Home',
          headerShown:false
          drawerIcon: ({ focused, size }) => (
            <Icon
                name="home"
                size={size}
                color={focused ? '#26cbfc' : 'black'}
            />
        ),
        }}
         component={FirstScreenStack}
       /> */}
        <Drawer.Screen
      name="Driver"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={Dashboard}
    />
       <Drawer.Screen
         name="CityPage"
         options={{drawerLabel: 'City', title: 'City',

         drawerIcon: ({ focused, size }) => (
          <Icon2
              name="car-side"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),
        }}
         component={Dashboard}
       />

          <Drawer.Screen
          name="RequestHistoryPage"
          options={{drawerLabel: 'Request history', title: 'Request History',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ focused, size }) => (
           <Icon3
               name="clockcircleo"
               size={size}
               color={focused ? '#26cbfc' : 'black'}
           />
       ),}}
          component={RequestHistory}
        />


          <Drawer.Screen
          name="MyAccountPage"
          options={{drawerLabel: 'My account', title: 'My Account',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ focused, size }) => (
           <Icon5
               name="account"
               size={size}
               color={focused ? '#26cbfc' : 'black'}
           />
       ),}}
          component={MyAccount}
        />



        <Drawer.Screen
         name="SafetyPage"
         options={{drawerLabel: 'Safety', title: 'Safety',
         drawerIcon: ({ focused, size }) => (
          <Icon4
              name="safety-check"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),}}
         component={SafetyScreen}
       />
        <Drawer.Screen
         name="SettingsPage"
         options={{drawerLabel: 'Settings', title: 'Settings',
         drawerIcon: ({ focused, size }) => (
          <Icon3
              name="setting"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),
        }}
         component={SettingsScreen}
       />
       <Drawer.Screen
         name="FaqPage"
         options={{drawerLabel: 'FAQ', title: 'FAQ',
         drawerIcon: ({ focused, size }) => (
          <Icon3
              name="exclamationcircleo"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),

        }}
         component={FAQScreen}
       />
       <Drawer.Screen
         name="SupportPage"
         options={{drawerLabel: 'Support', title: 'Support',
         drawerIcon: ({ focused, size }) => (
          <Icon5
              name="comment-processing-outline"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),
        }}
         component={SupportScreen}
       />
       <Drawer.Screen
         name="OnlineRegistrationPage"
         options={{drawerLabel: 'Online Registration', title: 'Online Registration',
         drawerItemStyle: { display: 'none' },
         drawerIcon: ({ focused, size }) => (
          <Icon6
              name="edit"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),
        }}
         component={OnlineRegistration}
       />
       <Drawer.Screen
      name="profileSettings"
      options={{
        drawerLabel: () => null, // Hide the label

        drawerItemStyle: { display: 'none' }, // Hide the item
      }}
      component={ProfileSettings}
    />
    <Drawer.Screen
      name="Destination"
      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
      }}
      component={Destination}
    />
    <Drawer.Screen
      name="Location"
      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
      }}
      component={Location}
    />
    <Drawer.Screen
      name="FindDriverScreen"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={FindDriverScreen}
    />
    <Drawer.Screen
      name="MissionDetails"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={MissionDetails}
    />

    <Drawer.Screen
      name="Registration"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={RegistartionScreen}
      />
      {/* //  ---------------------------------- Registration ------------------------ */}
      <Drawer.Screen
      name="BasicInfo"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",

      }}
      component={BasicInfo}
    />
     <Drawer.Screen
      name="DriverLicense"

      options={{
        drawerLabel: "Driver License",
        title:"Driver License", // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={DriverLicense}
    />
     <Drawer.Screen
      name="IdConfirmation"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
      }}
      component={IDConfirmation}
    />
     <Drawer.Screen
      name="ProfessionalDrivingCard"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"بطاقة القيادة المهنية"
      }}
      component={Professionaldrivingcard}
    />
     <Drawer.Screen
      name="AgentReferralCode"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"Agent Referral Code"
      }}
      component={AgentReferralCode}
    />
     <Drawer.Screen
      name="ExploitCard"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"بطاقة إستغلال"
      }}
      component={ExploitCard}
    />
     <Drawer.Screen
      name="VehicleInfo"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        title:"Vehicle Info",
        // header:"  Header",
      }}
      component={VehicleInfo}
    />
     {/* </Drawer.Navigator> */}

     {/* -----------------------Vehicle info */}
     <Drawer.Screen
      name="NumberPlat"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"Number plate"
          }}
      component={NumberPlate}
    />
     <Drawer.Screen
      name="PhotoVehicle"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"Photo of your vehicle"
          }}
      component={PhotoVehicle}
    />
     <Drawer.Screen
      name="CertificateVehicle"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"Certificate of Vehicle Registration"
          }}
      component={CertificateVehicle}
    />
     <Drawer.Screen
      name="RideDetails"

      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
        // header:"  Header",
        title:"Ride details"
          }}
      component={RideDetails}
    />
     </Drawer.Navigator>



        ):(
          <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen name="Login" component={LogInScreen} />
         <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
        )}
 <Stack.Screen name="profileSettings" component={ProfileSettings} />

      </NavigationContainer>
    </>
      </SafeAreaProvider>


  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'green',
    padding: 0,
    position: 'relative',
    // top:10,
    width: '100%',

    zIndex: 555,
  },
  messageText: {
    color: 'white',
  },
});

export default App;