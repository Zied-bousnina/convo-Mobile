
import { View, Text, Pressable, ScrollView, Switch, useColorScheme, Dimensions, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BackSvg from '../svg/BackSvg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  Avatar,
  Title,
  Caption,
  
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';
import { get, save } from '../../Storage';
import RadioGroup from 'react-native-radio-buttons-group';
import HomeComponents from '../Admin/HomeComponents';
import ViewThemeComponents from './ViewThemesComponents';
const Themes = () => {
  const [radioButtons, setRadioButtons] = useState([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Theme 1',
        value: 'theme1'
    },
    {
        id: '2',
        label: 'Theme 2',
        value: 'theme2'
    },
    {
      id: '3', // acts as primary key, should be unique and non-empty string
      label: 'Theme 3',
      value: 'theme3'
  },
  {
      id: '4',
      label: 'Theme 4',
      value: 'theme4'
  }
]);
const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeValue, setThemeValue] = useState('');
  const themes = useColorScheme();
 
  
  const setTheme = useCallback(async (theme, isDefault) => {
    save('Theme', theme);
    save('IsDefault', isDefault);
    setThemeValue(theme);
  }, []);

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
    console.log("--------------------------------",theme)
    const foundButton = radioButtons.find(e => e.value === theme);
    if (foundButton) {
      foundButton.selected = true;
    }
    setThemeValue(theme);
    setIsDarkTheme(theme === 'dark');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);
  }, []);

  useEffect(() => {
    getAppTheme();
  }, []);


function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    console.log("on presss----------------",radioButtonsArray.find(e=>e?.selected==true))
    // setIsDarkTheme(newIsDarkTheme);
    const newThemeValue =radioButtonsArray.find(e=>e.selected==true).value;
    setThemeValue(newThemeValue);
    themeOperations(newThemeValue);
    save('Theme', newThemeValue);
    showAlert()
   
    // RNRestart.restart();
}
const showAlert = () =>
  Alert.alert(
    'Alert Title',
    "To apply the selected theme, please restart the app. Click 'OK' to restart now.",
    [
      {
        text: 'Cancel',
        // onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => RNRestart.restart() },
    ],
    // {
    //   cancelable: true,
    //   onDismiss: () =>
    //     Alert.alert(
    //       'This alert was dismissed by tapping outside of the alert dialog.',
    //     ),
    // },
  );
  return (
    <SafeAreaView style={styles.container}>
       
    <ScrollView>
      
   
          <View style={styles.menuWrapper}>

  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
  <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            
        />
  </View>

  <View
    style={{
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      width:Dimensions.get('screen').width,
      height:300
    }}
  >
    <ViewThemeComponents/>
  </View>





           
          </View>
    </ScrollView>
        </SafeAreaView>
  )
}

export default Themes

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});