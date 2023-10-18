import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
import Fonts from '../fonts';
const theme = {
    colors: { 
      primary: '#ad336d',
      secondary: '#432371',
      tertiary: '#f4f6fc',
      black: '#000',
      white: '#fff',
      gray: '#D8D8D8',
      gray2: '#EFEFEF',
      gray3: '#F7F7F7',
      gray4: '#F2F2F2',
      gray5: '#F5F5F5',
      gray6: '#F6F6F6',
      gray7: '#F8F8F8',
    }
}
 export default StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
});


