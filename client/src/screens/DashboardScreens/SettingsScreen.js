import { View, Text, Modal, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import UserDashboardScreen from './UserDashboardScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LogOut, deleteaccount, resendOTPDeleteAccount } from '../../redux/actions/authActions';
import fonts from '../../assets/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
const SettingsScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleLogOut= _ => {

    dispatch(
      LogOut()
    )


  }
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setindex] = useState(0)
  const state = useSelector(state=>state)
  const [otp, setotp] = useState('')
  const user = useSelector(state => state?.auth?.user)



  const resendOTP = () => {

    dispatch(resendOTPDeleteAccount({email:user?.email}))
  };


  const hanndleDeleteAccount = (code)=> {
    const userData = {
      userId:user?.id,
      otp: code,
    };

    dispatch(deleteaccount(userData, navigation))

  }
  return (
    <>

<View
  style={{
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width:Dimensions.get("screen").width,

  }}
>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {/* ----------------------begin------------------------------------- */}
          <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          {/* <Pressable onPress={handleGoBack}> */}
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
            {/* <BackSvg
              width={30}
              height={30}
              /> */}
          {/* </Pressable> */}
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon={'enterOtp'} width={280} height={280} /> */}
            {/* <EnterOtp
              width={280}
              height={280}
              /> */}
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Entrez OTP?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
              Un code à 4 chiffres a été envoyé à

              </Text>
              <TextInput
              style={{
                // height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 10,
                // marginBottom: 20,
                // paddingHorizontal: 10,
                color:"black"
              }}
              // editable = {false}

              // onChangeText={text => setotp(text)}
              // value={otp}
              // placeholder="OTP"
              keyboardType="numeric"
              value={"Si le clavier ne s'affiche pas, cliquez ici"}
              placeholderTextColor={"black"}

              // disabled={true}
            />
              <Text style={styles.forgotDesLbl}>{user?.email}</Text>

                { !state?.errors?.errors?.success
                  ? (
                    <Text style={{color:'red'}}>
                      {state?.errors?.errors?.error}

                    </Text>
                  )
                  : null
                }

            </View>

            <View style={styles.formCon}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                codeInputFieldStyle={{color: '#000'}}
                onCodeFilled={code =>hanndleDeleteAccount(code)

                }
                // clearInputs


              />
              <Pressable
                style={{
                  margin:20
                }}
               onPress={ resendOTP}>
                <Text style={styles.registerLbl}>Renvoyer OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
          {/* -------------------------end---------------------------------- */}
              {/* <Button
              style={{
                marginTop:20,


              }}
              mode="contained"



              onPress={ ()=>{

                resendOTP()
  setModalVisible(true)
              }}

              >
              <Text style={{color:"white"}} >Supprimer le compte
</Text>
            </Button> */}

            <Pressable
            style={{ position: "absolute", top: 10, left: 10 }}
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" color="red" size={20}/>
            </Pressable>
          </View>
        </View>
      </Modal>

  <Pressable
    onPress={handleLogOut}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>
        Log out
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
  <Pressable
    onPress={()=>{
      resendOTP()
  setModalVisible(true)
    }}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this line
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginLeft: 10, fontSize: 16, color: 'red' }}>
        Delete Account
      </Text>
    </View>
    <Icon1
      name="arrow-forward-ios"
      size={20}
      color={'black'}
    />
  </Pressable>
</View>
      {/* <UserDashboardScreen/> */}
    </>
  )
}

export default SettingsScreen
const styles = StyleSheet.create({
  circle: {
    width: 100, // You can adjust the size as needed
    height: 100,
    borderRadius: 50, // Half of the width and height to create a circle
    backgroundColor: '#e5f4fe',
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:500,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  // ------------------------------------------------------------
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: fonts.type.NotoSansRegular,
  },
  registerLbl: {color: '#0057ff', fontFamily: fonts.type.NotoSansSemiBold},
});