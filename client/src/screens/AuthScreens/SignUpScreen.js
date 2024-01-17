import React, {Component, useState, useRef, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  Pressable,
  SignUpStyleheet,
  TextInput,
  Dimensions,

  KeyboardAvoidingView,
  useColorScheme,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get, save } from '../../Storage';
import { Colors } from '../../theme';
import CostomFormik from '../../components/costomFormik/CostomFormik';
import AppInput from '../../components/Inputs/AppInput';
import * as yup from 'yup'
import { Animated } from 'react-native';
import AtSVG from '../../components/svg/AtSVG';
import UserSVg from '../../components/svg/UserSVg';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../assets/fonts';
import AppLoader from '../../components/Animations/AppLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const initialValues = {
    email: '',
    password: '',
    confirm: '',
    name:''
  };
  const validationSchema = yup.object({

    name: yup
      .string()
      .trim()
      .required('Name is required'),
    email: yup
      .string()
      .trim()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    password: yup.string().trim().min(6, 'password is too short!').required('Password is required'),
    confirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
const AnimatedLine = Animated.createAnimatedComponent(View);

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Logo from '../../components/svg/LOGO';
import LockIcon from '../../components/svg/LockIcon';
import ShowIcon from '../../components/svg/ShowIcon';
import LoginButton from '../../components/Buttons/LoginButton';
import { registerUser } from '../../redux/actions/authActions';
const SignUpScreen = () => {

    const [show, setshow] = useState(false);
    const lineAnimation = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)

    const [isLoading, setisLoading] = useState(false)

    showPasswordHandler = navigation => {
      setshow(!show);
      Animated.timing(lineAnimation, {
        toValue: show ? 0 : 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    // useEffect(() => {
    //     setTimeout(() => {


    //       setisLoading(false)

    //      }, 10000);

    //   }, [])

      // ------------------ Theme ------------------
  const [themeValue, setThemeValue] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();


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
    console.log('storage', theme)
  }, []);

  useEffect(() => {
    getAppTheme();
  }, [getAppTheme]);

  const SignUpStyle = styling(themeValue);

  // ------------------End theme-----------------------

  const handleSignUp = async (values, formikActions)=> {
    setisLoading(true)

    const { email, password, confirm, name } = values;
    console.log(values)
    // dispatch(formikActions.signUp(email, password, confirm, name));
    // console.log(formikActions.signUp(email, password, confirm, name))
    dispatch(registerUser({...values, firstLogin:false}, navigation))
    setTimeout(() => {


     setisLoading(false)

    }, 10000);

    // formikActions.resetForm()
      formikActions.setSubmitting(false);

      // console.log(errors)
      console.log(isLoading)



  }

  return (
<>
    {isLoad? <AppLoader/> : null }
     {isLoading? <AppLoader /> : null}
     {/* <AppLoader /> */}
     {/* <GestureHandlerRootView
     style={{
       backgroundColor: "#fff"
     }}
     > */}
     {/* <ActivityIndicator size="large" color="#00ff00" /> */}


     <KeyboardAwareScrollView behavior="position" style={SignUpStyle.mainCon}>
         <View style={SignUpStyle.loginIcon}>
           {/* <SvgIcon icon={'signup'} width={300} height={300} /> */}
           <Logo
                     width={Dimensions.get('window').width*0.6}
                     height={Dimensions.get('window').height*0.3}
                     />

         </View>
         <CostomFormik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handleSignUp}
             >

         <View style={SignUpStyle.container}>
           <View style={SignUpStyle.loginLblCon}>
             <Text style={SignUpStyle.loginLbl}>Sign up</Text>
           </View>
           <View style={SignUpStyle.formCon}>
             <View style={SignUpStyle.textBoxCon}>
               <View style={SignUpStyle.at}>
                 <AtSVG
                   width={20}
                   height={20}
                 />

               </View>
               <View style={SignUpStyle.textCon}>
                 <AppInput
                   name="email"
                   placeholder="Email ID"
                   style={SignUpStyle.textInput}
                   placeholderTextColor={'#aaa'}
                 />
               </View>
             </View>
             <View style={[SignUpStyle.textBoxCon, {marginTop: 30}]}>
               <View style={SignUpStyle.at}>
                 <UserSVg
                   width={20}
                   height={20}
                 />
               </View>
               <View style={SignUpStyle.textCon}>
                 <AppInput
                   name="name"
                   placeholder="Full Name"
                   style={SignUpStyle.textInput}
                   placeholderTextColor={'#aaa'}
                 />
               </View>
             </View>

             <View style={[SignUpStyle.textBoxCon, {marginTop: 30}]}>
               <View style={SignUpStyle.at}>
                 <LockIcon width={20} height={20} />
               </View>
               <View style={[SignUpStyle.passCon]}>
                 <View style={SignUpStyle.textCon}>
                   <AppInput
                     name="password"
                     placeholder="Password"
                     secureTextEntry={!show}
                     style={SignUpStyle.textInput}
                     placeholderTextColor={'#aaa'}
                   />
                 </View>
                 <View style={SignUpStyle.show}>
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
             <View style={[SignUpStyle.textBoxCon, {marginTop: 30}]}>
               <View style={SignUpStyle.at}>
                 <LockIcon width={20} height={20} />
               </View>
               <View style={[SignUpStyle.passCon]}>
                 <View style={SignUpStyle.textCon}>
                   <AppInput
                     name="confirm"
                     placeholder="Confirm Password"
                     secureTextEntry={!show}
                     style={SignUpStyle.textInput}
                     placeholderTextColor={'#aaa'}
                   />
                 </View>
                 <View style={SignUpStyle.show}>
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
             <View style={SignUpStyle.termsCon}>
               {/* <Text style={SignUpStyle.termsBy}>
                 By signing up, you're agree to our{' '}
               </Text>
               <Pressable
                 onPress={() =>navigation.navigate('SignUpScreen')}>
                 <Text style={SignUpStyle.termLbl}>Terms & Conditions </Text>
               </Pressable>
               <Text style={SignUpStyle.termsBy}> and </Text>
               <Pressable
                 onPress={() => navigation.navigate('SignUpScreen')}>
                 <Text style={SignUpStyle.termLbl}>Privacy Policy</Text>
               </Pressable> */}
             </View>
           </View>

           <View style={SignUpStyle.loginCon}>
             <LoginButton
               style={SignUpStyle.LoginBtn}
               loginBtnLbl={SignUpStyle.loginBtnLbl}
               btnName={"Register"}
             />
           </View>

           <View style={SignUpStyle.registerCon}>
             <Text style={SignUpStyle.registerNew}>Joined us before? </Text>
             <Pressable
               onPress={() => navigation.navigate('Login')}
               >
               <Text style={SignUpStyle.registerLbl}>Login</Text>
             </Pressable>

           </View>
         </View>
         </CostomFormik>
       </KeyboardAwareScrollView>
       {/* </GestureHandlerRootView> */}
       </>
  )
}

export default SignUpScreen

const styling = theme=>StyleSheet.create({
    mainCon: {
      backgroundColor:  Colors[theme]?.backgroundColor,
      flex: 1,
      height:screenHeight

    },
    loginIcon: {
      alignSelf: 'center',
      top:-70,
      left:-30
    },
    formCon: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginTop: -30,
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
      color: "#022d26" ,
      fontSize: 32,
      fontFamily: Fonts.type.NotoSansExtraBold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5,
      marginBottom:10
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
      borderBottomColor:  Colors[theme]?.gray,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      color:  Colors[theme]?.black,
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansMedium,
      height: 40,
    },
    forgotAction: {
      paddingVertical: 20,
    },
    registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 10},
    registerLbl: {color:  "#26cbfc",
       fontFamily: Fonts.type.NotoSansSemiBold,
      },
    registerNew: {
      color:  "#022d26",
      fontFamily: Fonts.type.NotoSansSemiBold,
    },

    LoginBtn: {
      backgroundColor:  "#2df793",
      borderRadius: 20,
      marginTop:20
    },
    loginBtnLbl: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansBlack,
      color:  Colors[theme]?.white,
      paddingVertical: 10,
    },
    devider: {
      borderBottomColor:  Colors[theme]?.gray,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 20,
    },

    deviderCon: {
      paddingVertical: 10,
    },




  });