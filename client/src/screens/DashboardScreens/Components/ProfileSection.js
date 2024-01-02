/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const ProfileSection = () => {
  const navigatin = useNavigation()
  const user= useSelector(state=>state?.auth?.user)
  // console.log(state)
  return (
    <View style={styles.userCard}>
        <View>
          <Image source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }} style={styles.userPhoto} />

        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userFollowers}>{user?.email}</Text>
        </View>
        <TouchableOpacity
        onPress={
          () => navigatin.navigate("profileSettings")
        }
        >
        <Icon2 name="arrow-forward-ios" size={30} color="#999" />
        </TouchableOpacity>
      </View>
  )
}

export default ProfileSection

const styles = StyleSheet.create({
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      userInfo: {
        flex: 1,
        marginLeft: 10,
      },
      userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
        color:'#989'
      },
      userFollowers: {
        color: '#999',
      },
      editButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#008B8B',
      },
      editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})