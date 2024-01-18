/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable,FlatList, PermissionsAndroid, Platform, ImageBackground, TextInput} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {AddCurrentLocation, ChangeStatus, GenerateFacture, getUsersById} from '../../../redux/actions/userActions';
import SwitchToggle from 'react-native-switch-toggle';
import {useNavigation} from '@react-navigation/native';
import {AcceptedMission, FindLastMission, Findfactures, GetMissions} from '../../../redux/actions/demandesActions';
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
import { Button as BTN, FAB, Icon, MD3Colors, Modal, Portal, SegmentedButtons } from 'react-native-paper';
import { ACCEPTED_MISSIONS, SET_EN_ROUTE, SET_FACTURES, SET_LAST_MISSION, SET_REQUEST, SET_RESET_STATE } from '../../../redux/types';
import { Image } from 'react-native-elements';
import { Button as BTNPaper } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListRequest2 from '../Components/ListRequest2';
import ListFactures from '../Components/ListFactures';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const MyIncome = () => {
  const isEnRoute = useSelector(state=> state?.enRoute?.enRoute)
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,
  margin:20,
};
  const user = useSelector(({ currentUser }) => currentUser?.user);
  const [enRoute, setenRoute] = useState(isEnRoute)

  const [isEnabled, setIsEnabled] = useState(!!user?.driverIsVerified);
  const [selectedItem, setselectedItem] = useState({});
  const [dateDE, setDateDE] = useState(new Date())
  const [dateA, setDateA] = useState(new Date())
  const [openDE, setOpenDE] = useState(false)
  const [openA, setOpenA] = useState(false)
  const isLOad = useSelector(state=>state?.isLoading?.isLoading)
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
//

//     if (user) {
//       // socket.current = io(host);
//       // socket.emit("add-user", user.id);
//     }

// });


socket.on('error', (error) => {
    console.error('Socket error:', error);
});



socket.on("message received", (newMessage) => {

  // alert("gggg")
 if((newMessage?.status == "Confirmée" || newMessage?.status == "En retard" ) && (newMessage?.mission?.driver ==currentUser2?.user?.id ||newMessage?.mission?.driverIsAuto  )){

    setnoti(
      [...noti, newMessage]
    )
    setnewMission(true)


    sendNotification(newMessage?.mission)
    // handleNotyfy(newMessage?);
// if(newMessage?.partner?._id ==user?.id ){

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

      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  });
  useEffect(() => {

    const fetchData = async () => {
        if (Platform.OS === 'android') {
          await requestLocationPermission();
        } else {
          getCurrentLocation();
        }
      };

      fetchData();
  }, [getCurrentLocation, requestLocationPermission]);


  const [value, setValue] = React.useState('enCours');
  const missionTerminee = useSelector((state) => state?.AcceptedMissions?.mission?.missions);
  const factures = useSelector((state) => state?.factures?.factures);
  useEffect(() => {

    dispatch(
      Findfactures(),
    );
  }, [dispatch,factures?.length ]);


  const PAGE_LIMIT = 5;
  // const dispatch = useDispatch();
  const item_list = useSelector((state) => state.missions.missions.items);
  const isLoading = useSelector((state) => state.missions.isLoading);
  const page = useSelector((state) => state.missions.missions.page);
  const count = useSelector((state) => state.missions.missions.count);



  const renderItem = useCallback(({ item }) => <ListFactures disable key={uniqueId()} data={item} />,[])


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
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
      };
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
// const fabStyle = { [animateFrom]: 16 };
const getDateDE = () => {
  let tempDate = dateDE.toString().split(' ');
  return dateDE !== ''
    ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
    : '';
};
const getDateA = () => {
  let tempDate = dateA.toString().split(' ');
  return dateA !== ''
    ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
    : '';
};

const generereFacture = ()=> {
  dispatch({
    type: SET_FACTURES,
    payload: [],
  });
  dispatch(
    GenerateFacture({
      from: moment(dateDE).format("YYYY-MM-DD"),
      to: moment(dateA).format("YYYY-MM-DD")
    }),
  )    .then((data)=> {

    if(data?.data?.success){
      ToastAndroid
      .showWithGravityAndOffset(
        'Facture generée avec success',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
        )
    }
    hideModal()

  })
  .catch((err)=> {
    ToastAndroid
    .showWithGravityAndOffset(
      'Erreur lors de la generation de la facture',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
      )
  })
  hideModal()
  // hideModal()
}

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






<Text
 style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'left',
            marginTop: 10,
            marginBottom: 10,
            marginLeft:10
        }}
>Mes Factures</Text>





      {item_list?.length !=0  ? (
        <>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>

          </View>
          {/* <ScrollView> */}



            {factures   ?

              <FlashList
              showsVerticalScrollIndicator={true}
              SkeletonPlaceholder={
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width}
                    height={500}
                    borderRadius={10}
                    marginBottom={10}

                  />

                </SkeletonPlaceholder>

              }
        data={factures}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderLoader}
        onEndReached={async () => await loadItemsEnd()}
        getItemLayout={getItemLayout}
        onEndReachedThreshold={0}
        // style={{ marginBottom: 50 }}
        contentContainerStyle={{

          // marginBottom: 50
        }}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        // windowSize={5}
        initialNumToRender={5}
        estimatedItemSize={
          500
        }
        onRefresh={

          async () => {
            dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
      dispatch({
        type: SET_FACTURES,
        payload: [],
      });

      dispatch(Findfactures())
    dispatch(FindLastMission())
    dispatch({
        type: ACCEPTED_MISSIONS,
        payload: [],

    })
    dispatch({
        type: SET_REQUEST,
        payload: [],
      });
    loadItemsStart()
    dispatch(AcceptedMission())
    dispatch({
  type: SET_RESET_STATE
});

            await loadItemsStart()}
        }
        refreshing={
          isLoading
        }
        // inverted

      />













              :(
                <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              color: '#999',
            }}>
            Searching ...
          </Text>
        </View>
              )}
          {/* </ScrollView> */}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              color: '#999',
            }}>
            Searching ...
          </Text>
        </View>
      )}


<Text
        style={{

            marginBottom: 10,

        }}

>

</Text>
<Portal>
  <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    <View>
      <Text>Genere nouvelle facture</Text>

      {/* Date Inputs */}
      <View>
        <Text>Date de</Text>

        <TextInput
          placeholder="Start Date"
          onFocus={() => setOpenDE(true)}
          dataDetectorTypes={
            "calendarEvent"
          }

          style={styles.textInput}


           value={
            getDateDE()
          }
          type="date"
          // Add necessary props and styles for your input
        />
        <DatePicker
        modal
        open={openDE}
        date={dateDE}
        onConfirm={(date) => {
          setOpenDE(false)
          setDateDE(date)
        }}
        onCancel={() => {
          setOpenDE(false)
        }}
      />
      <DatePicker
        modal
        open={openA}
        date={dateA}
        onConfirm={(date) => {
          setOpenA(false)
          setDateA(date)
        }}
        onCancel={() => {
          setOpenA(false)
        }}
      />
      </View>

      <View>
        <Text>à</Text>
        <TextInput
          placeholder="End Date"
          style={styles.textInput}
          onFocus={() => setOpenA(true)}
          value={
            getDateA()
          }
          // Add necessary props and styles for your input
        />
      </View>

      {/* "Generer" Button */}
      <BTNPaper
      isLoading={isLOad}
      mode='contained'
       onPress={()=>{
        generereFacture()
       }}  >
      Generer
      </BTNPaper>

      {/* Example Modal Text */}
      <Text>Click outside this area to dismiss.</Text>
    </View>
  </Modal>
</Portal>



<FAB
    icon="plus"
    style={styles.fab}
    onPress={() => showModal()}
  />

    </ImageBackground>
  );
};

export default MyIncome;
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,

  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    padding: 10,
    color:"black"
  },
});