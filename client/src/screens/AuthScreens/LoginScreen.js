/* eslint-disable prettier/prettier */
import { View, Text, Dimensions, Animated, useColorScheme, StyleSheet, Pressable, ImageBackground } from 'react-native'
import React, { useState, useRef, useCallback, useEffect} from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { get, save } from '../../Storage';
import { Colors } from '../../theme';
import Fonts from '../../../src/assets/fonts';
import AppLoader from '../../components/Animations/AppLoader';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/svg/LOGO';
import CostomFormik from '../../components/costomFormik/CostomFormik';
import AtSVG from '../../components/svg/AtSVG';
import AppInput from '../../components/Inputs/AppInput';
import LockIcon from '../../components/svg/LockIcon';
import ShowIcon from '../../components/svg/ShowIcon';
import LoginButton from '../../components/Buttons/LoginButton';
import GoogleSvg from '../../components/svg/GoogleSvg';
import { getUserByEmail, loginUser } from '../../redux/actions/authActions';
import isEmpty from '../../utils/isEmpty';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const screenHeight = Dimensions.get('window').height;
const initialValues = {
  email: '',
  password: '',
};
const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .trim()
    .min(4, 'password is too short!')
    .required('Password is required'),
});
const AnimatedLine = Animated.createAnimatedComponent(View);
GoogleSignin.configure({
  webClientId: '748250144158-0ii20tuoqf45r6lo3jsddkge4fl53une.apps.googleusercontent.com',
  offlineAccess: false,
});
const LoginScreen = () => {

  const [show, setshow] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
  const myViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  let scrollYPos = 0;
  const [isLoading, setisLoading] = useState(false)
  // ------------------ Theme ------------------
  const [themeValue, setThemeValue] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();
  const error = useSelector(state=>state?.errors)
  const user = useSelector(state=>state?.auth?.user)
  const request = useSelector(state=>state?.request)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)

  // -------------------Theme Operations-----------------------------
  const themeOperations = theme => {
    switch (theme) {
      case 'dark':
        setTheme(theme, false);
        // setInitialValue(2);
        return;
      case 'theme1':
        setTheme(theme, false);
        // setInitialValue(2);
        return;
      case 'theme2':
        setTheme(theme, false);
        // setInitialValue(2);
        return;
      case 'theme3':
        setTheme(theme, false);
        // setInitialValue(2);
        return;
      case 'theme4':
        setTheme(theme, false);
        // setInitialValue(2);
        return;
      case 'light':
        setTheme(theme, false);
        // setInitialValue(1);
        return;
      case 'default':
        setTheme(themes, true);
        // setInitialValue(3);
        return;
    }
  };

  const getAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback(async (theme, isDefault) => {
    save('Theme', theme);
    save('IsDefault', isDefault);
    setThemeValue(theme);
    // console.log('storage', theme)
  }, []);

  useEffect(() => {
    getAppTheme();
  }, [getAppTheme]);
  const LoginStyle = styling(themeValue);

  // ------------------End theme-----------------------

  showPasswordHandler = navigation => {
    setshow(!show);
    Animated.timing(lineAnimation, {
      toValue: show ? 0 : 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onPressSimpleUser = () => {
    // console.log('Simple User');
    navigation.navigate('SignUpScreen')
  };

  const handleLogin = (values, formikActions) => {
    setisLoading(true)
    console.log(values);
    // console.log(formikActions);
    dispatch(loginUser(values))
    dispatch(loginUser(values))
    // dispatch(GetProfile())
    // dispatch(GetRequest())
    // console.log("eeeeeee:", error)
    // console.log("is Empty ----------:", isEmpty(error))
    setTimeout(() => {
      if(!isEmpty(error)){
        // console.log("is Empty ----------:", isEmpty(error))
        setisLoading(false)
      }
    }, 10000);

    setTimeout(() => {


      setisLoading(false)

     }, 10000);


      // console.log(values, formikActions);
      // formikActions.resetForm()
      formikActions.setSubmitting(false);
      // if(user.isPrivateCompany && request.requestIsEmpty){
      //   Alert.alert("you have to determine the request")
      // }


  };
  const handleGoogleLogin = async() => {
    // Alert.alert('Google Login', 'This feature is not available yet');
    GoogleSignin.configure({
      webClientId: process.env.ANDROID_CLIENT_ID , // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
         });
         try {
          await GoogleSignin.hasPlayServices();
          const info = await GoogleSignin.signIn();
          dispatch(getUserByEmail(info, navigation))



          console.log(info)
          // setUserInfo(info);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            console.log(error)

            // some other error happened
          }
        }

  };
  return (

    <ImageBackground

    source={
        require('../../assets/images1/pattern-randomized.png')
        // require('../../assets')
    }
    style={{
      flex: 1,
      // backgroundColor: '#B52424', // Fallback color in case the image fails to load
    }}
    resizeMode="cover"
  >
    <>

    {/* {loading ? <EmailSent/> :null } */}
    {isLoad? <AppLoader/> : null }

      <GestureHandlerRootView
      // ref={scrollViewRef}
      style={LoginStyle.mainCon}
      >

    <KeyboardAwareScrollView behavior="position" style={LoginStyle.mainCon}>
      <View style={LoginStyle.loginIcon}>
        {/* <LoginSVG
        style={{
          top: 50,
          transform: [{scale: 0.8}],
        }}
        fill1={ themeValue ? '#1d0e4b' : '#432371'}
        fill2={ themeValue ? '#eb6352' : '#000000'}
        width={windowWidth * 0.8} height={windowHeight * 0.25} /> */}
        <Logo
                    width={Dimensions.get('window').width*0.6}
                    height={Dimensions.get('window').height*0.4}
                    />
      </View>

      <CostomFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        >
        <View style={LoginStyle.container}>
          <View style={LoginStyle.loginLblCon}>
            <Text style={[LoginStyle.loginLbl,{
              zIndex:70000,
              position:'relative'
            }]}>Login</Text>
          </View>
          <View style={LoginStyle.formCon}>
            <View style={LoginStyle.textBoxCon}>
              <View style={LoginStyle.at}>
                <AtSVG width={20} height={20} />
              </View>
              <View style={LoginStyle.textCon}>
                <AppInput
                  name="email"
                  placeholder="Email ID"
                  style={LoginStyle.textInput}

                  placeholderTextColor={'#aaa'}
                  />
              </View>
            </View>

            <View style={[LoginStyle.textBoxCon, {marginTop: 30}]}>
              <View style={LoginStyle.at}>
                <LockIcon width={20} height={20} />
              </View>
              <View style={[LoginStyle.passCon]}>
                <View style={LoginStyle.textCon}>
                  <AppInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry={!show}
                    style={LoginStyle.textInput}
                    placeholderTextColor={'#aaa'}
                    />
                </View>
                <View style={LoginStyle.show}>
                  <Pressable
                  onPress={showPasswordHandler}
                  >
                    <ShowIcon width={20} height={20} />
                    <AnimatedLine
                      style={{
                        height: 2,
                        width: lineAnimation,
                        backgroundColor: 'black',
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        transform: [{rotate: '150deg'}],
                      }}
                      />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={LoginStyle.forgotAction}>
  <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={LoginStyle.forgotLbl}>Forgot Password?</Text>
  </Pressable>

</View>
          </View>
          <View style={LoginStyle.loginCon}>
            <LoginButton
              style={LoginStyle.LoginBtn}
              loginBtnLbl={LoginStyle.loginBtnLbl}
              btnName={"Login"}
              />
              <Pressable
              onPress={() => {
                onPressSimpleUser()
                console.log("don't")}}
              >

              <Text style={LoginStyle.dontHaveAccountLbl}>Don't have an account yet?</Text>
              </Pressable>
          </View>
          {/* <View style={LoginStyle.deviderCon}>
            <View style={LoginStyle.devider} />
            <Text style={LoginStyle.or}>OR</Text>
          </View>
          <View style={LoginStyle.googleIconCon}>
            <View style={LoginStyle.googleIcon}>
              <GoogleSvg width={20} height={20} />
            </View>
            <View style={LoginStyle.googleLblCon}>
              <Pressable
              onPress={handleGoogleLogin}
              >
                <Text style={LoginStyle.googleLbl}>Login with Google</Text>
              </Pressable>
            </View>
          </View> */}
          <View style={LoginStyle.registerCon}>
            {/* <Text style={LoginStyle.registerNew}>New User? </Text> */}
            {/* <Pressable
            style={{
              // zIndex:50000
              marginBottom: 22,
            }}
             onPress={() => {
              // console.log("teeeeee")
              // navigation.navigate('userOrMunicipal')
              scrollViewRef.current.scrollToEnd({
                // y: myViewRef.current.offsetTop,
                animated: {
                  duration: 1000,

                  // easing: Easing.linear,
                  easing: Easing.easeOut,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),

                },

              });
            }}> */}
            {/* <Pressable onPress={() => navigation.navigate('SignUpScreen')}> */}
              {/* <Text style={LoginStyle.registerLbl}>Register</Text>
            </Pressable> */}



          </View>
        </View>
      </CostomFormik>

    </KeyboardAwareScrollView>
    {/* <Footer/> */}
    {/* <TopFooter/> */}



      {/* <View style={LoginStyle.card}>
  <Text style={LoginStyle.cardHeader}>from <Text style={LoginStyle.cardHeaderBold}>23/03/2023</Text> to <Text style={LoginStyle.cardHeaderBold}>26/03/2023</Text></Text>
  <Text style={LoginStyle.cardTitle}>Big Cleaning</Text>
  <Text style={LoginStyle.cardLocation}>Everywhere in Tunis</Text>
  <TouchableOpacity style={LoginStyle.cardButton} onPress={() => {}}>
    <Text style={LoginStyle.cardButtonText}>See the calendar</Text>
  </TouchableOpacity>
</View> */}
<Text
  style={{
    textAlign: 'center',
    fontSize: 12,
    color: "black",
    fontFamily: Fonts.type.NotoSans,
    marginTop: 20,
    marginBottom: 50,
  }}
>Version 1.1</Text>
</GestureHandlerRootView >

    </>
    </ImageBackground>
  )
}

export default LoginScreen

const styling = theme=>
StyleSheet.create({
  mainCon: {
    // backgroundColor: theme.colors.black,
    // backgroundColor: Colors[theme]?.backgroundColor,
// backgroundColor: process.env.ICON_COLOR,
    flex: 1,
    height:screenHeight*1.5

  },
  loginIcon: {
    alignSelf: 'center',
    // top:-70,
    // left:-30
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: Colors[theme]?.black,
    fontSize: 32,
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
    borderBottomColor: Colors[theme]?.gray,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: Colors[theme]?.black,
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  dontHaveAccountLbl: {
    marginTop: 10, // Adjust this value for proper spacing
    color:"#26cbfc" , // You can choose the color you want
    textDecorationLine: 'underline', // Underline the text to make it look like a link
  },
  registerCon: {flexDirection: 'row',
  padding:15,
   justifyContent: 'center', paddingTop: 10},
  registerLbl: {color: Colors[theme]?.primary, fontFamily: Fonts.type.NotoSansSemiBold},
  registerNew: {
    color: Colors[theme]?.gray,
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color:"#26cbfc" ,
    textAlign: 'right',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  LoginBtn: {
    backgroundColor: "#1b394a",
    borderRadius: 20,
    shadowColor: Colors[theme]?.black,
    borderColor: 'transparent',
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: Colors[theme]?.white,
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: Colors[theme]?.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: Colors[theme]?.gray,
    textAlign: 'center',
    backgroundColor: Colors[theme]?.backgroundColor,
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
    backgroundColor: Colors[theme]?.gray2,
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: Colors[theme]?.black,
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: Fonts.type.NotoSansBlack,
  },
  googleIcon: {
    alignSelf: 'center',
  },
  googleLblCon: {
    alignSelf: 'center',

  },
  error: {
    color: 'red',
    fontFamily: Fonts.type.NotoSansSemiBold,
    fontSize: 12,
  },


  blockMenu: {
    // flexDirection: 'column',
// justifyContent: 'center',
// alignItems: 'center',
// marginTop: 50,
// paddingVertical:40,
height:screenHeight,
padding: 20,
backgroundColor: Colors[theme]?.backgroundColor,

borderRadius: 10,
shadowColor: Colors[theme]?.black,
shadowOffset: { width: 6, height: 6 },
shadowOpacity: 0.1,
shadowRadius: 11,
elevation: 2,
},
blockMenuTitle: {

fontSize: 22,
fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
color: '#022D26',
marginBottom: 10,
},
blockMenuItems: {
display: 'flex',
flexDirection: 'row',
flexWrap: 'wrap',

marginHorizontal: -8,

},
blockMenuItem: {
paddingVertical: 12,
paddingHorizontal: 8,
flexGrow: 1,
},
blockMenuLink: {
  backgroundColor: Colors[theme]?.white,
  // backgroundColor: ,
borderRadius: 10,
borderWidth: 1.5,
borderColor: "#357762",
paddingVertical: 0.25,
paddingHorizontal: 1.5,
fontSize: 20,
fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
color: "#022d26",
textAlign: 'center',
// transitionDuration: 250,
// transitionTimingFunction: 'ease',
},

card: {
padding: 20,
marginVertical: 50,
backgroundColor: Colors[theme]?.white,
borderRadius: 10,
shadowColor: Colors[theme]?.black,
shadowOffset: {
width: 6,
height: 6,
},
shadowOpacity: 0.1,
shadowRadius: 11,
marginBottom: 20,
},
cardHeader: {
fontSize: 18,
fontFamily: 'Aller-Regular',
color: Colors[theme]?.black,
marginBottom: 10,

},
cardHeaderBold: {
fontFamily: 'Aller-Bold',
},
cardTitle: {
fontSize: 22,
fontFamily: 'Aller-Bold',
color: Colors[theme]?.primary,
marginBottom: 10,
},
cardLocation: {
fontSize: 16,
fontFamily: 'Aller-Regular',
color: Colors[theme]?.gray,
marginBottom: 10,
},
cardButton: {
backgroundColor: Colors[theme]?.primary,
borderRadius: 10,
paddingVertical: 10,
paddingHorizontal: 20,
},
cardButtonText: {
color: Colors[theme]?.white,
fontSize: 16,
fontFamily: 'Aller-Bold',
textAlign: 'center',
},
});