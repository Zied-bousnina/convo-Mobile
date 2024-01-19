/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, Dimensions, Pressable, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { Button, Icon, Image } from 'react-native-elements'
import { ListItem } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { DeleteDEmande } from '../../../redux/actions/demandesActions';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import haversine from 'haversine'; // You may need to install this library using `npm install haversine`

import { uniqueId } from "lodash";
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button as BTNPaper, Card, DataTable, Divider, IconButton, MD3Colors, Modal, Portal } from 'react-native-paper';
const ListFactures = memo((data, key) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

    const originalDateString = data?.data?.createdAt;
    const date = new Date(originalDateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;
    const dispatch = useDispatch()
    const sheetRef = useRef(null);
    const navigation = useNavigation()
    const actionDelete = () => {
      // dispatch(DeleteDEmande(data?.data?._id))
    }
console.log(data)
    const truncateText = (text, maxLength) => {
      console.log(text)
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
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,
    margin:20,
  };
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data?.data?.factures.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

    return (
        <>


<Card.Title
    title={`Facture N°${(data?.data?._id).toString().slice(-5)}`}
    subtitle={`de ${
      new Date(data?.data?.from).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
    }| à ${
      new Date(data?.data?.to).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
    }`  }
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
     right={(prps)=> {
        return(
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={{ color: "black",
    fontFamily:"Roboto-Bold",
    fontSize:12
     }}> {Number(data?.data?.totalAmmount).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}</Text>
          <IconButton
          style={{backgroundColor:"#8B5CF6",borderRadius:5}}
          labelStyle={{color:"white"}}
          icon="eye"
          mode="contained"
          onPress={() => {
            // navigation.navigate('FactureDetails', { data: data?.data })
            showModal()
            }}
        >

        </IconButton>
          </View>
        )


     }
     }


  />
  <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text
          style={{ color: "black",
          fontFamily:"Roboto-Bold",
          fontSize:16,
          textAlign:"center"
           }}
          >Liste des missions. </Text>
            <DataTable
      style={{backgroundColor:"#F2F0FD"}}

      columns={[
        {
          id: 'start',
          label: 'Start',
          minWidth: 100,
          sortable: true,
          // format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'to',
          label: 'To',
          minWidth: 100,
          sortable: true,
          // format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'distance',
          label: 'Distance',
          minWidth: 100,
          sortable: true,
          format: (value) => value.toFixed(2),
        },
      ]}
            >
      <DataTable.Header>
        <DataTable.Title
        // style={{
        //   color:"black"
        // }}
        >start</DataTable.Title>
        <DataTable.Title

        numeric>to</DataTable.Title>
        <DataTable.Title numeric>distance</DataTable.Title>
      </DataTable.Header>

      {data?.data?.factures.slice(from, to).map((item) => (
        <DataTable.Row key={item._id}>
          <DataTable.Cell
          
          >{item.mission?.postalAddress}</DataTable.Cell>
          <DataTable.Cell numeric>{item.mission?.postalDestination}</DataTable.Cell>
          <DataTable.Cell numeric>{item.mission?.distance}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data?.data?.factures.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${data?.data?.factures.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
    <Text
          style={{ color: "black",
          fontFamily:"Roboto-Bold",
          fontSize:16,
          textAlign:"center"
           }}
          > Cliquez à l'extérieur de cette zone pour fermer.</Text>
        </Modal>
      </Portal>
  <Divider/>
        {/* <Text>hets</Text> */}

        </>
    );
  })


export default ListFactures
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