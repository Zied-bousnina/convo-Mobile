import { View, Text, Pressable, ScrollView, Switch, useColorScheme } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BackSvg from '../svg/BackSvg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { get, save } from '../../Storage';
import { Colors } from '../../theme';

const SettingsComponent = () => {
  const navigation = useNavigation()
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
    setThemeValue(theme);
    setIsDarkTheme(theme === 'dark');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);
  }, []);

  useEffect(() => {
    getAppTheme();
  }, []);

  const toggleChange = _ => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    const newThemeValue = newIsDarkTheme ? 'dark' : 'light';
    setThemeValue(newThemeValue);
    themeOperations(newThemeValue);
    save('Theme', newThemeValue);
  };

  const styles= styling(themeValue)

  return (
    
    <SafeAreaView style={styles.container}>
       
    <ScrollView>
      
   
          <View style={styles.menuWrapper}>
<TouchableRipple onPress={() => navigation.navigate("Account")}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="key" style={styles.icon} size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:-25 }}>
      <Text style={styles.menuItemText}>Account</Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >Delete account, Request account info</Caption>
    </View>
  </View>
</TouchableRipple>
{/* <TouchableRipple onPress={() => {navigation.navigate("Avatar")}}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="account-circle" style={styles.icon} size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:-25 }}>
      <Text style={styles.menuItemText}>Avatar</Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >Create, edit, profile photo</Caption>
    </View>
  </View>
</TouchableRipple> */}
{/* <TouchableRipple 
disabled
onPress={() => {}}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="theme-light-dark" style={styles.icon} size={25} />
    <Switch
                style={{ marginLeft: 30 }}
                value={isDarkTheme}
                onValueChange={toggleChange}
              />
              <Text>
                {isDarkTheme ? 'Dark' : 'Light'}
              </Text>
  </View>
</TouchableRipple> */}
<TouchableRipple onPress={() => {
  navigation.navigate("themes")
}}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="palette-swatch-outline" style={styles.icon} size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:40}}>
      <Text style={styles.menuItemText}>Themes</Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >theme 1, theme 2, theme 3, theme 4</Caption>
    </View>
  </View>
</TouchableRipple>
{/* <TouchableRipple onPress={() => {}}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="help-circle-outline" style={styles.icon} size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:30 }}>
      <Text style={styles.menuItemText}>Help</Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >Help center, contact us, privacy policy</Caption>
    </View>
  </View>
</TouchableRipple> */}


           
          </View>
    </ScrollView>
        </SafeAreaView>
  )
}

export default SettingsComponent

const styling =theme=> StyleSheet.create({
  container: {
    flex: 1,
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
    color: Colors[theme]?.gray,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  icon: {
    color: Colors[theme]?.secondary
  }
});