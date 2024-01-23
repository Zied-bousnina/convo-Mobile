/* eslint-disable prettier/prettier */
import React, { useEffect, useState} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView, TouchableOpacity, Pressable, Dimensions, ToastAndroid, Image} from 'react-native';
import Fonts from '../../assets/fonts';
import { useNavigation } from '@react-navigation/native';
import PhoneSVG from '../../components/svg/PhoneSVG';
import CostomFormik from '../../components/costomFormik/CostomFormik';
import AppInput from '../../components/Inputs/AppInput';
import * as yup from 'yup'
import LoginButton from '../../components/Buttons/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import {  setLoading } from '../../redux/actions/authActions';
import AppLoader from '../../components/Animations/AppLoader';
import ProfileAnimation from '../../components/Animations/ProfileAnimation';
import AdressSVG from '../../components/svg/AddressSVG';
import CitySvg from '../../components/svg/CitySvg';
import CountrySvg from '../../components/svg/CountrySVG';
import PostalCodeSvg from '../../components/svg/PostalCodeSVG';
import BioSvg from '../../components/svg/BioSvg';
import { AddProfile, GetProfile } from '../../redux/actions/profile.actions';
import BackSvg from '../../components/svg/BackSvg';
import { LogOut } from '../../redux/actions/authActions';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import InternetDisconnected from '../../components/Animations/InternetDisconnected';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';










const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






const ProfileSettings = () => {
  const profile = useSelector(state=>state?.profile?.profile)
  const currentUser2 = useSelector(state=>state?.auth)

  const initialValues = {
    tel:useSelector(state=>state?.profile?.profile?.tel),
    address:useSelector(state=>state?.profile?.profile?.address),
    city:useSelector(state=>state?.profile?.profile?.city),
    country:useSelector(state=>state?.profile?.profile?.country),
    postalCode:useSelector(state=>state?.profile?.profile?.postalCode),
    bio:'',
    // useSelector(state=>state?.profile?.profile)
  };
  const validationSchema = yup.object({
    tel: yup
      .string()
      .trim()
      .min(8, 'Phone number must be at least 8 number')
      .max(10, 'Phone number must be at most 8 number')
      .required('Phone number is required'),
    // address: yup
    //   .string()
    //   .trim()
    //   .required('Address is required'),
    // city: yup
    //   .string()
    //   .trim()
    //   .required('City is required'),
    // country: yup
    //   .string()
    //   .trim()
    //   .required('Country is required'),
    // postalCode: yup

    //   .string()
    //   .trim()
    //   .required('Postal code is required'),
    // bio: yup
    //   .string()
    //   .trim()
    //   .required('Bio is required'),

  });

  useEffect(() => {
  dispatch(GetProfile())
  }, [profile?._id])


    const [governorates, setgovernorates] = useState([]);
  const [selectedValue, setSelectedValue] = useState(profile?.country ?profile?.country:  'Tunis');
  const [selectedMunicipal, setMunicipal] = useState( profile?.city ? profile?.city:  'Tunis');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state=>state?.errors?.isLoading)
  const user = useSelector(state=>state?.auth?.user)
  const [load, setload] = useState(false)
  const [image, setImage] = useState(profile?.avatar ? {uri:profile?.avatar} : '');
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)


   // --------------------Gove-------------------------------------
   useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const response = await axios.get('https://xgenboxv2.onrender.com/api/governorates');
        const firstGovernorate = response.data[0];
        setgovernorates(firstGovernorate);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      }
    };

    fetchGovernorates();
  }, [governorates?.governorates?.length]);


  const municipales = governorates?.governorates?.filter(
    (item, index) => item.name === selectedValue,
  );
  // --------------------End Gove-------------------------------------

  const addImage=()=>{};

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



      if (response.didCancel) {

        setToastMsg('User cancelled image picker');
      } else if (response.error) {

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

      }
    });
  }



  const handleCreateProfile = async (values, formikActions)=> {
    setload(true)

    dispatch(setLoading(true));


    const formData = new FormData();
    formData.append('tel', values.tel);
    formData.append('address', values.address ?
      values.address : profile?.address
    );
    formData.append('city', selectedValue);
    formData.append('country', selectedMunicipal);
    formData.append('postalCode', values.postalCode ?
      values.postalCode : profile?.postalCode

    );
    formData.append('bio', values?.bio ? values.bio : '');
    formData.append('avatar', {
      uri: image?.uri ? image?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });



    dispatch(AddProfile(formData, navigation))

    // formikActions.resetForm()
    formikActions.setSubmitting(false);


    setTimeout(() => {
    setload(false)

  }, 3000);


  }


  const handleLogOut= _ => {
    setload(true)
    setTimeout(() => {
      setload(false)


      dispatch(LogOut(navigation))
      navigation.navigate('Login')
    }, 3000);


  }




  return (
    <>
    {isLoad? <AppLoader /> : null}


    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>
    <View style={{padding: 20}}>
          <Pressable
          onPress={()=>navigation.navigate("ProfileScreen")}>
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
            <BackSvg
              width={31}
              height={31}
            />
          </Pressable>
        </View>
        <View style={styles.loginIcon}>
            <View style={styles.containerimg}>
                {
                    image?<Image source={{uri: image.uri}} style={{width:'100%', height:"100%"}} />  : <ProfileAnimation/>
                }

                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            {/* <AntDesign name="camera" size={20} color="black" /> */}
                        </TouchableOpacity>
                    </View>
            </View>

      <Text style={{marginVertical:20,fontSize:16}}>Welcome! Let's create your profile</Text>
        </View>
        <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateProfile}
            >


        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}></Text>
          </View>

          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <PhoneSVG
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="tel"
                  placeholder="Tel"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={profile?.tel}
                />
              </View>
            </View>


            <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
                <CitySvg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                {/* <AppInput
                  name="city"
                  placeholder="City"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                /> */}
                 <Text
                        style={{
                          fontSize: 16,
                          color: '#aaa',
                          marginRight: 10,
                        }}>
                        governorate
                      </Text>
                      <Picker
                        selectedValue={selectedValue}
                        style={{height: 50, width: 150, color:"#022d26"}}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }>
                        {governorates?.governorates?.map((gov, index) => (
                          <Picker.Item
                            key={index}
                            label={gov.name}
                            value={gov.name}
                          />
                        ))}
                        {/* <Picker.Item label="JavaScript" value="js" /> */}
                      </Picker>
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
                <CountrySvg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                {/* <AppInput
                  name="country"
                  placeholder="Country"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                /> */}
                <Text
                        style={{
                          fontSize: 16,
                          color: '#aaa',
                          marginRight: 10,
                        }}>
                        Municipal
                      </Text>
                      <Picker
                        selectedValue={selectedMunicipal}
                        style={{height: 50, width: 150, color:"#022d26"}}
                        onValueChange={(itemValue, itemIndex) =>
                          setMunicipal(itemValue)
                        }>
                        {municipales &&
                          municipales[0]?.municipalities?.map(
                            (municipal, index) => (
                              <Picker.Item
                                key={index}
                                label={municipal}
                                value={municipal}
                              />
                            ),
                          )}
                        {/* <Picker.Item label="JavaScript" value="js" /> */}
                      </Picker>
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
              <AdressSVG
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="address"
                  placeholder="Address"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={profile?.address}
                />
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
            <View style={styles.at}>
                 <PostalCodeSvg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="postalCode"
                  placeholder="Postal Code"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={profile?.postalCode}
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
              btnName={"Next"}
            />
          </View>
        </View>
        </CostomFormik>
      </KeyboardAwareScrollView></>
  )
}

export default ProfileSettings

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