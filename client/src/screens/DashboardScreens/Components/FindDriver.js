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




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const initialValues = {
  tel:'',
  address:'',
  city:'',
  country:'',
  postalCode:'',
  bio:'',
};
const validationSchema = yup.object({
  tel: yup
    .string()
    .trim()
    .min(8, 'Phone number must be at least 8 number')
    .max(10, 'Phone number must be at most 8 number')
    .required('Phone number is required'),
  address: yup
    .string()
    .trim()
    .required('Address is required'),
  // city: yup
  //   .string()
  //   .trim()
  //   .required('City is required'),
  // country: yup
  //   .string()
  //   .trim()
  //   .required('Country is required'),
  postalCode: yup
    .string()
    .trim()
    .required('Postal code is required'),
  // bio: yup
  //   .string()
  //   .trim()
  //   .required('Bio is required'),

});
const FindDriver = ({currentLocation, currentAddress}) => {
    // console.log("gggg",currentLocation)
    const [governorates, setgovernorates] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Tunis');
    const [selectedMunicipal, setMunicipal] = useState('Tunis');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isLoading = useSelector(state=>state?.errors?.isLoading)
    const user = useSelector(state=>state?.auth?.user)
    const [load, setload] = useState(false)
    const [image, setImage] = useState(user?.avatar ? {uri:user?.avatar} : '');
    const isLoad = useSelector(state=>state?.isLoading?.isLoading)
    const RequestFindDriver = useSelector(state=>state?.ReqestFindDriver)
    const sheetRef = useRef(null);

// console.log(RequestFindDriver)
     // --------------------Gove-------------------------------------
     useEffect(() => {
      axios
        .get(`https://xgenboxv2.onrender.com/api/governorates`)
        .then(res => {
          setgovernorates(res.data[0]);
        })
        .catch(err => console.log(err));
    }, []);

    const municipales = governorates?.governorates?.filter(
      (item, index) => item.name === selectedValue,
    );
    // --------------------End Gove-------------------------------------

    const addImage=()=>{};
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

  // console.log(image? 'data:image/png;base64'+image : null)

    const handleCreateProfile = async (values, formikActions)=> {
      setload(true)

      dispatch(setLoading(true));

      // console.log(values)
      const formData = new FormData();
      formData.append('tel', values.tel);
      formData.append('address', values.address);
      formData.append('city', selectedValue);
      formData.append('country', selectedMunicipal);
      formData.append('postalCode', values.postalCode);
      formData.append('bio', values?.bio ? values.bio : '');
      formData.append('avatar', {
        uri: image?.uri ? image?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
        type: 'image/jpg',
        name: new Date()+ '_profile'
      });

      // console.log(formData)


      dispatch(AddProfile(formData, navigation))

      // formikActions.resetForm()
      formikActions.setSubmitting(false);

      // console.log(isLoading)
      setTimeout(() => {
      setload(false)

    }, 3000);


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

    }, [currentLocation])

    const snapPoints = useMemo(() => ['25%', '50%'], []);
  return (
    <>
    {isLoad? <AppLoader /> : null}


    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>

    {RequestFindDriver?.location?.longitude !=0 && RequestFindDriver?.location?.longitude !=undefined  ?
     <CostomFormik
          initialValues={{
    address:RequestFindDriver?.location && RequestFindDriver?.location?.latitude +'| '+RequestFindDriver?.location?.longitude,
    destination: "", // Set an initial value for other fields if needed
    tnd: "",
    comments: ""
  }}
          validationSchema={validationSchema}
          onSubmit={handleCreateProfile}
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
                  // value="tedt"


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