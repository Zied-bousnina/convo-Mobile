/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable,FlatList, PermissionsAndroid, Platform, ImageBackground, RefreshControl, Animated, TouchableOpacity, ScrollViewBase} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {AddCurrentLocation, ChangeStatus, getUsersById, updatePassword} from '../../../redux/actions/userActions';
import SwitchToggle from 'react-native-switch-toggle';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AccepteMission, AcceptedMission, FindLastMission, GetMissions, TermineeMission} from '../../../redux/actions/demandesActions';
import ListRequest from '../Components/ListRequest';
import {Button, ButtonGroup, withTheme, Text} from '@rneui/themed';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {GestureHandlerRootView, ScrollView, TextInput} from 'react-native-gesture-handler';
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
import { Button as BTN, Dialog, Icon, IconButton, MD3Colors, Modal, Portal } from 'react-native-paper';
import { ACCEPTED_MISSIONS, SET_EN_ROUTE, SET_FIRST_LOGIN, SET_LAST_MISSION, SET_REQUEST, SET_RESET_STATE } from '../../../redux/types';
import { Image } from 'react-native-elements';
import { Button as BTNPaper } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LockIcon from '../../../components/svg/LockIcon';
import ShowIcon from '../../../components/svg/ShowIcon';
import AppInput from '../../../components/Inputs/AppInput';
import CostomFormik from '../../../components/costomFormik/CostomFormik';
import * as yup from 'yup';
import { Colors } from '../../../theme';
import Fonts from '../../../assets/fonts';
import LoginButton from '../../../components/Buttons/LoginButton';
import AppLoader from '../../../components/Animations/AppLoader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const screenHeight = Dimensions.get('window').height;

const initialValues = {

  password: '',
  confirm: '',

};
const validationSchema = yup.object({


  password: yup.string().trim().min(6, 'password is too short!').required('Password is required'),
  confirm: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Home = () => {
  const isEnRoute = useSelector(state=> state?.enRoute?.enRoute)
  const [visibleError, setvisibleError] = useState(false)
  const user = useSelector(({ currentUser }) => currentUser?.user);
  const [enRoute, setenRoute] = useState(isEnRoute)
  const [Error, setError] = useState()
  const [isEnabled, setIsEnabled] = useState(!!user?.driverIsVerified);
  const [selectedItem, setselectedItem] = useState({});

  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser2 = useSelector(state=>state?.auth)
  const AnimatedLine = Animated.createAnimatedComponent(View);
  const [show, setshow] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;
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
  const [visible, setvisible] = useState(false)
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
      (created) => {}
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
socket.on("MissionAccepted",async ()=> {
  setnewMission(true)
  onRefresh()

  dispatch({
type: SET_LAST_MISSION,
payload: [],
});
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

loadItemsStart()
setnewMission(false)
  await loadItemsStart()

})


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

      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  });
  useEffect(() => {
    //
    const fetchData = async () => {
        if (Platform.OS === 'android') {
          await requestLocationPermission();
        } else {
          getCurrentLocation();
        }
      };

      fetchData();
  }, [getCurrentLocation, requestLocationPermission]);

  const showPasswordHandler = navigation => {
    setshow(!show);
    Animated.timing(lineAnimation, {
      toValue: show ? 0 : 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const PAGE_LIMIT = 5;
  // const dispatch = useDispatch();
  const item_list = useSelector((state) => state.missions.missions.items);
  const lastMission = useSelector((state) => state?.lastMission?.lastMission);
  const isLoading = useSelector((state) => state.missions?.isLoading?.isLoading);
  const isLOad = useSelector(state=>state?.isLoading?.isLoading)
  const page = useSelector((state) => state.missions.missions.page);
  const count = useSelector((state) => state.missions.missions.count);
  const userAuth = useSelector(state => state?.auth);
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  useEffect(() => {
    //
    dispatch(FindLastMission())

  }, [dispatch,lastMission.length  ]);


  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });

      dispatch(FindLastMission())
    }, [])
  );


//

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
  const handleLogin = (values, formikActions) => {

dispatch(updatePassword({
    newPassword:values?.confirm,
    confirm:values?.password
  })
)
formikActions.setSubmitting(false)

  };
  const [image, setImage] = useState([]);

  const setToastMsg = msg=> {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER

    )
  }
  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        // allowsEditing: true
      },

    };
    launchImageLibrary(options, (response) => {


      //
      if (response.didCancel) {
        //
        setToastMsg('User cancelled image picker');
      } else if (response.error) {
        //
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
        setImage(
          [...image, source]
        )
        //
      }
    });
  }
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


      //
      if (response.didCancel) {
        //

        setToastMsg('User cancelled image picker');
      } else if (response.error) {
        //

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

    dispatch(TermineeMission(lastMission?.mission?._id,formData, navigation))
//  dispatch(TermineeMission(
//     //             lastMission?.mission?._id

//     //         ))
    .then((data) => {

      dispatch({
            type: SET_LAST_MISSION,
            payload: [],
          });
        dispatch(FindLastMission())
        setvisible(false)


    })
    .catch((error) => {


    });
  }
  const savePhotos =()=> {


    const formData = new FormData();

    image.forEach((img, index) => {
      formData.append(`avatar${index}`, {
        uri: img?.uri ? img?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
        type: 'image/jpg',
        name: new Date() + `_profile_${index}`
      });
    });

    dispatch(AccepteMission(lastMission?.mission?._id,formData, navigation))

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
      setError(error?.response?.data?.message)
      console.log(error?.response?.data?.message)
      setvisible(false)
      setvisibleError(true)
      setvisible(false)
      // setvisibleError(true)

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
    <>





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
  <>

  <Portal>
        <Modal visible={userAuth?.isFirstTime}

         contentContainerStyle={
          {
            backgroundColor:"white",
            padding:20,
            margin:20,
            borderRadius:10
          }

        }>
        {isLoad? <AppLoader/> : null }
         <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Bonjour Monsieur {userAuth?.user?.name}!
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Vous devez changer votre mot de passe pour des raisons de sécurité.
        </Text>
        <CostomFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        >
        <View style={styles.container}>

          <View style={styles.formCon}>


          <View style={[styles.textBoxCon, {marginTop: 30}]}>
               <View style={styles.at}>
                 <LockIcon width={20} height={20} />
               </View>
               <View style={[styles.passCon]}>
                 <View style={styles.textCon}>
                   <AppInput
                     name="password"
                     placeholder="Password"
                     secureTextEntry={!show}
                     style={styles.textInput}
                     placeholderTextColor={'#aaa'}
                   />
                 </View>
                 <View style={styles.show}>
                   <Pressable
                    onPress={showPasswordHandler}
                   >
                     <ShowIcon width={20} height={20} />
                     <AnimatedLine
                       style={{
                         height: 2,
                         width: lineAnimation,
                         backgroundColor: 'black',
                         position: 'absolute',
                         bottom: 10,
                         left: 0,
                         transform: [{rotate: '150deg'}],
                       }}
                     />
                   </Pressable>
                 </View>
               </View>
             </View>
             <View style={[styles.textBoxCon, {marginTop: 30}]}>
               <View style={styles.at}>
                 <LockIcon width={20} height={20} />
               </View>
               <View style={[styles.passCon]}>
                 <View style={styles.textCon}>
                   <AppInput
                     name="confirm"
                     placeholder="Confirm Password"
                     secureTextEntry={!show}
                     style={styles.textInput}
                     placeholderTextColor={'#aaa'}
                   />
                 </View>
                 <View style={styles.show}>
                   <Pressable
                   onPress={showPasswordHandler}
                >
                     <ShowIcon width={20} height={20} />
                     <AnimatedLine
                       style={{
                         height: 2,
                         width: lineAnimation,
                         backgroundColor: 'black',
                         position: 'absolute',
                         bottom: 10,
                         left: 0,
                         transform: [{rotate: '150deg'}],
                       }}
                     />
                   </Pressable>
                 </View>
               </View>
             </View>

          </View>
          <View style={[styles.loginCon, {
            marginTop: 20,

          }]}>
            <LoginButton
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"Ok, Got it"}
              />

          </View>




        </View>
      </CostomFormik>



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
              backgroundColor:'#878585',
              padding:20,
              margin:20,
              borderRadius:10
              }

          }


          >
            <Dialog.Title
            style={{
              color:"#000000"
            }}
            >Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{Error}</Text>
            </Dialog.Content>
            <Dialog.Actions
            style={{
              // justifyContent:'center',
              color:"#000000"
            }}
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

  <ScrollView
  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>





      <GestureHandlerRootView>
      <KeyboardAwareScrollView>
      {
  newMission  &&

      <View style={{
  position: 'absolute',
  top: 20, // Set top to 0 to align with the top of the screen
  left: 0, // Align with the left of the screen
  right: 0, // Align with the right of the screen
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  paddingTop: 5, // Add padding to create space from the top
  // backgroundColor: '#007BFF', // Customize the background color as needed
  padding: 10,
  borderRadius: 5,
  zIndex: 9999
}}>
      <BTN
      icon={``} mode="contained" onPress={async() =>{
        onRefresh()

            dispatch({
        type: SET_LAST_MISSION,
        payload: [],
      });
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

        loadItemsStart()
        setnewMission(false)
            await loadItemsStart()


      }}>

 <> nouvelle mission
 <Icon
    source="arrow-up"
    color={MD3Colors.error50}
    size={20}
  />
  </>


    {/* Press me */}
  </BTN>
      </View>
      }
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
     style={styles.tags}
     >
     <BTNPaper
     mode='text'
    //  disabled
textColor={
  (lastMission?.mission?.status === "En retard") ? "#E74C3C" : // Alizarin Red
  (lastMission?.mission?.status === "Confirmée") ? "#2ECC71" : // Emerald Green
  (lastMission?.mission?.status === "Affectée") ? "#FFA500" : // Orange
  (lastMission?.mission?.status === "Démarrée") ? "#3498DB" : // Dodger Blue
  (lastMission?.mission?.status === "Terminée") ? "#27AE60" : // Nephritis Green
  '#009688' // Teal
}



      >
      Statut :{lastMission?.mission?.status}
     </BTNPaper>


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
              setvisible(true)
    //         dispatch(TermineeMission(
    //             lastMission?.mission?._id

    //         ))
    //         dispatch({
    //     type: SET_LAST_MISSION,
    //     payload: [],
    //   });
    // dispatch(FindLastMission())
            }
            }>
    Terminée
  </BTNPaper>:
  <BTNPaper
            style={{
                marginRight:-10
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
  setvisible(true)
}}
            >
    Démarée
  </BTNPaper>

     }

     </View>
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
        icon="currency-eur" mode="outlined" onPress={() => {
          navigation.navigate("recents")
        }}>
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
        icon="home-account" mode="outlined" onPress={() => {}}>
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
        icon="file-document" mode="outlined" onPress={() => {}}>
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
      lastMission?.mission?.status=='Démarrée' ?
  <BTNPaper icon="content-save-all" mode="outlined" loading={isLOad} onPress={() => {

    savePhotosTerminéé()

  }}>

    {/* savePhotos()}}> */}
  enregistrer t
  </BTNPaper>:
  <BTNPaper icon="content-save-all" mode="outlined" loading={isLOad} onPress={() => {


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
</KeyboardAwareScrollView>
    </GestureHandlerRootView>
    </ScrollView>
    </>
    </ImageBackground>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  mainCon: {
    // backgroundColor: theme.colors.black,
    backgroundColor: Colors["light"]?.backgroundColor,
// backgroundColor: process.env.ICON_COLOR,
    flex: 1,
    height:screenHeight*1.5

  },
  loginIcon: {
    alignSelf: 'center',
    top:-70,
    left:-30
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: Colors["light"]?.black,
    fontSize: 32,
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
    borderBottomColor: Colors["light"]?.gray,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: Colors["light"]?.black,
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  dontHaveAccountLbl: {
    marginTop: 10, // Adjust this value for proper spacing
    color:"#26cbfc" , // You can choose the color you want
    textDecorationLine: 'underline', // Underline the text to make it look like a link
  },
  registerCon: {flexDirection: 'row',
  padding:15,
   justifyContent: 'center', paddingTop: 10},
  registerLbl: {color: Colors["light"]?.primary, fontFamily: Fonts.type.NotoSansSemiBold},
  registerNew: {
    color: Colors["light"]?.gray,
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color:"#26cbfc" ,
    textAlign: 'right',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  LoginBtn: {
    backgroundColor: "#2df793",
    borderRadius: 20,
    shadowColor: Colors["light"]?.black,
    borderColor: 'transparent',
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: Colors["light"]?.white,
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: Colors["light"]?.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: Colors["light"]?.gray,
    textAlign: 'center',
    backgroundColor: Colors["light"]?.backgroundColor,
    width: 60,
    alignSelf: 'center',
    fontFamily: Fonts.type.NotoSansSemiBold,
    position: 'relative',
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: 'row',
    backgroundColor: Colors["light"]?.gray2,
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: Colors["light"]?.black,
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: Fonts.type.NotoSansBlack,
  },
  googleIcon: {
    alignSelf: 'center',
  },
  googleLblCon: {
    alignSelf: 'center',

  },
  error: {
    color: 'red',
    fontFamily: Fonts.type.NotoSansSemiBold,
    fontSize: 12,
  },


  blockMenu: {
    // flexDirection: 'column',
// justifyContent: 'center',
// alignItems: 'center',
// marginTop: 50,
// paddingVertical:40,
height:screenHeight,
padding: 20,
backgroundColor: Colors["light"]?.backgroundColor,

borderRadius: 10,
shadowColor: Colors["light"]?.black,
shadowOffset: { width: 6, height: 6 },
shadowOpacity: 0.1,
shadowRadius: 11,
elevation: 2,
},
blockMenuTitle: {

fontSize: 22,
fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
color: '#022D26',
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
  backgroundColor: Colors["light"]?.white,
  // backgroundColor: ,
borderRadius: 10,
borderWidth: 1.5,
borderColor: "#357762",
paddingVertical: 0.25,
paddingHorizontal: 1.5,
fontSize: 20,
fontFamily: 'Aller-Bold, Aller-Regular, Helvetica, Arial, sans-serif',
color: "#022d26",
textAlign: 'center',
// transitionDuration: 250,
// transitionTimingFunction: 'ease',
},

card: {
padding: 20,
marginVertical: 50,
backgroundColor: Colors["light"]?.white,
borderRadius: 10,
shadowColor: Colors["light"]?.black,
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
color: Colors["light"]?.black,
marginBottom: 10,

},
cardHeaderBold: {
fontFamily: 'Aller-Bold',
},
cardTitle: {
fontSize: 22,
fontFamily: 'Aller-Bold',
color: Colors["light"]?.primary,
marginBottom: 10,
},
cardLocation: {
fontSize: 16,
fontFamily: 'Aller-Regular',
color: Colors["light"]?.gray,
marginBottom: 10,
},
cardButton: {
backgroundColor: Colors["light"]?.primary,
borderRadius: 10,
paddingVertical: 10,
paddingHorizontal: 20,
},
cardButtonText: {
color: Colors["light"]?.white,
fontSize: 16,
fontFamily: 'Aller-Bold',
textAlign: 'center',
},
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
