import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
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
const initialValues = {
  firstName:'',
  lastName:'',
  dateNais:'',
  email:'',

};
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
const DriverLicense = () => {
  const user = useSelector(state=>state?.auth?.user)
  const [image, setImage] = useState(user?.avatar ? {uri:user?.avatar} : '');
  const [load, setload] = useState(false)
  const dispatch = useDispatch()
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
    formData.append('firstName', values.firstName);
    formData.append('latsName', values.lastName);
    formData.append('dateNais', date);

    formData.append('email', values?.email ? values.email : '');
    formData.append('avatar', {
      uri: image?.uri ? image?.uri : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}&background=0D8ABC&color=fff`,
      type: 'image/jpg',
      name: new Date()+ '_profile'
    });
    console.log(formData)


    // dispatch(AddProfile(formData, navigation))

    // formikActions.resetForm()
    formikActions.setSubmitting(false);

    // console.log(isLoading)
    setTimeout(() => {
    setload(false)

  }, 3000);


  }
  return (
    <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>

    <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleCreateProfile}
            >
    <View
    style={styles.item}
    >

    <View>

  <Text style={styles.title}>Driver License number</Text>
  <View style={styles.formCon}>

  <View style={styles.textBoxCon}>

<View style={styles.textCon}>
  <AppInput
    name="DriverLicenseNumber"
    placeholder=" License Number"
    style={styles.textInput}
    placeholderTextColor={'#aaa'}
  />
</View>
</View>







          </View>

          <Text
            style={{
              fontSize: 16,
              // fontWeight: 'bold',
              textAlign: 'left',
              // marginTop: 20,
              color:"#333540",
              paddingHorizontal:5
            }}
          >
            Smart card \ Temporary Driving License
          </Text>



    </View>

    </View>
    <View
    style={styles.item}
    >

    <View>

  <Text style={styles.title}>The front of driver's license</Text>
  <View style={styles.formCon}>

  <View style={styles.textBoxCon}>

<View style={styles.textCon}>
  <Image
  source={{
    uri:image? image?.uri:"https://png.pngtree.com/png-clipart/20220613/original/pngtree-women-driver-license-sign-png-image_7993559.png"
  }}
  style={{width:Dimensions.get("screen").width*0.4, height:Dimensions.get("screen").height*0.15}}
  resizeMode="contain"
  />
</View>
</View>
          </View>

          <View style={[styles.loginCon]}>

<ButtonCustom
style={styles.LoginBtn}
loginBtnLbl={styles.loginBtnLbl}
btnName={image ?"Edit Photo" : "Add a photo"}
onPress={selectPhotoTapped}
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
  source={{
    uri:image? image?.uri:"https://png.pngtree.com/png-clipart/20220613/original/pngtree-women-driver-license-sign-png-image_7993559.png"
  }}
  style={{width:Dimensions.get("screen").width*0.4, height:Dimensions.get("screen").height*0.15}}
  resizeMode="contain"
  />
</View>
</View>
          </View>

          <View style={[styles.loginCon]}>

<ButtonCustom
style={styles.LoginBtn}
loginBtnLbl={styles.loginBtnLbl}
btnName={image ?"Edit Photo" : "Add a photo"}
onPress={selectPhotoTapped}
/>
</View>



    </View>

    </View>
            </CostomFormik>
    </KeyboardAwareScrollView>
  )
}

export default DriverLicense

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
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
})