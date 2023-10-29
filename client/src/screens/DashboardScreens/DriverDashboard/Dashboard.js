import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import { get, save } from '../../../Storage'
import { Colors } from '../../../theme'
import Destination from '../Components/Destination'
import RideRequests from './RideRequests'
import MyIncome from './MyIncome'
import Rating from './Rating'
const Tab = createBottomTabNavigator();
const Dashboard = () => {
    const [themeValue, setThemeValue] = useState('');
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
        // console.log('storage', theme)
      }, []);

      useEffect(() => {
        getAppTheme();
      }, [getAppTheme]);

      const styles = styling(themeValue);

      // ------------------End theme-----------------------


  return (
    <>

     <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                marginBottom:'2%',
                marginTop:'2%',
                marginHorizontal:'2%',
                borderRadius:10,
                height:50,
                ...styles.shadow
            },
            tabBarShowLabel:false,

        }} >
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >

                         <Icon4 name={'bars'} size={20} color={focused ?"#26cbfc": "#999"} />
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >Ride requests</Text>
                    </View>
                )
            }}  name="Dashboard" component={RideRequests}/>

<Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Icon5 name={focused ? 'money' : 'money'} size={20} color={focused ? "#26cbfc": "#999"} />
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >My Income</Text>
                    </View>
                )
            }}  name="recents" component={MyIncome}/>

<Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Icon4 name={focused ? 'staro' : 'staro'} size={20} color={focused ? "#26cbfc": "#999"} />
                         {/* <Text style={{color: focused ? '#fff':'grey',fontFamily:'Roboto-Bold', fontSize:10}} >Scan</Text>    */}
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >Rating</Text>
                    </View>
                )
            }}  name="scan" component={Rating}/>



        </Tab.Navigator>

    </>
  )
}

export default Dashboard
const styling =theme=> StyleSheet.create({
    shadow:{
        elevation:5,
        shadowColor:'#000',
      //   backgroundColor:'#00003f',
        backgroundColor:"white",
      // backgroundColor:'#34073d',
        borderWidth:1,
        borderColor:'transparent',
    },
    focusedIcon:{
      color:"#fff"
    }

  })