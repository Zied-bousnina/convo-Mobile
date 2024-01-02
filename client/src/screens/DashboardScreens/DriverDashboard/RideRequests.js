/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable,FlatList, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {AddCurrentLocation, ChangeStatus, getUsersById} from '../../../redux/actions/userActions';
import SwitchToggle from 'react-native-switch-toggle';
import {useNavigation} from '@react-navigation/native';
import {GetMissions} from '../../../redux/actions/demandesActions';
import ListRequest from '../Components/ListRequest';
import {Button, ButtonGroup, withTheme, Text} from '@rneui/themed';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
const RideRequests = () => {

  const user = useSelector(({ currentUser }) => currentUser?.user);

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
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {

    }
  };

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {

        setCurrentLocation(position.coords);

        dispatch(AddCurrentLocation({
          address:{
            latitude: position.coords.latitude,
          longitude: position.coords.longitude
          }
        }, navigation))
        if(isEnabled) {
          socket.emit('locationUpdate', {userId:currentUser2?.user?.id,
          location:{
            latitude: position.coords.latitude,
          longitude: position.coords.longitude

          }});

        }else{
          socket.emit('offline_client', currentUser2?.user?.id)

        }
        // console.log("position", position?.coords)
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );


  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, [getCurrentLocation, requestLocationPermission]);


  const PAGE_LIMIT = 5;
  // const dispatch = useDispatch();
  const item_list = useSelector((state) => state.missions.missions.items);
  const isLoading = useSelector((state) => state.missions.isLoading);
  const page = useSelector((state) => state.missions.missions.page);
  const count = useSelector((state) => state.missions.missions.count);


  useEffect(() => {
    console.log("render2")
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
  const sendNotification = (mission) => {
    PushNotification.localNotification({
      channelId: "channel-id", // (required)
      // channelName: "My channel", // (required)
      title: "New Mission",
      message: `A new mission is in progress\nDistance: ${parseInt(item_list[item_list?.length-1]?.distance)}KM \nDate Depart: ${item_list[item_list?.length-1]?.dateDepart ? item_list[item_list?.length-1]?.dateDepart.toString() : ''}\nDriver Auto: ${item_list[item_list?.length-1]?.driverIsAuto ? 'Yes' : 'No'}`,
      playSound: true, // (optional) default: true
      soundName: "default",
      vibrate: true,
      allowWhileIdle: true
    });
  };
  sendNotification()

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
  return (
    <>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop:10,

        }}>
        <SwitchToggle
          size={60}
          value={isEnabled && false}
          onChange={value => {

            changestatus(value);
          }}
          switchOn={true}
          // onPress={() => Off(!on)}
          circleColorOff="#d23a35"
          circleColorOn="#6ab04c"
          backgroundColorOn="#ffffff"
          backgroundColorOff="#ffffff"
          containerStyle={{
            marginTop: 16,

            width: 200,
            height: 48,
            borderRadius: 25,
            padding: 5,
            shadowOffset: {width: -1, height: -1},
            shadowColor: '#ffffff',
            shadowOpacity: 0.3,
            shadowRadius: 20,
            borderWidth: 1,
            borderColor: !isEnabled ? '#d23a35' : '#6ab04c',
          }}
          backTextRight={'Online'}
          textRightStyle={{
            fontSize: 16,
            color: 'black',

            paddingLeft: 20,
          }}
          // backTextLeft={
          //   'Offline'
          // }
          circleStyle={{
            width: 100,
            height: 40,
            borderRadius: 20,
          }}
          // renderInsideCircle={() => (
          //   <CustomComponent
          //     someParam={someValue}
          //   />
          // )}
          renderActiveText={false}
          renderInActiveText={false}
          switchOn={isEnabled}
          onPress={() => {
            changestatus(!isEnabled);
          }}
          circleColorOff={'#d23a35'}
          circleColorOn={'#6ab04c'}
          backgroundColorOn={'#ffffff'}
          backgroundColorOff={'#ffffff'}
          inactiveThumbColor={'#d23a35'}
          // inactiveThumbColor={'#6ab04c'}
          activeThumbColor={'#6ab04c'}
          activeTrackColor={'#ffffff'}
          inactiveTrackColor={'#ffffff'}
          renderInactiveThumbIcon={() => (
            <Text style={{fontSize: 14, color: 'black'}}>Offline</Text>
          )}
          renderActiveThumbIcon={() => (
            <Text style={{fontSize: 14, color: 'black'}}>Online</Text>
          )}
          renderOffIndicator={() => (
            <Text style={{fontSize: 12, color: 'black'}}></Text>
          )}
          renderOnIndicator={() => (
            <Text style={{fontSize: 12, color: 'white'}}></Text>
          )}
        />
      </View>
      {item_list?.length !=0 ? (
        <>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#999'}}>
              You have {count} mission
            </Text>
          </View>
          {/* <ScrollView> */}
            {item_list &&isEnabled ?

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
        data={item_list}
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
          async () => await loadItemsStart()
        }
        refreshing={
          isLoading
        }
        // inverted

      />


      /* <FlatList
           data={item_list}
           inverted
    renderItem={renderItem}
    keyExtractor={()=>uniqueId()}
    onStartReached={async()=>{

       loadItemsStart() */
    // }} // required, should return a promise
    // onEndReached={async()=>{


    //     loadItemsEnd()
    // }

    // } // required, should return a promise
    // showDefaultLoadingIndicators={true} // optional
    // onStartReachedThreshold={10} // optional
    // onEndReachedThreshold={10} // optional
    // activityIndicatorColor={'black'} // optional
    // HeaderLoadingIndicator={() => { /** Your loading indicator */ }} // optional
    // FooterLoadingIndicator={() => { /** Your loading indicator */ }} // optional
    // enableAutoscrollToTop={false} // optional | default - false
    // You can use any other prop on react-native's FlatList
/* /> */


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
            Searching for Missions...
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
            Searching for Missions...
          </Text>
        </View>
      )}
      <BottomSheet
        ref={sheetRef}
        height={Dimensions.get('screen').height * 0.48}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}

        >
        <View style={styles.contentView}>
          <View style={styles.buttonsContainer}>
            <Button
              title={'Ride details'}
              buttonStyle={{
                backgroundColor: '#a4ea2d',
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
                navigation.navigate('RideDetails', {data: selectedItem})
              }
            />
            <Button
              title={'Repeat request'}
              buttonStyle={{
                backgroundColor: '#a4ea2d',
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
            />
            <Button
              title={'Return route'}
              buttonStyle={{
                backgroundColor: '#a4ea2d',
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
            />
            <Button
              title={'Delete'}
              buttonStyle={{
                backgroundColor: '#f5f4f4',
                // color:"#253545"
              }}
              titleStyle={{
                color: '#c34949',
                fontSize: 20,
              }}
              containerStyle={{
                width: Dimensions.get('screen').width * 0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius: 10,
              }}
              // onPress={actionDelete}
            />
            <Button
              title={'close'}
              buttonStyle={{
                backgroundColor: '#f5f4f4',
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
              onPress={() => {
                sheetRef.current.close();
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default RideRequests;
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
});