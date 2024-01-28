/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable,FlatList, PermissionsAndroid, Platform, ImageBackground} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {AddCurrentLocation, ChangeStatus, getUsersById} from '../../../redux/actions/userActions';
import SwitchToggle from 'react-native-switch-toggle';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AccepteMission, ConfirmeeMissionByDriver, FindLastMission, GetMissions, TermineeMission} from '../../../redux/actions/demandesActions';
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
import { Avatar, Button as BTN, Card, Dialog, Divider, Icon, IconButton, MD3Colors, Modal, Portal } from 'react-native-paper';
import { SET_EN_ROUTE, SET_LAST_MISSION } from '../../../redux/types';
import { Image } from 'react-native-elements';
import { Button as BTNPaper } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackSvg from '../../../components/svg/BackSvg';
import { launchCamera } from 'react-native-image-picker';
const MissionDetails2 = ({route}) => {

    const {
        demandeId,
        distance,
        address,
        destination,
        comments,
        offer,
        state,
        postalAddress,
        postalDestination,
        postalCode,
        postalDestinationCode,
        missionType,
        dateDepart ,
        remunerationAmount,
        devisId,
        status

      } =  route.params
  const isEnRoute = useSelector(state=> state?.enRoute?.enRoute)

  const user = useSelector(({ currentUser }) => currentUser?.user);
  const [enRoute, setenRoute] = useState(isEnRoute)

  const [isEnabled, setIsEnabled] = useState(!!user?.driverIsVerified);
  const [selectedItem, setselectedItem] = useState({});

  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser2 = useSelector(state=>state?.auth)
  const isLOad = useSelector(state=>state?.isLoading?.isLoading)
  const [userConnected_id, setuserConnected_id] = useState()
  const [visibleError, setvisibleError] = useState(false)
  const [DateError, setDateError] = useState(false)
  const [Error, setError] = useState()
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
  const isDateUnderCurrentDate = (inputDate) => {
    const targetDate = new Date(inputDate);
    const currentDate = new Date();

    return targetDate < currentDate;
  };

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

});


    socket.on("message recieved", (newMessage) => {
      // alert("gggg")
     if((newMessage?.status == "Accepted" ) && (newMessage?.mission?.driver ==currentUser2?.user?.id ||newMessage?.mission?.driverIsAuto  )){

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
  }, [currentLocation?.latitude, currentLocation?.longitude]);


  const PAGE_LIMIT = 5;
  // const dispatch = useDispatch();
  const item_list = useSelector((state) => state.missions.missions.items);
  const isLoading = useSelector((state) => state.missions.isLoading);
  const page = useSelector((state) => state.missions.missions.page);
  const count = useSelector((state) => state.missions.missions.count);

  useEffect(() => {

    dispatch(
      GetMissions({
        page: 0,
        limit: PAGE_LIMIT,
        skip: 0 * PAGE_LIMIT,
      }),
    );
  }, [dispatch,count  ]);

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
  const [visible, setvisible] = useState(false)
  const setToastMsg = msg=> {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER

    )
  }
  const getItemLayout = (data, index) => (
    {length: PAGE_LIMIT, offset: PAGE_LIMIT * index, index}
)
const [image, setImage] = useState([]);
const TakePhoto = () => {
  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      mediaType: 'photo',
      includeBase64: false,
      path: 'images',
      maxHeight: 2000,
    maxWidth: 2000
      // allowsEditing: true
    },

  };
  launchCamera(options, (response) => {



    if (response.didCancel) {

      setToastMsg('User cancelled image picker');
    } else if (response.error) {

      setToastMsg('ImagePicker Error: ' + response.error);
    } else {
      const uri = response.assets[0].uri;
      const type = response.assets[0].type;
      const name = response.assets[0].fileName;
      const source = {
        uri,
        type,
        name,
      }
      setImage((prevImages) => [...prevImages, source])

    }
  });
}
const handleDeleteImage = (index) => {
  const newImageArray = [...image];
  newImageArray.splice(index, 1);
  setImage(newImageArray);
};

const savePhotosTerminéé =()=> {


  const formData = new FormData();

  image.forEach((img, index) => {
    formData.append(`avatar${index}`, {
      uri: img?.uri ? img?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
      type: 'image/jpg',
      name: new Date() + `_profile_${index}`
    });
  });

  dispatch(TermineeMission(devisId,formData, navigation))
//  dispatch(TermineeMission(
//     //             devisId

//     //         ))
  .then((data) => {

    dispatch({
          type: SET_LAST_MISSION,
          payload: [],
        });
        setvisible(false)
      dispatch(FindLastMission())


      navigation.navigate('Missions')


    dispatch({
type: SET_LAST_MISSION,
payload: [],
});
dispatch(FindLastMission())



  })
  .catch((error) => {

  });
}
useFocusEffect(
  React.useCallback(() => {


  }, [])
);
const savePhotos =()=> {

  const formData = new FormData();

  image.forEach((img, index) => {
    formData.append(`avatar${index}`, {
      uri: img?.uri ? img?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
      type: 'image/jpg',
      name: new Date() + `_profile_${index}`
    });
  });

  dispatch(AccepteMission(devisId,formData, navigation))

  .then((data) => {
    socket.emit("MissionAccepted")
    setvisible(false)
    dispatch({
          type: SET_LAST_MISSION,
          payload: [],
        });
        navigation.navigate('Missions')


    dispatch({
type: SET_LAST_MISSION,
payload: [],
});
      dispatch(FindLastMission())


  })
  .catch((error) => {
    // alert("Erreur de chargement")
    // Vous avez déjà une mission en cours !
    if(error?.response?.data?.message !="Internal Server Error") {
      setError(error?.response?.data?.message)


      setvisible(false)
      setvisibleError(true)
    }

  });
}
const renderItem2 = ({ item, index }) => (
  <View style={{ position: "relative" }}>
    <Image
      source={{ uri: item.uri }}
      style={{
        width: 150,
        height: 150,
        resizeMode: 'contain',
      }}
    />
    {/* Delete icon */}
    <BTNPaper
      icon={"delete-sweep"}
      onPress={() => handleDeleteImage(index)}
      style={{
        position: "absolute",
        top: 5,
        right: 5,
        padding: 5,
        borderRadius: 10,
      }}
    >
      {/* <Text style={{ color: "white" }}>Delete</Text> */}
    </BTNPaper>
  </View>
);
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

<View style={{ padding: 10, position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
        <Pressable onPress={() => navigation.navigate('Missions')}>
          <BackSvg width={31} height={31} />
        </Pressable>
      </View>
      <GestureHandlerRootView>
      <KeyboardAwareScrollView>


    <Text
        style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginLeft:10
        }}
    >
        Confirmation
    </Text>
     <View style={styles.taskContainer}
     onPress={
        () => {
          // setselectedItem(item);
          // sheetRef.current.open();
        //   navigation.navigate("missionDetails",{missionId : "h"})

        }
     }
     >

     <Card.Title
    title="Service"
    subtitle="Prix proposé"
    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F6FCE7",


    }}
     icon="currency-eur"
        color="#A7D32E"
      />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    right={()=><Text>{Number(remunerationAmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}


  />

  <Divider/>
  {/* Type */}
  <Card.Title
    title="Type"
    subtitle={`${missionType}`}
    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F2F0FD",



    }}
     icon="information-outline"
        color="#8B5CF6"


     />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=><Text>{Number(39).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}


  />

  {/* Départ */}
  <Divider/>
  {/* Type */}
  <Card.Title
    title="Départ"
    subtitle={`${postalAddress}`}
    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F2F0FD",



    }}
     icon="map-marker"
        color="#58E899"


     />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=><Text>{Number(39).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}


  />
  {/* Address Arrivée */}
  <Divider/>
  {/* Type */}
  <Card.Title
    title="Address Arrivée"
    subtitle={`${postalDestination}`}
    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F2F0FD",



    }}
     icon="map-marker"
        color="#E86658"


     />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=><Text>{Number(39).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12,

     }}


  />
  {/* Date et heure */}
  <Divider/>
  {/* Type */}
  <Card.Title
    title="Date et heure"
    subtitle={`${new Date(dateDepart).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) } | ${new Date(dateDepart).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })}`}
    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F2F0FD",



    }}
     icon="information-outline"
        color="#8B5CF6"


     />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=><Text>{Number(39).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}


  />
   <Divider/>
  {/* Map  */}


  <Card.Title
    title="Voir plus sur la carte"

    right={(prps)=> {
        return(
            <BTNPaper
            onPress={()=>navigation.navigate("MissionDetails",{
            demandeId,
            distance,
            address,
            destination,
            comments,
            offer,
            status,
            postalAddress,
            postalDestination,
            postalCode,
            postalDestinationCode,
            missionType,
            dateDepart,
            remunerationAmount,
            devisId
            // dateArrivee : data?.data?.mission?.dateArrivee,

          })}
            icon={"arrow-right-bold"}
            ></BTNPaper>
        )
    }}


    left={(props) => <Avatar.Icon {...props}
    style={{backgroundColor:"#F2F0FD",



    }}
     icon="map-search"
        color="#8B5CF6"


     />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    // right={()=><Text>{Number(39).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>}
    titleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:16
     }}
    subtitleStyle={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}


  />



        </View>
        <View
        style={styles.tags}
        >
        <Text
        style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginLeft:10
        }}

        >
            TOTAL
        </Text>
        <Text
         style={{
            fontSize: 24,
            fontWeight: '300',
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 10,
            marginRight:10
        }}
        >
        {Number(remunerationAmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}
        </Text>


        </View>
        {/* <BTNPaper
        onPress={()=>{}}
        style={{
            backgroundColor:"#8B5CF6",
            marginHorizontal:10,
            marginBottom:10
        }}
        mode="contained">
    <Text style={{color:"white"}}>Confirmer Mission</Text>
    </BTNPaper> */}
    {
        status=='Démarrée' ?
        <BTNPaper
             style={{
            backgroundColor:"#8B5CF6",
            marginHorizontal:10,
            marginBottom:10
        }}
        mode="contained"
            loading={isLOad}  onPress={() =>{
              setImage([])
              setvisible(true)
//             dispatch(TermineeMission(
//                 devisId,
//                 navigation

//             ))
//             setTimeout(() => {
//               navigation.navigate('Missions')

// }, 2000);


//             dispatch({
//         type: SET_LAST_MISSION,
//         payload: [],
//       });
//     dispatch(FindLastMission())
            }
            }>
    <Text style={{color:"white"}}>Terminer Mission</Text>
  </BTNPaper>:
  status=='Confirmée' ?

<BTNPaper
          style={{
              marginRight:-10,
              backgroundColor:"#27AE60"
          }}
          loading={isLOad} mode="contained"
  //          onPress={() =>{
  //         dispatch(AccepteMission(
  //             lastMission?.mission?._id

  //         ))
  //         dispatch({
  //     type: SET_LAST_MISSION,
  //     payload: [],
  //   });
  // dispatch(FindLastMission())
  //         }
  //         }
onPress={()=>{
//
setImage([])
dispatch(ConfirmeeMissionByDriver(devisId, navigation))

.then((data) => {
      socket.emit("MissionAccepted")

      dispatch({
            type: SET_LAST_MISSION,
            payload: [],

          });
        dispatch(FindLastMission())
        setvisible(false)


    })
    .catch((error) => {
      //
      if(error?.response?.data?.message !="Internal Server Error") {

        setError(error?.response?.data?.message)

        setvisible(false)
        setvisibleError(true)
        setvisible(false)
      }
      // setvisibleError(true)

    });
}}
          >
  Confirmée
</BTNPaper>:
  <BTNPaper
              style={{
            backgroundColor:"#8B5CF6",
            marginHorizontal:10,
            marginBottom:10
        }}
        mode="contained"
            loading={isLOad}  onPress={() =>{
              const result = isDateUnderCurrentDate(dateDepart)
              if(result){
                setImage([])
                setvisible(true)

              }else{
                setDateError(true)
                // setvisible(true)
              }
          //  setvisible(true)
            }
            }>
   <Text style={{color:"white"}}>Démarrer Mission</Text>
  </BTNPaper>

     }
     <Portal>
        <Modal  visible={visible}
        onDismiss={()=>  {
          setvisible(false)
        }}
        contentContainerStyle={
          {
            backgroundColor:"white",
            padding:20,
            margin:20,
            borderRadius:10
          }


        }

        >
         <IconButton
    icon="close"
    iconColor={MD3Colors.error50}
    size={20}
    onPress={() => setvisible(false)}
  />


        {/* <KeyboardAwareScrollView> */}


  <Text>

  { image?.length }/ 5
  </Text>



    <FlatList
      data={image}
      renderItem={renderItem2}
      keyExtractor={(item, index) => index.toString()}
    />
    {
      image?.length <5 &&

  <BTNPaper icon="camera" mode="contained" loading={isLOad} onPress={() => TakePhoto()}>
  prendre une photo
  </BTNPaper>
    }
  {
    image?.length >= 1 &&
    (
      status=='Démarrée' ?
  <BTNPaper icon="content-save-all" mode="outlined" loading={isLOad} onPress={() => {

    savePhotosTerminéé()

  }}>

    {/* savePhotos()}}> */}
  enregistrer
  </BTNPaper>:
  <BTNPaper loading={isLOad} icon="content-save-all" mode="outlined" onPress={() => {


    savePhotos();
  }}>

    {/* savePhotos()}}> */}
  enregistrer
  </BTNPaper>
    )
  }
  {/* </KeyboardAwareScrollView> */}

        </Modal>
      </Portal>
      <Portal>
          <Dialog visible={visibleError} onDismiss={

            ()=> {
              setvisibleError(false)
            }
          }
          style={
            {
              // backgroundColor:'#878585',
              padding:20,
              margin:20,
              borderRadius:10
              }

          }


          >
            <Dialog.Title
            // style={{
            //   color:"#000000"
            // }}
            >Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium"
              style={{
                color:"#000000"
              }}
              >{Error}</Text>
            </Dialog.Content>
            <Dialog.Actions
            // style={{
            //   // justifyContent:'center',
            //   color:"#000000"
            // }}
            >
              <BTNPaper onPress={
                ()=> {
                  setvisibleError(false)
                }
              }
              style={{
                color:"#8B5CF6"
              }}
              >Done</BTNPaper>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={DateError} onDismiss={

            ()=> {
              setDateError(false)
            }
          }
          style={
            {
              // backgroundColor:'#878585',
              padding:20,
              margin:20,
              borderRadius:10
              }

          }


          >
            <Dialog.Title
            // style={{
            //   color:"#000000"
            // }}
            >Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium"
              style={{
                color:"#000000"
              }}
              >Vous ne pouvez pas démarrer la mission avant la date de départ</Text>
            </Dialog.Content>
            <Dialog.Actions
            // style={{
            //   // justifyContent:'center',
            //   color:"#000000"
            // }}
            >
              <BTNPaper onPress={
                ()=> {
                  setDateError(false)
                }
              }
              style={{
                color:"#8B5CF6"
              }}
              >Done</BTNPaper>
            </Dialog.Actions>
          </Dialog>
        </Portal>








<Text
        style={{

            marginBottom: 10,

        }}

>

</Text>
</KeyboardAwareScrollView>
    </GestureHandlerRootView>
    </ImageBackground>
  );
};

export default MissionDetails2;
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