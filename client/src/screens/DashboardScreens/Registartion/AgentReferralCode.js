import { View, Text, StyleSheet, Dimensions, Image, ToastAndroid, Pressable } from 'react-native'
import React, { useState } from 'react'
import AppInput from '../../../components/Inputs/AppInput'
import CostomFormik from '../../../components/costomFormik/CostomFormik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import Fonts from '../../../assets/fonts';
import Icon2 from 'react-native-vector-icons/Fontisto';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/actions/authActions'
import ButtonCustom from '../../../components/Buttons/ButtonCustom'
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import LoginButton from '../../../components/Buttons/LoginButton'
import BackSvg from '../../../components/svg/BackSvg'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
const initialValues = {
  licenseNbr:'',
  dateExp:'',


};
const validationSchema = yup.object({
  licenseNbr: yup
    .string()
    .trim()

    .required("License number is required")
    .min(12)
    .max(12)
    .matches(/^[0-9]+$/, "Must be only digits")
    .label('License number'),


});
const AgentReferralCode = () => {
  const user = useSelector(state=>state?.auth?.user)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [image, setImage] = useState({
    frontDriver:'',
    backDriver:'',
  });
  const [load, setload] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const setToastMsg = msg=> {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER

    )
  }
  const selectPhotoTapped = (imageType) => {
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
        setImage({
          ...image,
          [imageType]:source
        })

      }
    });
  }



  const handleCreateDriverLicense = async (values, formikActions)=> {
    setload(true)

    dispatch(setLoading(true));


    const formData = new FormData();
    formData.append('licenseNbr', values.licenseNbr);
    formData.append('dateExp', date);
    formData.append('frontDriverLicense', {
      uri: image?.frontDriver ? image?.frontDriver : `https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });

    formData.append('backDriverLicense', {
      uri: image?.backDriver ? image?.backDriver : `https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });



    // dispatch(AddProfile(formData, navigation))

    // formikActions.resetForm()
    formikActions.setSubmitting(false);


    setTimeout(() => {
    setload(false)

  }, 3000);


  }
  return (
    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>

    <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateDriverLicense}
            >

    <View
    style={styles.item}
    >
     {/* <View > */}
     <View style={{ position: 'absolute', top: 0, left: 0, padding: 10, paddingBottom: -10 }}>
  <IconButton
  icon={"arrow-left"
  }
  mode='outlined'
  onPress={() =>{

     navigation.navigate("Registration")}}>
    {/* <SvgIcon icon={'back'} width={30} height={30} /> */}

  </IconButton>
</View>
{/* // </View> */}
    <View>

  <Text style={styles.title}>Enter your recruiter's referral code</Text>
  <View style={styles.formCon}>

  <View style={styles.textBoxCon}>

<View style={styles.textCon}>
  <AppInput
    name="licenseNbr"
    placeholder="Referral code"
    style={styles.textInput}
    placeholderTextColor={'#aaa'}
  />
</View>
</View>







          </View>

    </View>

    </View>

    <View style={styles.loginCon2}>
            <LoginButton
              style={styles.LoginBtn2}
              loginBtnLbl={styles.loginBtnLbl2}
              btnName={"Done"}
            />
          </View>
            </CostomFormik>
    </KeyboardAwareScrollView>
  )
}

export default AgentReferralCode

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    margin: 0.5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
    padding: 20,
    // height: 'auto' // or you can remove the height property
   },
   mainCon: {
    // backgroundColor: '#fff',
    flex: 1,

  },

  title:{
    width:Dimensions.get("screen").width*0.8,
    fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'left',
          marginTop: 20,
          color:"#333540",
          paddingHorizontal:5,
          textAlign: 'center',

  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // marginTop: -50,
    width:Dimensions.get("window").width*0.8
  },
  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:20


  },
  textCon: {
    width: Dimensions.get("window").width*0.8,
    justifyContent: 'center',
    alignItems:'center'
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
  LoginBtn: {
    marginTop: 15,
    backgroundColor: "white", // Change background color to white
    borderRadius: 60,
    shadowColor: "black",
    borderColor: "#2df793", // Change border color to "#2df793"
    borderWidth: 2, // Add border width
    width: Dimensions.get("screen").width * 0.6,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#2df793',
    paddingVertical: 10,
  },
  loginCon: {

    justifyContent: 'center',
    alignItems:'center'
  },
  LoginBtn2: {
    marginTop: 15,
    // backgroundColor: "#2df793", // Change background color to white
    borderRadius: 60,
    shadowColor: "black",


    width: Dimensions.get("screen").width * 0.8,
    // justifyContent:"center"
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
    // marginTop:2,
    marginBottom:20
  }
})