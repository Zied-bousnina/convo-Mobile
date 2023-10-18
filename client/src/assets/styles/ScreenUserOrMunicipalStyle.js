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
  blockMenu: {
        // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 50,
    paddingVertical:40,
    height:screenHeight,
    padding: 20,
    backgroundColor: '#f4f6fc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 11,
    elevation: 2,
  },
  blockMenuTitle: {
    
    fontSize: 22,
    fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
    color: '#ef745c',
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
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ef745c',
    paddingVertical: 0.25,
    paddingHorizontal: 1.5,
    fontSize: 20,
    fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
    color: '#3a3e37',
    textAlign: 'center',
    // transitionDuration: 250,
    // transitionTimingFunction: 'ease',
  },

  card: {
    padding: 20,
    marginVertical: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
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
    color: '#333',
    marginBottom: 10,
    
    },
    cardHeaderBold: {
    fontFamily: 'Aller-Bold',
    },
    cardTitle: {
    fontSize: 22,
    fontFamily: 'Aller-Bold',
    color: '#ef745c',
    marginBottom: 10,
    },
    cardLocation: {
    fontSize: 16,
    fontFamily: 'Aller-Regular',
    color: '#666',
    marginBottom: 10,
    },
    cardButton: {
    backgroundColor: '#ef745c',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    },
    cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Aller-Bold',
    textAlign: 'center',
    },
});


