/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { Button, Icon } from 'react-native-elements'
import { ListItem } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { DeleteDEmande } from '../../../redux/actions/demandesActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import haversine from 'haversine'; // You may need to install this library using `npm install haversine`

import { uniqueId } from "lodash";
import { useNavigation } from '@react-navigation/native';

const ListRequest = memo((data, key) => {
    const originalDateString = data?.data?.createdAt;
    const date = new Date(originalDateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const navigation = useNavigation()
    const actionDelete = () => {
      dispatch(DeleteDEmande(data?.data?._id))
    }


    const getDistanceFromLatLonInKm=()=>{
      const userLocation = [ data?.data?.address?.latitude /* user's latitude */, data?.data?.address?.longitude  /* user's longitude */];
    const destinationLocation = [
       data?.data?.destination?.latitude,
       data?.data?.destination?.longitude,
    ]
      const lat1 = data?.data?.address?.latitude;
    const lon1 = data?.data?.address?.longitude;
    const lat2 = data?.data?.destination?.latitude;
    const lon2 =  data?.data?.destination?.longitude;
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

    return (
        <>


        <ListItem.Swipeable
        onPress={()=>{console.log(data?.data?._id)
          navigation.navigate("MissionDetails",{
            demandeId:data?.data?._id,
            distance:distance,
            address:data?.data?.address,
            destination:data?.data?.destination,
            comments:data?.data?.comments,
            offer:data?.data?.offer,
            status:data?.data?.status,
            postalAddress:data?.data?.postalAddress,
            postalDestination:data?.data?.postalDestination,
            postalCode:data?.data?.postalCode,
            postalDestinationCode:data?.data?.postalDestinationCode,

          })

        }}
          key={uniqueId}
          leftWidth={80}
          rightWidth={90}
          minSlideWidth={40}
          rightContent={(action) => (
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#E14F4F",
              }}
              type="clear"
              icon={{ name: "delete-outline" }}
              onPress={()=>{
                actionDelete()
// eslint-disable-next-line prettier/prettier

              }}
            />
          )}
        >
          <Icon
            name="label-important-outline"
            type="material"
            color="#f50"
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold", color: "#cccc" }}>
              {formattedDate}
            </ListItem.Title>
            <ListItem.Title>{data?.data?.postalAddress}</ListItem.Title>
            {data?.data?.postalDestination && (
              <ListItem.Subtitle>{data?.data?.postalDestination}</ListItem.Subtitle>
            )}
            <ListItem.Subtitle>~{distance}Km</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>

        </>
    );
  })


export default ListRequest