/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, useColorScheme, PermissionsAndroid, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon6 from 'react-native-vector-icons/FontAwesome5'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import { get, save } from '../../../Storage'
import { Colors } from '../../../theme'
import Destination from '../Components/Destination'
import RideRequests from './RideRequests'
import MyIncome from './MyIncome'
import Rating from './Rating'
import { socket } from '../../../../socket'
import { useDispatch, useSelector } from 'react-redux'
import { AddCurrentLocation, GetCurrentUser, checkDriverDocumentIsCompleted } from '../../../redux/actions/userActions'
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AcceptedMissions from './AcceptedMissions'
import Home from './Home'
import MesMission from './MesMission'
import { Modal } from 'react-native-paper'
const Tab = createBottomTabNavigator();
const Dashboard = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state=>state?.currentUser2?.users?.user)
  const currentUser2 = useSelector(state=>state?.auth)
  const user = useSelector(state => state?.auth);

  useEffect(() => {
    dispatch(checkDriverDocumentIsCompleted(dispatch))

  }, [user?.driverDocumentsIsVerified])

  console.log(user)

  useFocusEffect(
    React.useCallback(() => {

      dispatch(checkDriverDocumentIsCompleted(dispatch))

    }, [])
  );
  const [themeValue, setThemeValue] = useState('');
  const themes = useColorScheme();
  useEffect(() => {
    dispatch(GetCurrentUser())
      // dispatch(removeSeenMsg([]))
      // dispatch(addUnseenmsg(currentUser?.Newsocket))

    }, [dispatch,currentUser?.Newsocket?.length])

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

      }, []);

      useEffect(() => {
        getAppTheme();
      }, [getAppTheme]);

      const styles = styling(themeValue);

      // ------------------End theme-----------------------

        // ---------------------- SocketIO--------------------------------------
        const [userConnected_id, setuserConnected_id] = useState()
  useEffect(() => {
    // Handle connection
    socket.on('connect', () => {

      // // if(currentUser){


if(
  currentUser2
){


  socket.emit('clientData', { user:currentUser2?.user?.id });
  socket.emit('add-user', currentUser2?.user?.id);
  setuserConnected_id(currentUser2?.user?.id)
}

      // }
    });

    // Handle disconnection
    socket.on('disconnect', () => {



        // socket.emit('clientData2', { user:userConnected_id });

    });

    // Cleanup on component unmount

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleCheckConnection = () => {

    // Emit a custom event to check the connection status
    socket.emit('check_connection', (status) => {

    });
  };

  // ----------------------End SocketIO-----------------------------------

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
            {/* <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >

                         <Icon4 name={'bars'} size={20} color={focused ?"#26cbfc": "#999"} />
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >Ride requests</Text>
                    </View>
                )
            }}  name="Dashboard" component={RideRequests}/> */}
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >

                         <Icon4 name={'bars'} size={20} color={focused ?"#26cbfc": "#999"} />
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >Home</Text>
                    </View>
                )
            }}  name="Dashboard" component={Home}/>
            {user?.driverDocumentsIsVerified &&
            <>



            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Icon6 name={focused ? 'route' : 'route'} size={20} color={focused ? "#26cbfc": "#999"} />
                         {/* <Text style={{color: focused ? '#fff':'grey',fontFamily:'Roboto-Bold', fontSize:10}} >Scan</Text>    */}
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} >Missions</Text>
                    </View>
                )
            }}  name="Missions" component={MesMission}/>

<Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Icon5 name={focused ? 'money' : 'money'} size={20} color={focused ? "#26cbfc": "#999"} />
                         <Text style={{color: focused ? "#26cbfc": "#999",fontFamily:'Roboto-Bold', fontSize:10}} > Mes Rénumérations</Text>
                    </View>
                )
            }}  name="recents" component={MyIncome}/>
            </>
            }





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