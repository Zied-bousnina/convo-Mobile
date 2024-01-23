/* eslint-disable prettier/prettier */
import React, { useEffect, useState} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView, TouchableOpacity, Pressable, Dimensions, ToastAndroid, Image} from 'react-native'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LogOut, setLoading } from '../../../redux/actions/authActions';
import { AddProfile } from '../../../redux/actions/profile.actions';
import AppLoader from '../../../components/Animations/AppLoader';
import BackSvg from '../../../components/svg/BackSvg';
import CostomFormik from '../../../components/costomFormik/CostomFormik';
import PhoneSVG from '../../../components/svg/PhoneSVG';
import AppInput from '../../../components/Inputs/AppInput';
import CitySvg from '../../../components/svg/CitySvg';
import CountrySvg from '../../../components/svg/CountrySVG';
import AdressSVG from '../../../components/svg/AddressSVG';
import PostalCodeSvg from '../../../components/svg/PostalCodeSVG';
import BioSvg from '../../../components/svg/BioSvg';
import LoginButton from '../../../components/Buttons/LoginButton';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Fonts from '../../../assets/fonts';
import ProfileAnimation from '../../../components/Animations/ProfileAnimation';
import ButtonCustom from '../../../components/Buttons/ButtonCustom';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { AddBasicInfo, findBasicInfoByUserId } from '../../../redux/actions/userActions';
import { Button, FAB, IconButton } from 'react-native-paper';




const BasicInfo = () => {
    const [governorates, setgovernorates] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Tunis');
  const [selectedMunicipal, setMunicipal] = useState('Tunis');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state=>state?.errors?.isLoading)
  const user = useSelector(state=>state?.auth?.user)
  const [load, setload] = useState(false)
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const [open, setOpen] = useState(false)
  const basicInfo = useSelector(state=>state?.BasicInfo?.basicInfo)


  useFocusEffect(
    React.useCallback(() => {
      dispatch(findBasicInfoByUserId(dispatch));
    }, [])
  );
  useEffect(() => {
    dispatch(findBasicInfoByUserId(dispatch));

  }, [ basicInfo?._id])

  const initialValues = {
    firstName:basicInfo?.firstName ? basicInfo?.firstName :'',
    lastName:basicInfo?.lastName ? basicInfo?.lastName :'',
    dateNais:basicInfo?.dateNais ? basicInfo?.dateNais :'',
    email:basicInfo?.email ? basicInfo?.email :'',

  };
  const [date, setDate] = useState(  basicInfo?.dateNais ?  new Date(basicInfo?.dateNais) :new Date())
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .trim()
      .required("First Name is required")
      ,
      lastName: yup
      .string()
      .trim()
      .required('Last Name is required'),



  });
  const [image, setImage] = useState(basicInfo?.avatar ? {uri:basicInfo?.avatar} : '');
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
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('dateNais', date.toDateString());

    formData.append('email', values?.email ? values.email : '');
    formData.append('avatar', {
      uri: image?.uri ? image?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });



    dispatch(AddBasicInfo(formData, navigation))

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






const handleSkip = ()=> {

//   dispatch(skipProfile( navigation))
  AsyncStorage.setItem('profileSkip', 'true')
  navigation.navigate("UserDashboard")
}

  return (
    <>
     <FAB
    icon="arrow-left"
    style={styles.fab}
    onPress={() => navigation.navigate("Registration")}
  />


    <KeyboardAwareScrollView>



    <View
        style={styles.item}
    >
      <>
    {isLoad? <AppLoader /> : null}


    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>
    <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateProfile}
            >
    <View style={{padding: 10}}>

        </View>

        <View style={styles.loginIcon}>
            <View style={styles.containerimg}>
                {
                    image?<Image source={{uri: image.uri}} style={{width:'100%', height:"100%"}} />  : <Icon
               name="user"
               size={80}
               color={  'white'}
           />
                }



            </View>
            <View style={styles.loginCon}>

<Button
  // style={styles.LoginBtn}
  // loginBtnLbl={styles.loginBtnLbl}
  // btnName={image ?"Edit Photo" : "Add a photo*"}
  onPress={selectPhotoTapped}
  mode='outlined'
  >
   { image ?"Edit Photo" : "Add a photo*"}
  </Button>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

</View>

</View>

      <Text style={{marginVertical:20,fontSize:16}}></Text>
        </View>


        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}></Text>
          </View>

          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>

              <View style={styles.textCon}>
                <AppInput
                  name="firstName"
                  placeholder="First Name"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={basicInfo?.firstName}
                />
              </View>
            </View>

            <View style={styles.textBoxCon}>

              <View style={styles.textCon}>
                <AppInput
                  name="lastName"
                  placeholder="Last Name"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  value={basicInfo?.lastName}
                />
              </View>
            </View>

            <View style={styles.textBoxCon}>
            <Icon2
               name="date"
               size={16}
               color={  'black'}

           />

              <View style={styles.textCon}>
           <Pressable
           onPress={() => setOpen(true)}
           >
                <AppInput
                  name="dateNais"
                  placeholder="Date of Birth"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                  onPress={() => setOpen(true)}
                  value={date  ? moment(date).format('DD MMMM, YYYY'):''}
                  editable={false}

                  // autoComplete={}

                />
                 <DatePicker
        modal
        open={open}
        date={date}

        maximumDate={new Date(moment().add(-10, 'years'))}
        theme='light'
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        mode='date'
        style={styles.datePickerStyle}
      />

           </Pressable>
              </View>
            </View>
            <View style={styles.textBoxCon}>

              <View style={styles.textCon}>
                <AppInput
                  name="email"
                  placeholder="Email"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>








          </View>


        </View>
    <View style={styles.loginCon2}>
            <LoginButton
              style={styles.LoginBtn2}
              loginBtnLbl={styles.loginBtnLbl2}
              btnName={"Next"}
            />
          </View>

        </CostomFormik>
      </KeyboardAwareScrollView>
      </>
    </View>
        </KeyboardAwareScrollView>
        </>
  )
}

export default BasicInfo

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex:900,
    // margin: 16,
    Left: 0,
    // bottom: 0,
    top:0
  },
    item: {
     flexDirection: 'row',
     justifyContent: 'space-between', // Add this line
     alignItems: 'center',
     marginVertical: 20,
     marginHorizontal:12,
     borderRadius:8,

     margin: 0.5, // Margin around the entire View
     height:70,
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.2,
     shadowRadius: 4,
     elevation: 4,
     backgroundColor: 'white',
     padding:10,
     height:Dimensions.get("screen").height*0.8
    },
    skipButton: {
        position: 'absolute',
        top: 10,       // Adjust the top position as needed
        right: 10,     // Adjust the right position as needed
        backgroundColor: 'transparent',
        padding: 10,
      },
      skipButtonText: {
        color: '#6bc7ab', // Customize the text color
        fontSize: 20,
        // fontWeight: 'bold',
      },
      roundedProfileImage: {
        width:100, height:100, borderWidth:3,
        borderColor:'white', borderRadius:50
      },
      mainCon: {
        backgroundColor: '#fff',
        flex: 1,

      },
      loginIcon: {

        alignItems:"center",
        alignSelf: 'center',
        marginTop: -75,
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
        marginVertical:20


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
        color: '#0057ff',
        fontFamily: Fonts.type.NotoSansSemiBold
      },
      registerNew: {
        color: '#aaa',
        fontFamily: Fonts.type.NotoSansSemiBold,
      },
      forgotLbl: {
        color: '#0057ff',
        // textAlign: 'right',
        fontFamily: Fonts.type.NotoSansSemiBold,
      },
      LoginBtn: {
        backgroundColor: '#6bc7ab',
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
        color: '#0057ff',
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
        height:80,
        width:80,

        // width:windowWidth * 0.3,
        // height:windowHeight * 0.2,
        backgroundColor:'#2df793',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        marginTop: 30,
        // marginLeft:'10%',
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
    },
    loginCon: {

        // paddingHorizontal: 20,
        // paddingVertical: 10,
    //   paddingBottom:100,
      justifyContent: 'center',

      // flex:1,
      // justifyContent: 'center',
      // alignItems: 'center',


      },
      LoginBtn: {
  marginTop: 15,
  backgroundColor: "white", // Change background color to white
  borderRadius: 60,
  shadowColor: "black",
  borderColor: "#2df793", // Change border color to "#2df793"
  borderWidth: 2, // Add border width
  width: Dimensions.get("screen").width * 0.6,
},
LoginBtn2: {
    marginTop: 15,
    // backgroundColor: "#2df793", // Change background color to white
    borderRadius: 60,
    shadowColor: "black",


    width: Dimensions.get("screen").width * 0.8,
    // justifyContent:"center"
  },
      loginBtnLbl: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: Fonts.type.NotoSansBlack,
        color: "#2df793",
        paddingVertical: 10,
      },
      loginBtnLbl2: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: Fonts.type.NotoSansBlack,
        color: "white",
        paddingVertical: 10,
      },
      loginCon2:{
        flex: 1, // Make sure the container takes up the full width
        justifyContent: "center", // Center its children horizontally
        alignItems: "center",
        marginTop:-20
      }
})