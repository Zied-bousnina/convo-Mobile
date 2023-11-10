import { View, ScrollView, Dimensions, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import ListRequest from './Components/ListRequest'
import { useDispatch, useSelector } from 'react-redux'
import { FindRequestDemande } from '../../redux/actions/demandesActions'
import { useNavigation } from '@react-navigation/native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import Fonts from '../../assets/fonts';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInput from '../../components/Inputs/AppInput'
import LoginButton from '../../components/Buttons/LoginButton'

const RequestHistory = () => {

  const requests = useSelector(state=>state?.DemandeDriver?.demandes?.demands)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const sheetRef = useRef(null);
const [selectedItem, setselectedItem] = useState({})
const [selectedIndex, setSelectedIndex] = useState(0);
const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
  useEffect(() => {
    dispatch(FindRequestDemande(navigation))

  }, [requests])
  // console.log("Requests_______________________", requests)

  // useEffect(() => {
  //   sheetRef.current.open()
  // }, [])

  return (
    <>

   <ScrollView>


{
  requests ? requests?.map((e, index)=>(

<Pressable
onPress={()=>{sheetRef.current.open()
console.log(e)
setselectedItem(e)
}}
>


      <ListRequest  key={index} data={e}/>
</Pressable>



  )):
  <SkeletonPlaceholder>

      <View
      key="1"
       style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
        <View

         style={{ marginLeft: 20, marginRight:20 }}>
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 15, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />


        </View>

      </View>
      <View  key={"2"} style={{ flexDirection: "row", alignItems: "center", marginTop:40 }}>
        {/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
        <View style={{ marginLeft: 20, marginRight:20 }}>
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 15, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />


        </View>

      </View>
      <View  key={"3"} style={{ flexDirection: "row", alignItems: "center", marginTop:40 }}>
        {/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
        <View style={{ marginLeft: 20, marginRight:20 }}>
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 15, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*0.9, height: 20, borderRadius: 4,marginTop: 20 }} />


        </View>

      </View>
    </SkeletonPlaceholder>
}




   </ScrollView>
   <BottomSheet ref={sheetRef}
        height={Dimensions.get("screen").height*0.3}
        closeOnDragDown={
          true
        }



       >

<View style={styles.contentView}>

          <View style={styles.buttonsContainer}>
            <Button
              title={'Ride details'}
              buttonStyle={{
                backgroundColor: '#2df793',
                // color:"black"

              }}
              titleStyle={{
                color:"black",
              }}
              containerStyle={{
                width: Dimensions.get("screen").width*0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius:10,

              }}
            />
            <Button
              title={'Repeat request'}
              buttonStyle={{
                backgroundColor: '#2df793',
                // color:"black"

              }}
              titleStyle={{
                color:"black",
              }}
              containerStyle={{
                width: Dimensions.get("screen").width*0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius:10,

              }}
            />
            <Button
              title={'Return route'}
              buttonStyle={{
                backgroundColor: '#2df793',
                // color:"black"

              }}
              titleStyle={{
                color:"black",
              }}
              containerStyle={{
                width: Dimensions.get("screen").width*0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius:10,

              }}
            />
            <Button
              title={'Delete'}
              buttonStyle={{
                backgroundColor: '#cccc',
                // color:"black"

              }}
              titleStyle={{
                color:"red",
              }}
              containerStyle={{
                width: Dimensions.get("screen").width*0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius:10,

              }}
            />
            <Button
              title={'close'}
              buttonStyle={{
                backgroundColor: '#cccc',
                // color:"black"

              }}
              titleStyle={{
                color:"black",
              }}
              containerStyle={{
                width: Dimensions.get("screen").width*0.9,
                marginHorizontal: 50,
                marginVertical: 10,
                borderRadius:10,

              }}
              onPress={
                ()=>{sheetRef.current.close()}
              }
            />


          </View>
      </View>
    </BottomSheet>

    </>
  )
}

const CustomTitle = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>John Doe</Text>
      <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
        Minister of Magic
      </Text>
    </View>
  );
  };

export default RequestHistory
const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    height:500
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  subHeader: {
    backgroundColor : "#2089dc",
    color : "white",
    textAlign : "center",
    paddingVertical : 5,
    marginBottom : 10
  }
  });