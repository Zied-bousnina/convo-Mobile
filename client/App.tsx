/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            // color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            // color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowMessage(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (!isConnected) {
    return <InternetDisconnected />;
  }

  return (
    <>
      {!isConnected && <InternetDisconnected />}
      {/* {!isConnected && <OTPVerified/>} */}

      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LogInScreen} />
        </Stack.Navigator>

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
