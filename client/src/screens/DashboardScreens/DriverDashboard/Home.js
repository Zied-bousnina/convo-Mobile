/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable,FlatList, PermissionsAndroid, Platform, ImageBackground, RefreshControl} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {AddCurrentLocation, ChangeStatus, getUsersById} from '../../../redux/actions/userActions';
import SwitchToggle from 'react-native-switch-toggle';
import {useNavigation} from '@react-navigation/native';
import {AccepteMission, FindLastMission, GetMissions, TermineeMission} from '../../../redux/actions/demandesActions';
import ListRequest from '../Components/ListRequest';
import {Button, ButtonGroup, withTheme, Text} from '@rneui/themed';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import { useCallback } from 'react';
import PushNotification from "react-native-push-notification";
import { formatDistanceToNow } from 'date-fns';
import { uniqueId } from "lodash";
import { FlashList } from "@shopify/flash-list";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import { FlatList } from "react-native-bidirectional-infinite-scroll";
// import { SkeletonPlaceholder } from 'react-native-skeleton-placeholder';
import Geolocation from 'react-native-geolocation-service';
import { socket } from '../../../../socket';
import { Button as BTN, Icon, MD3Colors } from 'react-native-paper';
import { SET_EN_ROUTE, SET_LAST_MISSION } from '../../../redux/types';
import { Image } from 'react-native-elements';
import { Button as BTNPaper } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Home = () => {
  const isEnRoute = useSelector(state=> state?.enRoute?.enRoute)

  const user = useSelector(({ currentUser }) => currentUser?.user);
  const [enRoute, setenRoute] = useState(isEnRoute)

  const [isEnabled, setIsEnabled] = useState(!!user?.driverIsVerified);
  const [selectedItem, setselectedItem] = useState({});

  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser2 = useSelector(state=>state?.auth)

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

  const enable = useCallback(() => {
    if (user?.onligne) {
      setIsEnabled(
        prev => {
          return true
        }
      );
    }
  }, [user?.onligne]);


  useEffect(() => {
    // console.log("render")
    dispatch(getUsersById());

    enable();
    // sendNotification()
  }, [dispatch, user?.length, enable]);


  // -------------------------------------------------------------
  const [noti, setnoti] = useState([])
  const [newMission, setnewMission] = useState(false)
  const sendNotification = (mission, navigation) => {
    // Create a channel for the notification
    PushNotification.createChannel(
      {
        channelId: "specialid",
        channelName: "Special Message",
        channelDescription: "Notification for special message",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    // Extract information from the mission object
    const {
      distance,
      address,
      destination,
      status,
      dateDepart,
      driverIsAuto,
      vehicleType,
      postalAddress,
      postalDestination,
    } = mission;

    // Customize the notification message based on the mission information
    const title = `Mission ${status}`;
    const message = `
      Distance: ${distance} km
      Departure Date: ${new Date(dateDepart).toLocaleString()}
      Driver: ${driverIsAuto ? 'Auto' : 'Manual'}
      Vehicle Type: ${vehicleType}
      From: ${postalAddress.display_name}
      To: ${postalDestination.display_name}
    `;

    // Trigger the local notification with a callback for handling onPress
    PushNotification.localNotification({
      channelId: 'specialid',
      title: title,
      message: message,
      onPress: () => {
        // Navigate to the "MissionDetails" screen with the provided parameters
        navigation.navigate("MissionDetails", {
          demandeId: mission._id,
          distance: distance,
          address: address,
          destination: destination,
          status: status,
          dateDepart: dateDepart,
          driverIsAuto: driverIsAuto,
          vehicleType: vehicleType,
          postalAddress: postalAddress,
          postalDestination: postalDestination,
        });
      },
    });
  };
  // useEffect(() => {
  //   sendNotification(newMission)

  // }, [])

  useEffect(() => {
//     socket.on('connect', () => {
//     console.log('Connected to server');
//     if (user) {
//       // socket.current = io(host);
//       // socket.emit("add-user", user.id);
//     }

// });


socket.on('error', (error) => {
    console.error('Socket error:', error);
});


    socket.on("message recieved", (newMessage) => {
      // alert("gggg")
      console.log("before",newMessage)
      console.log("test",(newMessage?.status == "Accepted" ) && (newMessage?.mission?.mission?.driver ==currentUser2?.user?.id ||newMessage?.mission?.mission?.driverIsAuto  ))
      if((newMessage?.status == "Accepted" ) && (newMessage?.mission?.mission?.driver ==currentUser2?.user?.id ||newMessage?.mission?.mission?.driverIsAuto  )){

        setnoti(
          [...noti, newMessage]
        )
        setnewMission(true)
        console.log("++++++++++++++++++",newMessage?.mission)

        sendNotification(newMessage?.mission)
        // handleNotyfy(newMessage?);
// if(newMessage?.partner?._id ==user?.id ){
      console.log("New message received",newMessage);
//   setnoti(
//     [...noti, newMessage]
//   )

//   handleNotyfy(newMessage);
}

    });
  }, [socket]);



  // -------------------------------------------------------------
  const changestatus = useCallback((value) => {
    // if (!user?.driverIsVerified) {
    //   ToastAndroid.showWithGravity(
    //     'You are not verified yet',
    //     ToastAndroid.LONG,
    //     ToastAndroid.CENTER
    //   );
    //   setIsEnabled(false);
    //   navigation.navigate('OnlineRegistrationPage');
    //   return;
    // }

    setIsEnabled(value);

    dispatch(
      ChangeStatus({
        onligne: !isEnabled,
      })
    );
  }, [dispatch, isEnabled, navigation, user?.driverIsVerified]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  // const navigation = useNavigation()
  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {

    }
}, []);
const getDistanceFromLatLonInKm=()=>{
    const userLocation = [ lastMission?.mission?.mission?.address?.latitude /* user's latitude */, lastMission?.mission?.mission?.address?.longitude  /* user's longitude */];
  const destinationLocation = [
     lastMission?.mission?.mission?.destination?.latitude,
     lastMission?.mission?.mission?.destination?.longitude,
  ]
    const lat1 = lastMission?.mission?.mission?.address?.latitude;
  const lon1 = lastMission?.mission?.mission?.address?.longitude;
  const lat2 = lastMission?.mission?.mission?.destination?.latitude;
  const lon2 =  lastMission?.mission?.mission?.destination?.longitude;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
   return d
  }
  const deg2rad=(deg)=> {
    return deg * (Math.PI/180)
  }
  const distance = parseFloat(getDistanceFromLatLonInKm().toFixed(2))


  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {

        setCurrentLocation(position.coords);


        // if(isEnabled) {
          // setTimeout(() => {

          //   dispatch(AddCurrentLocation({
          //     address:{
          //       latitude: position.coords.latitude,
          //       longitude: position.coords.longitude
          //     }
          //   }, navigation))
          // }, 4000);
          socket.emit('locationUpdate', {userId:currentUser2?.user?.id,
          location:{
            latitude: position.coords.latitude,
          longitude: position.coords.longitude

          }});

        // }else{
        //   socket.emit('offline_client', currentUser2?.user?.id)

        // }
        // console.log("position", position?.coords)
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  });
  useEffect(() => {
    // console.log("redredhg")
    const fetchData = async () => {
        if (Platform.OS === 'android') {
          await requestLocationPermission();
        } else {
          getCurrentLocation();
        }
      };

      fetchData();
  }, [getCurrentLocation, requestLocationPermission]);


  const PAGE_LIMIT = 5;
  // const dispatch = useDispatch();
  const item_list = useSelector((state) => state.missions.missions.items);
  const lastMission = useSelector((state) => state?.lastMission?.lastMission);
  const isLoading = useSelector((state) => state.missions?.isLoading?.isLoading);
  const isLOad = useSelector(state=>state?.isLoading?.isLoading)
  const page = useSelector((state) => state.missions.missions.page);
  const count = useSelector((state) => state.missions.missions.count);

  useEffect(() => {
    // console.log("render2")
    dispatch(FindLastMission())

  }, [dispatch,lastMission.length  ]);
//   console.log(lastMission)

  const renderItem = useCallback(({ item }) => <ListRequest disable key={uniqueId()} data={item} />,[])

  const loadItemsStart =async  () => {


    if (page * PAGE_LIMIT >=0  && !isLoading) {
      dispatch(
        GetMissions({
          page: page,
          limit: PAGE_LIMIT,
          skip: page * PAGE_LIMIT -PAGE_LIMIT,
        }),
      );
    }
  };
  const loadItemsEnd =async  () => {


    if (page * PAGE_LIMIT < count && !isLoading) {
      dispatch(
        GetMissions({
          page: page,
          limit: PAGE_LIMIT,
          skip: page * PAGE_LIMIT,
        }),
      );
    }
  };

  const enRouteAction = ()=> {
    // setenRoute(!enRoute)

    if(enRoute){
      setenRoute(false)
      dispatch(
        {
          type: SET_EN_ROUTE,
          payload:  false
          ,
        }
      )
      socket.emit('enRoute', {userId:currentUser2?.user?.id,
        enRoute:false
      })
      ToastAndroid
      .showWithGravityAndOffset(
        'en route mode is off',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
        )
    }else {

      sheetRef
      .current.open()
    }

      }


      const truncateText = (text, maxLength) => {
        return text?.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
      };
      const [refreshing, setRefreshing] = React.useState(false);
  const renderLoader = () => {
    return page * PAGE_LIMIT < count ? (

      <View
        style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // marginButtom: 30,
        }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };
  const keyExtractor = useCallback((item, i)=> `${i}-${item._id}`,[]);
  const getItemLayout = (data, index) => (
    {length: PAGE_LIMIT, offset: PAGE_LIMIT * index, index}
)
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
    dispatch(FindLastMission())
  }, []);

  return (


      <ImageBackground

    source={
        require('../../../assets/images1/pattern-randomized.png')
    }
    style={{
      flex: 1,
    //   backgroundColor: '#DED5D5', // Fallback color in case the image fails to load
    }}
    resizeMode="cover"
  >
  <ScrollView
  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>





      <GestureHandlerRootView>
      <KeyboardAwareScrollView>
{
    lastMission  && (lastMission?.mission?.status =='Affectée'|| lastMission?.mission?.status =='En retard' || lastMission?.mission?.status =='Démarrée' || lastMission?.mission?.status =='Confirmée')  &&

<>


    <Text
        style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'left',
            marginTop: 10,
            marginBottom: 10,
            marginLeft:10
        }}
    >
        Dernière mission publiée
    </Text>
     <Pressable style={styles.taskContainer}
     onPress={
        () => {
          // setselectedItem(item);
          // sheetRef.current.open();
          navigation.navigate("missionDetails",{
            demandeId:lastMission?.mission?.mission?._id,
            distance:distance,
            address:lastMission?.mission?.mission?.address,
            destination:lastMission?.mission?.mission?.destination,
            comments:lastMission?.mission?.mission?.comments,
            offer:lastMission?.mission?.mission?.offer,
            status:lastMission?.mission?.mission?.status,
            postalAddress:lastMission?.mission?.mission?.postalAddress,
            postalDestination:lastMission?.mission?.mission?.postalDestination,
            postalCode:lastMission?.mission?.mission?.postalCode,
            postalDestinationCode:lastMission?.mission?.mission?.postalDestinationCode,
            missionType: lastMission?.mission?.mission?.missionType,
            dateDepart : lastMission?.mission?.mission?.dateDepart,
            remunerationAmount: lastMission?.mission?.remunerationAmount,
            devisId: lastMission?.mission?._id
            // dateArrivee : lastMission?.mission?.mission?.dateArrivee,

          })
        }
     }
     >
     <View
             style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',  // Align items to the right
        alignItems: 'flex-end',
        // marginBottom: 16,
        // paddingRight: 16,  // Add some padding to the right if needed
    }}
     >
     {
        lastMission?.mission?.status=='Démarrée' ?
        <BTNPaper
            style={{
                marginRight:-10
            }}
            loading={isLOad} mode="contained" onPress={() =>{
            dispatch(TermineeMission(
                lastMission?.mission?._id

            ))
            dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
    dispatch(FindLastMission())
            }
            }>
    Terminée
  </BTNPaper>:
  <BTNPaper
            style={{
                marginRight:-10
            }}
            loading={isLOad} mode="contained" onPress={() =>{
            dispatch(AccepteMission(
                lastMission?.mission?._id

            ))
            dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
    dispatch(FindLastMission())
            }
            }>
    Confirmée
  </BTNPaper>

     }

     </View>
          <View style={styles.tags2}>
            {/* Your tags view code */}

            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{ uri:'https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'
            //   item?.avatar
              }}
            />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginLeft: 5,
                }}>


            <Text style={styles.text}>Mission N°:
           {/* {item?.user?.email} */}
           </Text>
          <Text  style={styles.text}>Départ:
          {truncateText(lastMission?.mission?.mission?.postalAddress, 40)}

           {/* {item?.user?.email} */}
           </Text>
          <Text  style={styles.text}>
          Arrivée: {truncateText(lastMission?.mission?.mission?.postalDestination, 40)}
          </Text>
            </View>

          </View>

          {/* } */}
          {/* <Text style={styles.text}>{item?.profile?.bio?  `About User: ${item?.profile?.bio}`: "" }</Text> */}
          <View style={styles.tags}>


          <View style={styles.stats}>
            <View>
              <Text style={styles.date}>
              <Icon
    source="clock-outline"
    color={MD3Colors.secondary40}
    size={20}
  /> {new Date(lastMission?.mission?.mission?.dateDepart).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
              {/* {formattedDate} */}
              </Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View>
              <Text style={styles.date}>
              <Icon
    source="calendar-outline"
    color={MD3Colors.secondary40}
    size={20}
  /> {new Date(lastMission?.mission?.mission?.dateDepart).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })}
              {/* {formattedDate} */}
              </Text>
            </View>
          </View>
          </View>
          {/* <View style={styles.stats}> */}
            <View

             style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',  // Align items to the right
        alignItems: 'flex-end',
        // marginBottom: 16,
        // paddingRight: 16,  // Add some padding to the right if needed
    }}

            >
              <Text style={styles.date}>
              {Number(lastMission?.mission?.remunerationAmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}
              {/* {formattedDate} */}
              </Text>
            </View>
          {/* </View> */}


            {/* <View style={styles.showMoreContainer}>
              <Text style={styles.showMoreText}>Click To Report User</Text>
            </View> */}

        </Pressable>
</>
}

      <View  style={{
          position: 'absolute',
          bottom:16,
          right: 16,
          // backgroundColor: '#007BFF', // Customize the background color as needed
          padding: 10,
          borderRadius: 5,
          zIndex:9999
        }}>
      <BTNPaper
      icon={`${!enRoute? 'map':''}`} mode="contained" onPress={() =>{
        enRouteAction()

      }}>
{
  enRoute &&
 <> looking for en route request
 <Icon
    source="close"
    color={MD3Colors.error50}
    size={20}
  /></>
}

    {/* Press me */}
  </BTNPaper>
      </View>
<View>

      <Text
        style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'left',
            marginTop: 10,
            marginBottom: 10,
            marginLeft:10
        }}>
        Mes Services
      </Text>
        <View style={styles.taskContainer}>
        <View
                style={{
                    margin:10
                }}
        >


        <BTNPaper
        // buttonColor={
        //     "#fff"
        // }
        icon="currency-eur" mode="outlined" onPress={() => console.log('Pressed')}>
        Mes Rénumérations
  </BTNPaper>
  </View>
  <View
                style={{
                    margin:10
                }}
        >
  <BTNPaper
        // buttonColor={
        //     "#fff"
        // }
        icon="home-account" mode="outlined" onPress={() => console.log('Pressed')}>
        Mon Profil
  </BTNPaper>
  </View>
  <View
                style={{
                    margin:10
                }}
        >
  <BTNPaper
        // buttonColor={
        //     "#fff"
        // }
        icon="file-document" mode="outlined" onPress={() => console.log('Pressed')}>
        Mes Documents
  </BTNPaper>
  </View>


</View>

</View>


      <BottomSheet
  ref={sheetRef}
  height={Dimensions.get('screen').height * 0.3}
  closeOnDragDown={true}
  closeOnPressMask={true}
  closeOnPressBack={true}
>
  <View style={styles.contentView}>
    {/* Title at the top center */}
    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
      En Route Requests
    </Text>

    <View style={styles.buttonsContainer}>
      <Button
        title={'Go'}
        buttonStyle={{
          backgroundColor: '#9882ED',
          // color:"#253545"
        }}
        titleStyle={{
          color: '#253545',
          fontSize: 20,
        }}
        containerStyle={{
          width: Dimensions.get('screen').width * 0.9,
          marginHorizontal: 50,
          marginVertical: 10,
          borderRadius: 10,
        }}
        onPress={() =>
         {
          setenRoute(true)
          socket.emit('enRoute', {userId:currentUser2?.user?.id,
        enRoute:true
      }


      )
      ToastAndroid
      .showWithGravityAndOffset(
        'en route mode is on',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
        )
          sheetRef.current.close()
          dispatch(
        {
          type: SET_EN_ROUTE,
          payload:  true
          ,
        }
      )

          }
        }
      />
    </View>
  </View>
</BottomSheet>
<Text
        style={{

            marginBottom: 10,

        }}

>

</Text>
</KeyboardAwareScrollView>
    </GestureHandlerRootView>
    </ScrollView>
    </ImageBackground>
  );
};

export default Home;
const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    height: 500,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    backgroundColor: 'white',
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tags2: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tags3: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding:10,
    marginRight:10
  },
  text: {
    marginBottom: 6,
    color:"#7c8483"
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    color:"#7c8483"
  },
});