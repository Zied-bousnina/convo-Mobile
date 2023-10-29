import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React, { useCallback } from 'react'
import { Button } from 'react-native'
import LoginButton from '../../components/Buttons/LoginButton'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../../redux/actions/authActions'
import { useNavigation } from '@react-navigation/native'

import { useState } from 'react'
// import BottomNavigationCompo from '../../components/Dashboard/BottomNavigationCompo'

const UserDashboardScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleLogOut= _ => {
    console.log("logout")
    dispatch(
      LogOut()
    )
   setTimeout(() => {

     navigation.navigate("Login")
   }, 100);

  }

  return (
    <View style={styles.container}>
    <Text style={styles.statusText}>This application is in progress </Text>
    <Text style={styles.statusText}>By Zied Bousnina </Text>
    <Button
      title="Logout"
      color={'#2df793'}
      onPress={() => {
        // Implement your logout logic here
        handleLogOut()
      }}
    />
  </View>
  )
}

export default UserDashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    color: '#26cbfc', // You can change 'blue' to your desired color
    marginBottom: 20,
  },
});