import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Switch from 'react-native-switch-toggles';

const RideRequests = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
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


     <Switch
    size={60}



    value={isEnabled}
    onChange={(value) => setIsEnabled(value)}
    activeThumbColor={'#d23a35'}
    inactiveThumbColor={'#6ab04c'}
    activeTrackColor={'#ffffff'}
    inactiveTrackColor={'#ffffff'}

    renderInactiveThumbIcon={() => (
      <Text style={{ fontSize: 14, color: 'black' }}>Online</Text>
    )}
    renderActiveThumbIcon={() => (
      <Text style={{ fontSize: 14, color: 'black' }}>Offline</Text>
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
