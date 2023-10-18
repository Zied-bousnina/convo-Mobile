import { View, Text, Pressable, ScrollView, Modal, TextInput, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import BackSvg from '../svg/BackSvg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  
  TouchableRipple,
} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteaccount, resendOTPDeleteAccount } from '../../redux/actions/authActions';
// import { resendOtp } from '../../redux/actions/authActions';
const AccountComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setindex] = useState(0) 
  const state = useSelector(state=>state)
  const [otp, setotp] = useState('')
  const user = useSelector(state => state?.auth?.user)
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const resendOTP = () => {
    console.log(user?.email)
    dispatch(resendOTPDeleteAccount({email:user?.email}))
  };
  
  
  const hanndleDeleteAccount = (code)=> {
    const userData = {
      userId:user?.id,
      otp: code,
    };
    console.log(userData)
    dispatch(deleteaccount(userData, navigation))

  }
  
  

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.loginLbl}>Enter OTP?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                An 4 digit code has been sent to
              </Text>
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
                // console.log(code)
                }
                // clearInputs

                
              />
              <Pressable onPress={ resendOTP}>
                <Text style={styles.registerLbl}>Resend OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
          {/* -------------------------end---------------------------------- */}
              <Pressable
              style={[styles.button, styles.buttonClose]}
              // disabled= {Bio.length ? false : true}
              
              
              onPress={ ()=>{}}

              >
              <Text style={{color:"white"}} >Delete account</Text>
            </Pressable>
            <Text
            style={{fontSize:10}}
            >You have to click twice {index ? index: ''}</Text>
            <Pressable
            style={{ position: "absolute", top: 10, left: 10 }}
              // style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" color="red" size={20}/>
            </Pressable>
          </View>
        </View>
      </Modal>
       {/* <Pressable 
       style={{
        margin:10
       }}
       onPress={
            () => navigation.goBack(null)
          }>
       
            <BackSvg
              width={31}
              height={31}
            />
          </Pressable> */}
    <ScrollView>
      
    {/* <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                source={{
                  // uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                  uri: profile?.avatar ? profile.avatar : 'https://api.adorable.io/avatars/80/abott@adorable.png',
                }}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>{profile?.user?.name}</Title>
                <Caption style={styles.caption}>{profile?.user?.name}</Caption>
              </View>
            </View>
          </View> */}
    
          {/* <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#0057ff" size={20}/>
              <Text style={{color:"#777777", marginLeft: 20}}>{profile?.country}, {profile?.city}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#0057ff" size={20}/>
              <Text style={{color:"#777777", marginLeft: 20}}>{profile?.tel}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#0057ff" size={20}/>
              <Text style={{color:"#777777", marginLeft: 20}}>{profile?.user?.email}</Text>
            </View>
          </View> */}
    
          {/* <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox, {
                borderRightColor: '#dddddd',
                borderRightWidth: 1
              }]}>
                <Title>Bio</Title>
                <Caption>{profile?.bio}</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>12</Title>
                <Caption>Orders</Caption>
              </View>
          </View>
     */}
          <View style={styles.menuWrapper}>
          {/* <TouchableRipple onPress={() => navigation.navigate("Account")}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="key" color="#0057ff" size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:-25 }}>
      <Text style={styles.menuItemText}>Request account info </Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >Delete account, Request account info</Caption>
    </View>
  </View>
</TouchableRipple> */}
<TouchableRipple onPress={() => {
  resendOTP()
  setModalVisible(true)
  }}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="delete" color="#0057ff" size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:-25 }}>
      <Text style={styles.menuItemText}>Delete my account</Text>
      <Caption
      style={{
        marginLeft:30,
        marginBottom:30
      }}
      >Create, edit, profile photo</Caption>
    </View>
  </View>
</TouchableRipple>
{/* <TouchableRipple onPress={() => {}}>
  <View style={[styles.menuItem, { flexDirection: 'row' }]}>
    <Icon name="help-circle-outline" color="#0057ff" size={25} />
    <View style={{ flexDirection: 'column', marginLeft: 0, marginBottom:-25 }}>
      <Text style={styles.menuItemText}>Help</Text>
      <Caption
      style={{
        marginLeft:30
      }}
      >Help center, contact us, privacy policy</Caption>
    </View>
  </View>
</TouchableRipple> */}
           
          </View>
    </ScrollView>
        </SafeAreaView>
  )
}

export default AccountComponent
const styles = StyleSheet.create({
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