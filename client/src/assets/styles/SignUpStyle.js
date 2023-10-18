import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import theme from '../../constants/Colors'

const screenHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Fonts from '../fonts';
// const theme = {
//   colors: { 
//     theme1:{
//     primary:  '#ad336d',
//     secondary: '#432371',
//     backgroundColor: '#f4f6fc',
//     // black: '#03071e',
//     white: '#fff',
//     black: "#000",
  
//     // borderBottomColor: '#aaa',
//     gray:'#aaa',
//     gray2: '#eee',
//     white: '#fff'
//     },
//     theme2:{
//       primary:  process.env.ICON_COLOR,
//     secondary: '#432371',
//     tertiary: '#f4f6fc',
//     black: '#03071e',
//     white: '#fff',
//     gray: '#D8D8D8',
//     gray2: '#EFEFEF',
//     gray3: '#F7F7F7',
//     gray4: '#F2F2F2',
//     gray5: '#F5F5F5',
//     gray6: '#F6F6F6',
//     gray7: '#F8F8F8',
//   }
// }
// }
 export default StyleSheet.create({
  mainCon: {
    backgroundColor: theme.colors.theme1.backgroundColor,
    flex: 1,
    height:screenHeight
    
  },
  loginIcon: {
    alignSelf: 'center',
    marginTop: -30,
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
  registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 0},
  registerLbl: {color: theme.colors.theme1.primary,
     fontFamily: Fonts.type.NotoSansSemiBold,
    },
  registerNew: {
    color: theme.colors.theme1.gray,  
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  
  LoginBtn: {
    backgroundColor: theme.colors.theme1.primary,
    borderRadius: 20,
    marginTop:20
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
 
  deviderCon: {
    paddingVertical: 10,
  },
 
 
  
 
});


