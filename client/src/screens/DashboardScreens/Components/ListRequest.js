/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, Dimensions, Pressable, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { Button, Icon, Image } from 'react-native-elements'
import { ListItem } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { AccepteMission, ConfirmeeMissionByDriver, DeleteDEmande, TermineeMission } from '../../../redux/actions/demandesActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import haversine from 'haversine'; // You may need to install this library using `npm install haversine`

import { uniqueId } from "lodash";
import { useNavigation } from '@react-navigation/native';
import { Button as BTNPaper, MD3Colors } from 'react-native-paper';
import { SET_REQUEST } from '../../../redux/types';
const ListRequest = memo((data, key) => {
    const originalDateString = data?.data?.createdAt;
    const date = new Date(originalDateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const navigation = useNavigation()
    const isLOad = useSelector(state=>state?.isLoading?.isLoading)
    const actionDelete = () => {
      // dispatch(DeleteDEmande(data?.data?._id))
    }
// console.log(data?.data?.mission?.dateDepart)
const isDateUnderCurrentDate = (inputDate) => {
  const targetDate = new Date(inputDate);
  const currentDate = new Date();

  return targetDate < currentDate;
};

// console.log(`Is the date ${data?.data?.mission?.dateDepart} under the current date? ${isDateUnderCurrentDate(data?.data?.mission?.dateDepart)}`);

    const truncateText = (text, maxLength) => {

      // return "h";
      return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };
    const getDistanceFromLatLonInKm=()=>{
      const userLocation = [ data?.data?.mission?.address?.latitude /* user's latitude */, data?.data?.mission?.address?.longitude  /* user's longitude */];
    const destinationLocation = [
       data?.data?.mission?.destination?.latitude,
       data?.data?.mission?.destination?.longitude,
    ]
      const lat1 = data?.data?.mission?.address?.latitude;
    const lon1 = data?.data?.mission?.address?.longitude;
    const lat2 = data?.data?.mission?.destination?.latitude;
    const lon2 =  data?.data?.mission?.destination?.longitude;
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

    const navigateDetails= ()=> {
      navigation.navigate("missionDetails",{
        demandeId:data?.data?.mission?._id,
        distance:distance,
        address:data?.data?.mission?.address,
        destination:data?.data?.mission?.destination,
        comments:data?.data?.mission?.comments,
        offer:data?.data?.mission?.offer,
        status:data?.data?.mission?.status,
        postalAddress:data?.data?.mission?.postalAddress,
        postalDestination:data?.data?.mission?.postalDestination,
        postalCode:data?.data?.mission?.postalCode,
        postalDestinationCode:data?.data?.mission?.postalDestinationCode,
        missionType: data?.data?.mission?.missionType,
        dateDepart : data?.data?.mission?.dateDepart,
        remunerationAmount: data?.data?.remunerationAmount,
        devisId: data?.data?._id
        // dateArrivee : data?.data?.mission?.dateArrivee,

      })
    }
    return (
        <>


<Pressable style={styles.taskContainer}
     onPress={
        () => {
          // setselectedItem(item);
          // sheetRef.current.open();

          navigation.navigate("missionDetails",{
            demandeId:data?.data?.mission?._id,
            distance:distance,
            address:data?.data?.mission?.address,
            destination:data?.data?.mission?.destination,
            comments:data?.data?.mission?.comments,
            offer:data?.data?.mission?.offer,
            status:data?.data?.mission?.status,
            postalAddress:data?.data?.mission?.postalAddress,
            postalDestination:data?.data?.mission?.postalDestination,
            postalCode:data?.data?.mission?.postalCode,
            postalDestinationCode:data?.data?.mission?.postalDestinationCode,
            missionType: data?.data?.mission?.missionType,
            dateDepart : data?.data?.mission?.dateDepart,
            remunerationAmount: data?.data?.remunerationAmount,
            devisId: data?.data?._id
            // dateArrivee : data?.data?.mission?.dateArrivee,

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
        {/* <BTNPaper
            style={{
                marginRight:-10
            }}
            loading={false} mode="contained" onPress={() => console.log('Pressed')}>
    Confirmée
  </BTNPaper> */}
     </View>
          <View style={styles.tags2}>
            {/* Your tags view code */}

            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{
                uri:data?.data?.partner?.profile?.avatar ?
                data?.data?.partner?.profile?.avatar :
                data?.data?.profile?.avatar ?
                data?.data?.profile?.avatar :
                'https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'
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


            <Text style={styles.text}>
            {
              data?.data?.partner?.contactName ?
              ("Partenaire: " + data?.data?.partner?.contactName)
               :
              "Admin"
            }
            {/* Partenaire: {data?.data?.partner?.contactName} */}
           {/* {item?.user?.email} */}
           </Text>
          <Text  style={styles.text}>Départ:
          {truncateText(data?.data?.mission?.postalAddress, 40)}

           {/* {item?.user?.email} */}
           </Text>
          <Text  style={styles.text}>
          Arrivée: {truncateText(data?.data?.mission?.postalDestination, 40)}
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
  /> {new Date(data?.data?.mission?.dateDepart).toLocaleTimeString('en-US', {
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
  /> {new Date(data?.data?.mission?.dateDepart).toLocaleDateString('en-US', {
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
              {Number(data?.data?.remunerationAmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}
              {/* {formattedDate} */}
              </Text>
            </View>
          {/* </View> */}


            {/* <View style={styles.showMoreContainer}>
              <Text style={styles.showMoreText}>Click To Report User</Text>
            </View> */}


            <View
              // style={styles.tags}
            >
            {
              data?.data?.status=='Démarrée' ?
              <BTNPaper
             loading={isLOad}
            onPress={() => {
              navigateDetails()

            // dispatch(TermineeMission(
            //   data?.data?._id

            // ))


            }}
            mode="contained">
               Terminée Mission
            </BTNPaper>:
            data?.data?.status=='Confirmée' ?

<BTNPaper
          style={{
              marginRight:-10,
              // backgroundColor:"#27AE60",
              // buttonColor:"#27AE60"

          }}
          loading={isLOad} mode="elevated"
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
navigateDetails()
}}
          >
  Confirmée
</BTNPaper>
            :
            <BTNPaper
            mode="outlined"
            loading={isLOad}
            onPress={() => {
              navigateDetails()

      //         dispatch(AccepteMission(
      //           data?.data?._id

      //       ))
      //       dispatch({
      //   type: SET_REQUEST,
      //   payload: [],
      // });
      //       dispatch({
      //   type: SET_LAST_MISSION,
      //   payload: [],
      // });
    // dispatch(FindLastMission())
            }}
            >
              démarée Mission
            </BTNPaper>
            }



            </View>

        </Pressable>
        {/* <Text>hets</Text> */}

        </>
    );
  })


export default ListRequest
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