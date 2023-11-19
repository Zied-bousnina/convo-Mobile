/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator, ToastAndroid, Pressable} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Switch from 'react-native-switch-toggles';
import {useDispatch, useSelector} from 'react-redux';
import {ChangeStatus, getUsersById} from '../../../redux/actions/userActions';
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


const RideRequests = () => {
  const [on, Off] = useState(false);
  const user = useSelector(({ currentUser }) => currentUser?.user);
  const missions = useSelector(({ missions }) => missions?.missions);
  const [isEnabled, setIsEnabled] = useState(!!user?.driverIsVerified);
  const [selectedItem, setselectedItem] = useState({});
  const [cuuerentLength, setcuuerentLength] = useState(missions?.length)
  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sendNotification = (mission) => {
    // console.log("New Mission:", mission);

    PushNotification.localNotification({
      channelId: "channel-id", // (required)
      // channelName: "My channel", // (required)
      title: "New Mission",
      message: `A new mission is in progress\nDistance: ${parseInt(missions[missions?.length-1]?.distance)}KM \nDate Depart: ${missions[missions?.length-1]?.dateDepart ? missions[missions?.length-1]?.dateDepart.toString() : ''}\nDriver Auto: ${missions[missions?.length-1]?.driverIsAuto ? 'Yes' : 'No'}`,
      allowWhileIdle: false,
      // channelDescription: "A channel to categorize your notifications", // (optional) default: undefined.
      // playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });
  };
  useEffect(() => {
    if(
      missions?.length != cuuerentLength
    ){
      setcuuerentLength(missions?.length)
      sendNotification()
    }
    },[missions, cuuerentLength])




  const enable = useCallback(() => {
    if (user?.onligne) {
      setIsEnabled(true);
    }
  }, [user?.onligne]);


  useEffect(() => {
    dispatch(getUsersById());
    dispatch(GetMissions());
    enable();
    // sendNotification()
  }, [dispatch, missions, user, enable]);

  const changestatus = useCallback((value) => {
    if (!user?.driverIsVerified) {
      ToastAndroid.showWithGravity(
        'You are not verified yet',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setIsEnabled(false);
      navigation.navigate('OnlineRegistrationPage');
      return;
    }

    setIsEnabled(value);

    dispatch(
      ChangeStatus({
        onligne: !isEnabled,
      })
    );
  }, [dispatch, isEnabled, navigation, user?.driverIsVerified]);
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
            console.log(value);
            changestatus(value);
          }}
          switchOn={true}
          onPress={() => Off(!on)}
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
      {missions?.length !=0 ? (
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
              You have {missions?.length} missions
            </Text>
          </View>
          <ScrollView>
            {missions ?
              missions?.map((e, index) => (
                <Pressable
                  onPress={() => {
                    sheetRef.current.open();
                    console.log(e);
                    setselectedItem(e);
                  }}
                  key={index}>
                  <ListRequest key={index} data={e} />
                </Pressable>
              )):(
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
          </ScrollView>
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
