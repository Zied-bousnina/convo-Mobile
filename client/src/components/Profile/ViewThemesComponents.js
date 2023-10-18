import React, { useCallback, useEffect, useState } from 'react'
import {Text,View,StyleSheet,Image,TouchableOpacity,StatusBar,ScrollView, Touchable, FlatList, Pressable, useColorScheme, Dimensions} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Animated } from 'react-native';


import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { get, save } from '../../Storage'
import { Colors } from '../../theme'
import Logo from '../svg/LOGO'
import StatisticsCiomponent from '../Admin/Dashboard/StatisticsCiomponent'
import RecentsCompoennts from '../User/Dashboard/RecentsCompoennts'







const ViewThemeComponents = () =>{

  const user = useSelector(state=>state?.auth?.user)
  const profile = useSelector(state=>state?.profile?.profile)
  const navigation = useNavigation()
  const [activeButton, setActiveButton] = useState("statistics");
  console.log("Home components: ligne 15",user)

    // ------------------ Theme ------------------
    const [themeValue, setThemeValue] = useState('');
    const [initialValue, setInitialValue] = useState(0);
    const themes = useColorScheme();
    
  
    const themeOperations = theme => {
      switch (theme) {
        case 'dark':
          setTheme(theme, false);
          setInitialValue(2);
          return;
        case 'theme1':
          setTheme(theme, false);
          setInitialValue(2);
          return;
        case 'theme2':
          setTheme(theme, false);
          setInitialValue(2);
          return;
        case 'theme3':
          setTheme(theme, false);
          setInitialValue(2);
          return;
        case 'theme4':
          setTheme(theme, false);
          setInitialValue(2);
          return;
        case 'light':
          setTheme(theme, false);
          setInitialValue(1);
          return;
        case 'default':
          setTheme(themes, true);
          setInitialValue(3);
          return;
      }
    };
  
    const getAppTheme = useCallback(async () => {
      const theme = await get('Theme');
      console.log('storage', theme)
      const isDefault = await get('IsDefault');
      isDefault ? themeOperations('default') : themeOperations(theme);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const setTheme = useCallback(async (theme, isDefault) => {
      save('Theme', theme);
      save('IsDefault', isDefault);
      console.log('storage', theme)
      setThemeValue(theme);
      console.log('storage', theme)
    }, []);
  
    useEffect(() => {
      getAppTheme();
    }, [getAppTheme]);
  
    // const styles = styling(themeValue);
  
    // ------------------End theme-----------------------
  const color1= themeValue ==='theme1'? Colors['theme1']?.gradient?.color1:
  themeValue ==='theme2'? Colors['theme2']?.gradient?.color1: 
   themeValue ==='theme2'? Colors['theme2']?.gradient?.color1: 
   themeValue ==='theme3'? Colors['theme3']?.gradient?.color1:  
   Colors['theme4']?.gradient?.color1
  const color2=  themeValue ==='theme1'? Colors['theme1']?.gradient?.color2:
  themeValue ==='theme2'? Colors['theme2']?.gradient?.color2: 
   themeValue ==='theme2'? Colors['theme2']?.gradient?.color2: 
   themeValue ==='theme3'? Colors['theme3']?.gradient?.color2:  
   Colors['theme4']?.gradient?.color2
  const colors=[color1,color2]
  console.log("colors-------------------------------",color1, color2)
    return (
        
        <ScrollView
        style={{backgroundColor:'#f4f6fc'}}
        
        >
          <View style={{flex:1}} >
            
            {/* Statusbar */}
            <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
            {/* Header section */}
            {/* <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']} style={{flex:1.2,flexDirection:'column'}} > */}
            {/* <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#3f2e4e','#622d48']} style={{flex:1.2,flexDirection:'column'}} > */}
            {/* <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]}  colors={['#aa076b','#61045f']} style={{flex:1.2,flexDirection:'column'}} > */}
            <LinearGradient start={{x:0.0,y:0.4}} end={{x:1.2,y:0.7}} location={[0,1]} colors={colors} style={{flex:1.2,flexDirection:'column'}} >
                <View style={{flexDirection:'column',marginTop:hp('8%'),paddingHorizontal:'5%'}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}} >
                    {/* Welcome message and name */}
                    <View 
                    style={{
                      marginBottom:hp('-12%'),
                      marginTop:hp('-18%'),
                      // marginLeft:hp('-1%')
                    }}
                    
                     >
                    <Logo
                    width={Dimensions.get('window').width*0.6}
                    height={Dimensions.get('window').height*0.4}
                    />
                        {/* <Text style={{fontFamily:'Roboto-Medium',color: Colors[themeValue]?.whiteWhite,fontSize:22}} >{user.name}</Text> */}
                    </View>
                    {/* Bell icon and profile pic */}
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <Icon name='bell' size={30} color="#fff" />
                        <Pressable
                        onPress={()=>navigation.navigate('profile')}
                        >
                          

                        <Image source={{uri: profile?.avatar ? profile.avatar : `https://ui-avatars.com/api/?name=${user?.name}+${user?.name}`}} resizeMode='cover' style={{width:40,height:40,borderRadius:20,marginLeft:15}} />
                        </Pressable>
                    </View>
                </View>

                
                {/* amount  */}
                <View style={{flexDirection:'row',marginTop:25,justifyContent:'space-between',alignItems:'center'}} >
                        {/* Amount */}
                        {/* <View style={{flexDirection:'column'}} >
                            <Text style={{color: Colors[themeValue]?.black,fontSize:28,fontFamily:'Roboto-Bold'}} >$32,7456.68</Text>
                            <Text style={{color:'rgba(255,255,255,0.3)',fontFamily:'Roboto-Regular-Italic',fontSize:14}} >Updated 2 mins ago</Text>
                        </View> */}
                        
                        {/* profit loss indicator */}
                        {/* <ProfitIndicator type="I" percentage_change={dummyData.portfolio.changes} />             */}
                </View>
            </View>

            </LinearGradient>
            
            {/* Body section */}
            <View style={{flex:2.5,backgroundColor:Colors[themeValue]?.backgroundColor,paddingHorizontal:wp('5%')}} >
                {/* Action Center */}
                <View style={{flexDirection:'row',backgroundColor:Colors[themeValue]?.backgroundColorActionCenter,height:hp('13%'),width:'100%',alignItems:'center',justifyContent:'space-around',borderRadius:10,borderWidth:1,borderColor:'rgba(255,255,255,0.1)',elevation:10,shadowColor:'#000',shadowRadius:10,marginTop:-25}} >

                    {/* <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity> */}
        <View 
        onPress={() => setActiveButton('statistics')}
        style={{flexDirection:'column',alignItems:'center'}} >
            {/* <Image style={{height:60,width:60}} source={img_src} /> */}
            <Icon name='line-chart'
            size={30}
      color= {Colors[themeValue]?.icon}
            />
            <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color: Colors[themeValue]?.black}} >statistics </Text>
        </View>

                    {/* <ActionCenter img_src={require('../../assets/icons/top-up.png')} img_text="Top-Up" />
                     */}
                      <View
                      onPress={() => setActiveButton('map')}
                       style={{flexDirection:'column',alignItems:'center'}} >
            {/* <Image style={{height:60,width:60}} source={img_src} /> */}
            <Icon name='map-marker'
            size={30}
            color= {Colors[themeValue]?.icon}
            />
            <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color: Colors[themeValue]?.black}} >Map </Text>
        </View>
        <View 
        onPress={() => setActiveButton('recents')}
        style={{flexDirection:'column',alignItems:'center'}} >
            {/* <Image style={{height:60,width:60}} source={img_src} /> */}
            <Icon name='history'
            size={25}
            color= {Colors[themeValue]?.icon}
            />
            <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color: Colors[themeValue]?.black}} >Recents </Text>
        </View>

                    
                </View>
        

                {/* My Assets */}
                <View style={{flexDirection:'column'}} >
                  
                
                </View>

                {/* Market */}
                <View style={{flex:1,flexDirection:'column'}} >
                    {/* market text */}
                    <Text style={{fontFamily:'Roboto-Bold',fontSize:27,color:Colors[themeValue]?.gray3}} >test</Text>
                    {activeButton === 'statistics' && <StatisticsCiomponent/>}
            {/* {activeButton === 'map' && <MapCompoennts/>} */}
            {activeButton === 'recents' && <RecentsCompoennts/>}

                    

                </View>
                


            </View>
            
        </View>
        </ScrollView>
    );
}

export default ViewThemeComponents

const styles = StyleSheet.create({
    
})


