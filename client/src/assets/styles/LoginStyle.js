import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import theme from '../../constants/Colors'
const screenHeight = Dimensions.get('window').height;
import Fonts from '../fonts';

// const theme = {
//     colors: { 
//       theme1:{
//       primary:  '#ad336d',
//       secondary: '#432371',
//       backgroundColor: '#f4f6fc',
//       // black: '#03071e',
//       white: '#fff',
//       black: "#000",
//       shadowColor: '#000',
//       // borderBottomColor: '#aaa',
//       gray:'#aaa',
//       gray2: '#eee',
//       white: '#fff'
//       },
//       theme2:{
//         primary:  process.env.ICON_COLOR,
//       secondary: '#432371',
//       tertiary: '#f4f6fc',
//       black: '#03071e',
//       white: '#fff',
//       gray: '#D8D8D8',
//       gray2: '#EFEFEF',
//       gray3: '#F7F7F7',
//       gray4: '#F2F2F2',
//       gray5: '#F5F5F5',
//       gray6: '#F6F6F6',
//       gray7: '#F8F8F8',
//     }
//   }
// }


// export  LoginStyle
 export default StyleSheet.create({
    mainCon: {
      // backgroundColor: theme.colors.black,
      backgroundColor: theme.colors.theme1.backgroundColor,
// backgroundColor: process.env.ICON_COLOR,
      flex: 1,
      height:screenHeight
      
    },
    loginIcon: {
      alignSelf: 'center',
      top:-20
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
      color: theme.colors.theme1.black,
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
      borderBottomColor: theme.colors.theme1.gray,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      color: theme.colors.theme1.black,
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansMedium,
      height: 40,
    },
    forgotAction: {
      paddingVertical: 20,
    },
    registerCon: {flexDirection: 'row',
    padding:15,
     justifyContent: 'center', paddingTop: 10},
    registerLbl: {color: theme.colors.theme1.primary, fontFamily: Fonts.type.NotoSansSemiBold},
    registerNew: {
      color: theme.colors.theme1.gray,
      fontFamily: Fonts.type.NotoSansSemiBold,
    },
    forgotLbl: {
      color: theme.colors.theme1.primary,
      textAlign: 'right',
      fontFamily: Fonts.type.NotoSansSemiBold,
    },
    LoginBtn: {
      backgroundColor: theme.colors.theme1.primary,
      borderRadius: 20,
      shadowColor: theme.colors.theme1.black,
      borderColor: 'transparent',
    },
    loginBtnLbl: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansBlack,
      color: theme.colors.theme1.white,
      paddingVertical: 10,
    },
    devider: {
      borderBottomColor: theme.colors.theme1.gray,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 20,
    },
    or: {
      color: theme.colors.theme1.gray,
      textAlign: 'center',
      backgroundColor: theme.colors.theme1.backgroundColor,
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
      backgroundColor: theme.colors.theme1.gray2,
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 20,
      paddingHorizontal: 30,
    },
    googleLbl: {
      color: theme.colors.theme1.black,
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
  paddingVertical:40,
  height:screenHeight,
  padding: 20,
  backgroundColor: theme.colors.theme1.backgroundColor,
  
  borderRadius: 10,
  shadowColor: theme.colors.theme1.black,
  shadowOffset: { width: 6, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 11,
  elevation: 2,
  },
  blockMenuTitle: {
  
  fontSize: 22,
  fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
  color: theme.colors.theme1.primary,
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
    backgroundColor: theme.colors.theme1.white,
    // backgroundColor: ,
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: theme.colors.theme1.primary,
  paddingVertical: 0.25,
  paddingHorizontal: 1.5,
  fontSize: 20,
  fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
  color: theme.colors.theme1.black,
  textAlign: 'center',
  // transitionDuration: 250,
  // transitionTimingFunction: 'ease',
  },
  
  card: {
  padding: 20,
  marginVertical: 50,
  backgroundColor: theme.colors.theme1.white,
  borderRadius: 10,
  shadowColor: theme.colors.theme1.black,
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
  color: theme.colors.theme1.black,
  marginBottom: 10,
  
  },
  cardHeaderBold: {
  fontFamily: 'Aller-Bold',
  },
  cardTitle: {
  fontSize: 22,
  fontFamily: 'Aller-Bold',
  color: theme.colors.theme1.primary,
  marginBottom: 10,
  },
  cardLocation: {
  fontSize: 16,
  fontFamily: 'Aller-Regular',
  color: theme.colors.theme1.gray,
  marginBottom: 10,
  },
  cardButton: {
  backgroundColor: theme.colors.theme1.primary,
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  },
  cardButtonText: {
  color: theme.colors.theme1.white,
  fontSize: 16,
  fontFamily: 'Aller-Bold',
  textAlign: 'center',
  },
  });


