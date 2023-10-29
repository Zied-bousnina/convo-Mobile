import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet,Platform } from 'react-native'

const Rating = () => {
  return (
    <>

    <View style={styles.card}>

      <View style={styles.cardHeader}>
        <Text style={styles.title}>Normal</Text>
      </View>
      <View style={styles.cardContent}>
        <Text
        style={{
            color:"#333540"
        }}
        >jhjjj</Text>
      </View>
    </View>
    <View style={styles.card2}>
      {/* {props.children} */}
    </View>
    </>
  )
}

export default Rating

const styles = StyleSheet.create({
    cardHeader: {
        padding: 16,
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#333540"
      },
      cardContent: {
        padding: 16,
        color:"#333540"
      },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      height:200,
      // For Android
      ...Platform.select({
        android: {
          elevation: 5,
        },
        // For iOS
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      }),
    },
    card2: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        height:70,
        // For Android
        ...Platform.select({
          android: {
            elevation: 5,
          },
          // For iOS
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
        }),
      },
  });