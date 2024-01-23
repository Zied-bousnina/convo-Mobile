
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Pressable, ImageBackground } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../../redux/actions/profile.actions';
import { AcceptedMission, Findfactures, GetMissions } from '../../../redux/actions/demandesActions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { findBasicInfoByUserId } from '../../../redux/actions/userActions';
const ProfileScreen = () => {
    const PAGE_LIMIT = 5;
    const profile = useSelector(state=>state?.profile?.profile)
    const currentUser2 = useSelector(state=>state?.auth)
    const item_list = useSelector((state) => state.missions.missions.items);
    const dispatch = useDispatch()
    const missionTerminee = useSelector((state) => state?.AcceptedMissions?.mission?.missions);
    const navigation = useNavigation()
    const basicInfo = useSelector(state=>state?.BasicInfo?.basicInfo)

    useEffect(() => {
      dispatch(findBasicInfoByUserId(dispatch));

    }, [basicInfo?._id])



    useFocusEffect(
      React.useCallback(() => {
        dispatch(findBasicInfoByUserId(dispatch));
      }, [])
    );

    useEffect(() => {
      //
      dispatch(
          AcceptedMission(),
      );
    }, [dispatch,missionTerminee?.length ]);
    useEffect(() => {
    dispatch(GetProfile())
    }, [profile?._id])
    useEffect(() => {

        dispatch(
          GetMissions({
            page: 0,
            limit: PAGE_LIMIT,
            skip: 0 * PAGE_LIMIT,
          }),
        );
      }, [dispatch, item_list.length  ]);
      const factures = useSelector((state) => state?.factures?.factures);
      useEffect(() => {

        dispatch(
          Findfactures(),
        );
      }, [dispatch,factures?.length ]);


  return (
    <ImageBackground

    source={
        require('../../../assets/images1/pattern-randomized.png')
    }
    style={{
      flex: 1,
    //   backgroundColor: '#DED5D5', // Fallback color in case the image fails to load
    }}
    resizeMode="cover"
  >


    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
            {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
            <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
        </View>

        <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
                <Image source={{
                    uri:basicInfo?.avatar ?
                    basicInfo?.avatar : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }} style={styles.image} resizeMode="center"></Image>
            </View>
            <View style={styles.dm}>
                {/* <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons> */}
            </View>
            <View style={styles.active}></View>
            <View style={styles.add}>
                {/* <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons> */}
            </View>
        </View>

        <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{currentUser2?.user?.name}</Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>conducteur</Text>
        </View>

        <View style={styles.statsContainer}>
            <Pressable style={styles.statsBox}
            onPress={()=>{
                navigation.navigate("Missions")
            }}

            >
                <Text style={[styles.text, { fontSize: 24 }]}>{missionTerminee?.length}</Text>
                <Text style={[styles.text, styles.subText]}>mission Terminée </Text>
            </Pressable>
            <Pressable
            onPress={()=>{
                navigation.navigate("Missions")
            }}
            style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Text style={[styles.text, { fontSize: 24 }]}>{item_list?.length}</Text>
                <Text style={[styles.text, styles.subText]}>mission en cours</Text>
            </Pressable>
            <Pressable

            onPress={()=>{
                navigation.navigate("recents")
            }}
             style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{factures?.length}</Text>
                <Text style={[styles.text, styles.subText]}>factures</Text>
            </Pressable>
        </View>

        {/* <View style={{ marginTop: 32 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.mediaImageContainer}>
                    <Image source={{
                    uri:profile?.avatar
                }} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                    <Image source={{
                    uri:profile?.avatar
                }} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                    <Image source={{
                    uri:profile?.avatar
                }} style={styles.image} resizeMode="cover"></Image>
                </View>
            </ScrollView>
            <View style={styles.mediaCount}>
                <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
            </View>
        </View> */}
        <Text style={[styles.subText, styles.recent]}>cordonnée :</Text>
        <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        E-mail : <Text style={{ fontWeight: "400" }}> {currentUser2?.user.email} </Text>
                    </Text>
                </View>
            </View>

{
    profile?.tel &&

            <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                        N° Tel : <Text style={{ fontWeight: "400" }}> {profile?.tel} </Text>
                    </Text>
                </View>
            </View>
}


            <View style={styles.recentItem}>
                {/* <View style={styles.activityIndicator}></View> */}
                <View style={{ width: 250 }}>
                    <Button
                    onPress={()=>{
                        navigation.navigate("BasicInfo")
                    }}
                    mode="contained" >Modifier Profile</Button>


                </View>
            </View>
        </View>
    </ScrollView>
</SafeAreaView>
</ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
export default ProfileScreen