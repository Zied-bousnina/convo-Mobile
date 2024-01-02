/* eslint-disable prettier/prettier */
import {Text,View,StyleSheet,KeyboardAvoidingView, TouchableOpacity, Pressable, Dimensions, ToastAndroid, Image} from 'react-native';
import React, { useMemo, useRef } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import Fonts from '../../../assets/fonts';
// import InternetDisconnected from '../../components/Animations/InternetDisconnected';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import * as yup from 'yup'
import { AddProfile } from '../../../redux/actions/profile.actions';
import { LogOut, setLoading } from '../../../redux/actions/authActions';
import AppLoader from '../../../components/Animations/AppLoader';
import BackSvg from '../../../components/svg/BackSvg';
import ProfileAnimation from '../../../components/Animations/ProfileAnimation';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import CostomFormik from '../../../components/costomFormik/CostomFormik';
import PhoneSVG from '../../../components/svg/PhoneSVG';
import AppInput from '../../../components/Inputs/AppInput';
import CitySvg from '../../../components/svg/CitySvg';
import AdressSVG from '../../../components/svg/AddressSVG';
import PostalCodeSvg from '../../../components/svg/PostalCodeSVG';
import LoginButton from '../../../components/Buttons/LoginButton';
import CountrySvg from '../../../components/svg/CountrySVG';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Destination from './Destination';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SET_LOCATION } from '../../../redux/types';
import { AddDemande } from '../../../redux/actions/demandesActions';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const validationSchema = yup.object({
  destination: yup
    .string()
    .trim()
    .required('Destination is required'),
  address: yup
    .string()
    .trim()
    .required('Address is required'),

  tnd:yup.number()
  .typeError('offer must be a number')
  .positive('offer must be greater than zero')
  .required('offer is required')


});
const FindDriver = ({currentLocation, currentAddress}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector(state=>state?.auth?.user)
    const [load, setload] = useState(false)
    const [image, setImage] = useState(user?.avatar ? {uri:user?.avatar} : '');
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const RequestFindDriver = useSelector(state=>state?.ReqestFindDriver)
    const sheetRef = useRef(null);

// console.log(RequestFindDriver)
     // --------------------Gove-------------------------------------


    // --------------------End Gove-------------------------------------


    // console.log("image", user?.avatar ? 'data:image/png;base64,'+user?.avatar : null)
    const setToastMsg = msg=> {
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      )
    }
    const selectPhotoTapped = () => {
      const options = {
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          // allowsEditing: true
        },
      };
      launchImageLibrary(options, (response) => {


        // console.log('Response = ', response);
        if (response.didCancel) {
          // console.log('User cancelled image picker');
          setToastMsg('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
          setToastMsg('ImagePicker Error: ' + response.error);
        } else {
          const uri = response.assets[0].uri;
          const type = response.assets[0].type;
          const name = response.assets[0].fileName;
          const source = {
            uri,
            type,
            name,
          }
          setImage(source)
          // console.log(source)
        }
      });
    }
    // const [distance, setdistance] = useState()

  // console.log(image? 'data:image/png;base64'+image : null)

    const handleCreateDemande = async (values, formikActions)=> {
      // setload(true)

      // dispatch(setLoading(true));

      // console.log(values)
      const formData = new FormData();
      formData.append('address', RequestFindDriver?.location);
      formData.append('destination', RequestFindDriver?.destination);
      formData.append('comments', values?.comments ? values?.comments :'');
      formData.append('offer', values?.tnd);

      const getDistanceFromLatLonInKm=()=>{
        const lat1 = RequestFindDriver?.location?.latitude;
      const lon1 = RequestFindDriver?.location?.longitude;
      const lat2 = RequestFindDriver?.destination?.latitude;
      const lon2 = RequestFindDriver?.destination?.longitude;
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
      const distance = getDistanceFromLatLonInKm()

      // useEffect(() => {
      //   getDistanceFromLatLonInKm
      // }, [])
      // console.log(formData?._parts)
      // navigation.navigate("FindDriverScreen",
      // {
      //   address: RequestFindDriver?.location,
      //   destination: RequestFindDriver?.destination,
      //   comments: values?.comments ? values?.comments :'',
      //   offer: values?.tnd,
      //   postalAddress: address,
      //   postalDestination: destination
      // }
      // )
      const data ={
        address: RequestFindDriver?.location,
        destination: RequestFindDriver?.destination,
        comments: values?.comments ? values?.comments :'',
        offer: values?.tnd,
        postalAddress: address,
        postalDestination: destination,
        distance:distance

      }

      if(RequestFindDriver?.destination?.latitude ==0){
        setToastMsg("Please choose destination")
        formikActions.setSubmitting(false);
        return
      }
      console.log(data)

      dispatch(AddDemande(data, navigation))

      // formikActions.resetForm()
      formikActions.setSubmitting(false);

      // console.log(isLoading)
    //   setTimeout(() => {
    //   setload(false)

    // }, 3000);


    }


    const handleLogOut= _ => {
      setload(true)
      setTimeout(() => {
        setload(false)

        // console.log("logout")
        dispatch(LogOut(navigation))
        navigation.navigate('Login')
      }, 3000);


    }
    useEffect(() => {
      dispatch({
        type:SET_LOCATION,
        payload:{
          latitude:currentLocation?.latitude,
          longitude:currentLocation?.longitude
        }
    })

    }, [currentLocation?.latitude])

    const [latitude, setLatitude] = useState(currentLocation?.latitude);
    const [longitude, setLongitude] = useState(currentLocation?.longitude);
    const [address, setAddress] = useState('');
    const [destination, setdestination] = useState('');

    // console.log(currentLocation?.latitude)
    const getGeocode = async () => {
      try {
        const apiKey = 'pk.eyJ1IjoiemllZDE0NDEiLCJhIjoiY2xvOGgyYnNuMDA3bjJrcWxrb3VvdXBlYyJ9.dPaxxre7QPTB2F_Psyt4nQ'; // Replace with your Mapbox API key
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation?.longitude},${currentLocation?.latitude}.json?access_token=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log("ff",data.features[0].place_name)

        if (data.features && data.features?.length > 0) {
          const firstFeature = data.features[0];
          const formattedAddress = firstFeature.place_name;
          setAddress(formattedAddress);
        } else {
          setAddress('Destination');
        }
      } catch (error) {
        console.error('Error geocoding coordinates:', error);
      }
    };

    const getGeocodeDestination = async () => {
      try {
        const apiKey = 'pk.eyJ1IjoiemllZDE0NDEiLCJhIjoiY2xvOGgyYnNuMDA3bjJrcWxrb3VvdXBlYyJ9.dPaxxre7QPTB2F_Psyt4nQ'; // Replace with your Mapbox API key
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${RequestFindDriver?.destination?.longitude},${RequestFindDriver?.destination?.latitude}.json?access_token=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log("ff",data.features[0].place_name)

        if (data.features && data.features?.length > 0) {
          const firstFeature = data.features[0];
          const formattedAddress = firstFeature.place_name;
          setdestination(formattedAddress);
        } else {
          setdestination('click to select destination');
        }
      } catch (error) {
        console.error('Error geocoding coordinates:', error);
      }
    };

    useEffect(() => {
      getGeocode();


    }, [currentLocation.longitude, getGeocode]);
    // console.log(RequestFindDriver)
      RequestFindDriver?.destination && useEffect(() => {
      getGeocodeDestination()
    }, [RequestFindDriver?.destination?.latitude])


// console.log(address)
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    // console.log("destination",destination)
    // console.log(RequestFindDriver?.destination)
  return (
    <>
    {isLoad? <AppLoader /> : null}


    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>

    {address !="Undefined Road, 690523, Thodiyoor, Karunagappally, Kollam, Kerala, India"  ?
     <CostomFormik
          initialValues={{
    address:address,
    destination: destination  ? destination: "" , // Set an initial value for other fields if needed
    tnd: "",
    comments: ""
  }}
          validationSchema={validationSchema}
          onSubmit={handleCreateDemande}
            >


        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}></Text>
          </View>

          <View style={styles.formCon}>



          <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="record-circle" size={20} color="#26cbfc" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="address"
                  placeholder="Address"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  // value=*
                  editable = {false}



                />
              </View>
            </View>
          <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="record-circle" size={20} color="#2df793" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="destination"
                  placeholder="Destination"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={destination ? destination:""}
                  onPress={()=>
                    {
                      navigation.navigate("Destination")

                      // console.log("ghhhh")
                      // sheetRef.current.open()
                    }
                  }
                />
              </View>
            </View>

            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <Icon1 name="offer" size={20} color="black" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="tnd"
                  placeholder="TND Offer your fare"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
            <Icon1 name="comment-text-outline" size={20} color="black" />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="comments"
                  placeholder="Options and comments"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>
            {/* <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
                <BioSvg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="bio"
                  placeholder="Bio"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View> */}
            <View style={styles.termsCon}>
            </View>
          </View>

          <View style={styles.loginCon}>
            <LoginButton
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"Find a Driver"}
            />
          </View>
        </View>
        <BottomSheet ref={sheetRef}
        // height={Dimensions.get("screen").height}
        closeOnDragDown={
          true
        }
        // closeOnPressMask={true}
        // snapPoints={['100%']}

        // height={Dimensions.get("screen").height}

        >
       {/* <Destination/> */}
       {/* <Pressable
        onPress={()=>sheetRef.current.close()}
        style={{
          backgroundColor: '#6bc7ab',
          padding: 16,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
      </Pressable> */}

      {/* <FindDriver currentLocation={currentLocation} currentAddress={currentAddress}/> */}
    </BottomSheet>
        </CostomFormik>:
        <SkeletonPlaceholder>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <View style={{ width: 60, height: 60, borderRadius: 50 }} /> */}
        <View style={{ marginLeft: 20, marginRight:20 }}>
          <View style={{ width: Dimensions.get('screen').width*80, height: 40, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*80, height: 40, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*80, height: 40, borderRadius: 4,marginTop: 20 }} />
          <View style={{ width: Dimensions.get('screen').width*80, height: 40, borderRadius: 4,marginTop: 20 }} />
          <View
            style={{ marginTop: 6, width: Dimensions.get("screen").width*40, height: 20, borderRadius: 4 }}
          />
        </View>

      </View>
    </SkeletonPlaceholder>
         }
      </KeyboardAwareScrollView>
      </>
  )
}

export default FindDriver
const styles = StyleSheet.create({
    roundedProfileImage: {
      width:75, height:75, borderWidth:3,
      borderColor:'white', borderRadius:50
    },
    mainCon: {
      backgroundColor: '#fff',
      flex: 1,


    },
    loginIcon: {
      alignSelf: 'center',
      marginTop: -30,
    },
    formCon: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginTop: -50,
    },
    container: {
      paddingHorizontal: 20,
      marginTop: -20,
    },
    loginLblCon: {
      position: 'relative',
      bottom: 40,
    },
    loginLbl: {
      color: '#000',
      fontSize: 40,
      fontFamily: Fonts.type.NotoSansExtraBold,
    },
    at: {
      alignSelf: 'center',
      width: '10%',
    },
    show: {
      alignSelf: 'center',
      width: '10%',
      position: 'relative',
      right: 20,
      zIndex: 10,
    },
    textBoxCon: {
      flexDirection: 'row',
      justifyContent: 'space-between',


    },
    textCon: {
      width: '90%',
    },
    passCon: {
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    textInput: {
      borderBottomColor: '#aaa',
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      color: '#000',
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansMedium,
      height: 40,
      marginTop: -10,
    },
    forgotAction: {
      paddingVertical: 20,
    },
    registerCon: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 0
    },
    registerLbl: {
      color: '#2df793',
      fontFamily: Fonts.type.NotoSansSemiBold
    },
    registerNew: {
      color: '#aaa',
      fontFamily: Fonts.type.NotoSansSemiBold,
    },
    forgotLbl: {
      color: '#2df793',
      // textAlign: 'right',
      fontFamily: Fonts.type.NotoSansSemiBold,
    },
    LoginBtn: {
      backgroundColor: '#2df793',
      borderRadius: 20,
    },
    loginBtnLbl: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: Fonts.type.NotoSansBlack,
      color: '#fff',
      paddingVertical: 10,
    },
    devider: {
      borderBottomColor: '#aaa',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: 20,
    },
    or: {
      color: '#aaa',
      textAlign: 'center',
      backgroundColor: '#fff',
      width: 60,
      alignSelf: 'center',
      fontFamily: Fonts.type.NotoSansSemiBold,
      position: 'relative',
      bottom: 13,
    },
    deviderCon: {
      paddingVertical: 10,
    },
    googleIconCon: {
      flexDirection: 'row',
      backgroundColor: '#eee',
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 20,
      paddingHorizontal: 30,
    },
    googleLbl: {
      color: '#000',
      textAlign: 'center',
      paddingHorizontal: 30,
      fontFamily: Fonts.type.NotoSansBlack,
    },
    termsCon: {
      flexDirection: 'row',
      width: '100%',
      flexWrap: 'wrap',
      paddingVertical: 5,
    },
    termsBy: {
      fontSize: 12,
      color: '#aaa',
      fontFamily: Fonts.type.NotoSansSemiBold,
    },
    termLbl: {
      color: '#2df793',
      fontFamily: Fonts.type.NotoSansSemiBold,
      fontSize: 12,
    },
    avatarContainer: {
      marginTop: 10,
      alignItems: 'center',

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    containerimg:{
      elevation:2,
      height:150,
      width:150,
      // width:windowWidth * 0.3,
      // height:windowHeight * 0.2,
      backgroundColor:'#efefef',
      position:'relative',
      borderRadius:999,
      overflow:'hidden',
    //   marginTop: '1%',
      marginLeft:'10%',
      // alignItems: 'center',
  },
  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'25%',
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center',
      backgroundColor:'lightgrey',
  }
  });