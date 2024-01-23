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
import { AddDriverDoc_DriverLicence } from '../../../redux/actions/userActions'
import AppLoader from '../../../components/Animations/AppLoader'
import { FAB, IconButton } from 'react-native-paper'
const initialValues = {
  // licenseNbr:'',
  // dateExp:'',


};
const validationSchema = yup.object({
  // licenseNbr: yup
  //   .string()
  //   .trim()

  //   .required("License number is required")
  //   .min(12)
  //   .max(12)
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .label('License number'),


});
const DriverLicense = () => {
  const user = useSelector(state=>state?.auth?.user)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const isLoad = useSelector(state=>state?.isLoading?.isLoading)
  const [image, setImage] = useState({
    permisConduirefrontCard:'',
    permisConduirebackCard:'',
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

    formData.append('permisConduirefrontCard', {
      uri: image?.permisConduirefrontCard ? image?.permisConduirefrontCard?.uri : `https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });

    formData.append('permisConduirebackCard', {
      uri: image?.permisConduirebackCard ? image?.permisConduirebackCard?.uri : `https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });



    dispatch(AddDriverDoc_DriverLicence(formData, navigation))

    // formikActions.resetForm()
    formikActions.setSubmitting(false);


    setTimeout(() => {
    setload(false)

  }, 3000);


  }
  return (
    <>
      <FAB
    icon="arrow-left"
    style={styles.fab}
    onPress={() => navigation.navigate("Registration")}
  />

    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>
{isLoad? <AppLoader /> : null}

    <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateDriverLicense}
            >

    <View
    style={styles.item}
    >
    {/* <View style={{ position: 'absolute', top: 0, left: 0, padding: 10, paddingBottom: -10 }}>
  <IconButton
  icon={"arrow-left"
  }
  mode='outlined'
  onPress={() =>{

     navigation.navigate("Registration")}}>


  </IconButton>
</View> */}

    <View>

  <Text style={styles.title}>The front of driver's license</Text>
  <View style={styles.formCon}>

  <View style={styles.textBoxCon}>

<View style={styles.textCon}>
  <Image
  // source={{
  //   uri:image.permisConduirefrontCard? image.permisConduirefrontCard?.uri:"https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png"
  // }}
  source={image.permisConduirefrontCard? {uri:image.permisConduirefrontCard?.uri}:require('../../../assets/images1/driveCard.png')}
  style={{width:Dimensions.get("screen").width*0.8, height:Dimensions.get("screen").height*0.3,marginVertical:-50}}
  resizeMode="contain"
  />
</View>
</View>
          </View>

          <View style={[styles.loginCon]}>

<ButtonCustom
style={styles.LoginBtn}
loginBtnLbl={styles.loginBtnLbl}
btnName={image.permisConduirefrontCard ?"Edit Photo" : "Add a photo"}
onPress={()=>selectPhotoTapped("permisConduirefrontCard")}
/>
</View>



    </View>

    </View>
    <View
    style={styles.item}
    >

    <View>

  <Text style={styles.title}>The back of driver's license</Text>
  <View style={styles.formCon}>

  <View style={styles.textBoxCon}>

<View style={styles.textCon}>
  <Image
  // source={
  //   {
  //   uri:image?.permisConduirebackCard? image?.permisConduirebackCard?.uri:"https://png.pngtree.com/png-clipart/20230824/original/pngtree-drivers-license-driver-card-id-picture-image_8407548.png"
  // }
  // }
  source={image.permisConduirebackCard? {uri:image.permisConduirebackCard?.uri}:require('../../../assets/images1/driveCard.png')}
  style={{width:Dimensions.get("screen").width*0.8, height:Dimensions.get("screen").height*0.3, marginVertical:-50}}
  resizeMode="contain"
  />
</View>
</View>
          </View>

          <View style={[styles.loginCon]}>

<ButtonCustom
style={styles.LoginBtn}
loginBtnLbl={styles.loginBtnLbl}
btnName={image?.permisConduirebackCard ?"Edit Photo" : "Add a photo"}
onPress={()=>selectPhotoTapped("permisConduirebackCard")}
/>
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
    </>
  )
}

export default DriverLicense

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
          // marginTop: 20,
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
    marginTop:-20,
    marginBottom:20
  }
})