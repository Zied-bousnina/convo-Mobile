import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Button, Icon } from 'react-native-elements'
import { ListItem } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { DeleteDEmande } from '../../../redux/actions/demandesActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
const ListRequest = (data) => {
    const originalDateString = data?.data?.createdAt;
    const date = new Date(originalDateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const actionDelete = () => {
      dispatch(DeleteDEmande(data?.data?._id))
    };


    return (
        <>


        <ListItem.Swipeable
        // onPress={()=>{onPress}}
          key={data?.data?._id}
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
            <ListItem.Subtitle>TND{data?.data?.offer}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>

        </>
    );
  };


export default ListRequest