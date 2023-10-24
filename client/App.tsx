/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LogInScreen from './src/screens/AuthScreens/LoginScreen';
import InternetDisconnected from './src/components/Animations/InternetDisconnected';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { save } from './src/Storage';
import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import VerifyEmailScreen from './src/screens/AuthScreens/VerifyEmailScreen';
import { LogBox } from 'react-native';
import ForgotPasswordScreen from './src/screens/AuthScreens/ForgotPasswordScreen';
import UserDashboardScreen from './src/screens/DashboardScreens/UserDashboardScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import { LogOut, setCurrentUser } from './src/redux/actions/authActions';
import { SetAuthToken } from './src/utils/SetAuthToken';
import store from './src/redux/store/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SecondPage from './src/screens/DashboardScreens/SideBarComponents/SecondPage';
import FirstPage from './src/screens/DashboardScreens/SideBarComponents/FirstPage';
import ThirdPage from './src/screens/DashboardScreens/SideBarComponents/ThirdPage';
import CustomSidebarMenu from './src/screens/DashboardScreens/CustomSidebarMenu';
import ProfileSettings from './src/screens/DashboardScreens/ProfileSettings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


function FirstScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="FirstPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstPage" component={UserDashboardScreen} />
    </Stack.Navigator>
  );
}

function SecondScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SecondPage" component={SecondPage} />
      <Stack.Screen name="ThirdPage" component={ThirdPage} />
    </Stack.Navigator>
  );
}
function App(): JSX.Element {

  const [isConnected, setIsConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const user = useSelector(state => state?.auth);
  const profile = useSelector(state => state?.profile);
  const request = useSelector(state => state?.request?.requestIsEmpty);
  // -------------theme----------------------------
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
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowMessage(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('jwtToken')
    .then(value => {
      if (value) {
        const decode = jwt_decode(value);
        console.log("ligne 96:******************************************",value)
        // console.log(decode);
        // store.dispatch(GetRequest());
        store.dispatch(setCurrentUser(decode));
        // store.dispatch(GetProfile());
        // store.dispatch(GetCurrentAccess())
        SetAuthToken(value); // Corrected typo here
      }
    })
    .catch(err => {
      // console.log(err);
    });
  }, [])

  useEffect(() => {

    AsyncStorage.getItem('jwtToken')
      .then(value => {
        if (value) {
          const decode = jwt_decode(value);
          console.log("ligne 107:******************************************",value)
          // console.log(decode);
          store.dispatch(setCurrentUser(decode));
          // store.dispatch(GetProfile());
          // store.dispatch(GetRequest());
          // store.dispatch(CreateScore());
          SetAuthToken(value); // Corrected typo here
        }
      })
      .catch(err => {
        // console.log(err);
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

console.log("is user", user)
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 1000); // Delay for 1 second
    }
  }, [showMessage]);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log('(((((((((((((((((((((((((((((((((((',user)

  if (!isConnected) {
    return <InternetDisconnected />;
  }

  return (
    <>
      {!isConnected && <InternetDisconnected />}
      {/* {!isConnected && <OTPVerified/>} */}

      <NavigationContainer>
      {user.isConnected ? (
       <Drawer.Navigator
       screenOptions={{
         activeTintColor: '#e91e63',
         itemStyle: {marginVertical: 5},

                    // headerShown: false,


       }}
       drawerContent={props => <CustomSidebarMenu {...props} />}>
       <Drawer.Screen
         name="FirstDrawerPage"
         options={{drawerLabel: 'Home'
          , title: 'Home',
          // headerShown:false
          drawerIcon: ({ focused, size }) => (
            <Icon
                name="home"
                size={size}
                color={focused ? '#26cbfc' : 'black'}
            />
        ),
        }}
         component={FirstScreenStack}
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
         component={SecondScreenStack}
       />
       <Drawer.Screen
         name="RequestHistoryPage"
         options={{drawerLabel: 'Request history', title: 'Request History',
         drawerIcon: ({ focused, size }) => (
          <Icon3
              name="clockcircleo"
              size={size}
              color={focused ? '#26cbfc' : 'black'}
          />
      ),}}
         component={SecondScreenStack}
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
         component={SecondScreenStack}
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
         component={SecondScreenStack}
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
         component={SecondScreenStack}
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
         component={SecondScreenStack}
       />
       <Drawer.Screen
      name="profileSettings"
      options={{
        drawerLabel: () => null, // Hide the label
        drawerItemStyle: { display: 'none' }, // Hide the item
      }}
      component={ProfileSettings}
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

    // <NavigationContainer>
    //   <View>
    //     {showMessage && isConnected && (
    //       <View style={styles.messageContainer}>
    //         <Text style={styles.messageText}>Connected</Text>
    //       </View>
    //     )}
    //     {!isConnected && (
    //       <Text style={{ color: 'red', backgroundColor: 'white' }}>
    //         {!isConnected && 'Internet Disconnected'}
    //       </Text>
    //     )}
    //   </View>

    //   {user.isConnected ? (
    //     user.isUser && user?.profile?.profileIsEmpty ? (
    //       <Stack.Navigator
    //         initialRouteName="EditProfile"
    //         screenOptions={{
    //           headerShown: false,
    //         }}>
    //         <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    //       </Stack.Navigator>
    //     ) : user.isAdmin ? (
    //       <Stack.Navigator
    //         initialRouteName="AdminDashboard"
    //         screenOptions={{
    //           headerShown: false,
    //         }}>
    //         <Stack.Screen
    //           name="AdminDashboard"
    //           component={AdminDashboardScreen}
    //         />
    //       </Stack.Navigator>
    //     ) : user.isMunicipal ? (
    //       <Stack.Navigator initialRouteName="MunicipalDashboard">
    //         <Stack.Screen
    //           name="MunicipalDashboard"
    //           component={MunicipalDashboardScreen}
    //         />
    //       </Stack.Navigator>
    //     ) : user.isUser && !user.isVerified ? (
    //       <Stack.Navigator
    //         initialRouteName="VerifyEmail"
    //         screenOptions={{
    //           headerShown: false,
    //         }}>
    //         <Stack.Screen
    //           name="VerifyEmail"
    //           component={VerifyEmailScreen}
    //           initialParams={{ email: user.email }}
    //         />
    //       </Stack.Navigator>
    //     ) : (
    //       <Stack.Navigator
    //         initialRouteName="UserDashboard"
    //         screenOptions={{
    //           headerShown: false,
    //         }}>
    //         <Stack.Screen
    //           name="UserDashboard"
    //           component={UserDashboardScreen}
    //         />
    //       </Stack.Navigator>
    //     )
    //   ) : (
    //     <Stack.Navigator
    //       initialRouteName="Login"
    //       screenOptions={{
    //         headerShown: false,
    //       }}>
    //         <Stack.Screen name="googleSignUp" component={SignUpGoogleScreen} />
    //         <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    //       <Stack.Screen name="Login" component={LogInScreen} />
    //       <Stack.Screen name="SignUpScreen" component={SignupScreen} />
    //       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    //       <Stack.Screen name="EnterOTPResetPassword" component={EnterOTPResetPassword} />
    //       <Stack.Screen name="OTPVerifyEmail" component={VerifyEmailScreen} />
    //       <Stack.Screen name="ResetPassword" component={ResetPassword} />

    //     </Stack.Navigator>
    //   )}
    // </NavigationContainer>
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
