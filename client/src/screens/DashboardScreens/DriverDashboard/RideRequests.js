import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native'
import React ,{useEffect, useState}from 'react'
import Switch from 'react-native-switch-toggles';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeStatus, getUsersById } from '../../../redux/actions/userActions';
import SwitchToggle from "react-native-switch-toggle";
import { useNavigation } from '@react-navigation/native';
const RideRequests = () => {
  const user = useSelector(state => state?.currentUser?.user);
  const [isEnabled, setIsEnabled] =useState(user?.driverIsVerified);
  const navigation = useNavigation()
    const [on, Off] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUsersById())
    }, [user])

      // console.log("'''''''''''''''''''''''",user)

    const changestatus = (value)=>{
      if(!user.driverIsVerified){
        ToastAndroid.CENTER
        ToastAndroid.showWithGravity(
          "You are not verified yet",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setIsEnabled(false)
        navigation.navigate("OnlineRegistrationPage")
        return
      }

        setIsEnabled(value)

        dispatch(ChangeStatus({
            onligne:!isEnabled

        }))
        console.log(!isEnabled)

    }

  return (
    <>
    <View
        style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:10,


        }}>


     <SwitchToggle
    size={60}
    value={isEnabled}
    onChange={(value) => {
      console.log(value)
      changestatus(value)

    }}
    switchOn={on}
  onPress={() => Off(!on)}
    circleColorOff='#d23a35'
  circleColorOn='#6ab04c'
  backgroundColorOn='#ffffff'
  backgroundColorOff='#ffffff'
  containerStyle={{
    marginTop: 16,
    width: 200,
    height: 48,
    borderRadius: 25,
    padding: 5,
    shadowOffset:{width: -1,height:-1},
    shadowColor: '#ffffff',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth:1,
    borderColor: !isEnabled ? "#d23a35" : "#6ab04c"

  }}
  backTextRight={
    'Online'
  }
  textRightStyle={
    {
      fontSize: 16,
      color: 'black',

      paddingLeft:20


    }
  }
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
    changestatus(!isEnabled)
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
      <Text style={{ fontSize: 14, color: 'black' }}>Offline</Text>
    )}
    renderActiveThumbIcon={() => (
      <Text style={{ fontSize: 14, color: 'black' }}>Online</Text>
    )}
    renderOffIndicator={() => (
      <Text style={{ fontSize: 12, color: 'black' }}></Text>
    )}
    renderOnIndicator={() => (
      <Text style={{ fontSize: 12, color: 'white' }}></Text>
    )}
  />
    </View>

    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
          color:"#999"
        }}>
        Searching for passenger...
      </Text>
    </View>
    </>
  )
}

export default RideRequests
