import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,Image,ScrollView, SafeAreaView,ImageBackground, TouchableOpacity,Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
    BarChart,
  } from "react-native-chart-kit";
import * as ScreenOrientation from 'expo-screen-orientation';
import {
    AdMobInterstitial,
    AdMobRewarded,
  } from 'expo-ads-admob';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements'
  

export default function Detail  ({route,navigation})  {
    
    let [fontsLoaded] = useFonts({
        'josefin': require('../../assets/JosefinSans-Medium.ttf'),
      });

    
    
    const [data,setData]=useState([]);
    const [deger,setValue]=useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [control, setControl] = useState(null);
    const [skin,setSkin]=useState([])
    const headAnimated= new Animated.Value(.7)
    const [kostum,setKostum] = useState(false)
    const [versions,setVersions] = useState("")
    const getChampionsDetail = () => {
        AsyncStorage.getItem('hero',(error,value) => {
            AsyncStorage.getItem('version', (errorr,version) => {
                setVersions(version)
                AsyncStorage.getItem('language', (errorrr,language) => {
                    if(!error){
                        setValue(value)
                        if(value !== null){
                            fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${value}.json`, {
                                method: 'GET',
                              
                                    }).then((response)=>response.json()).then((json)=>{setData(json.data),setnewData(data[deger]),setIsLoading(false),setControl(true) })
                                    .catch((err)=> {setIsLoading(false),setError(err)}
                                       );
                                   
                                };
                               
                                
                        }
                })
                
                
              
            })
            
            }
        );
    } 
   
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        
      }
    async function  odul () {
        await AdMobRewarded.setAdUnitID('ca-app-pub-7956816566156883/9819910150');
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
    } 
      async function normalYap() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
       
      }
   const gecis = async ()=> {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-7956816566156883/1548676078');
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        await AdMobInterstitial.showAdAsync(); 
    }

    const headAnimations = () => {
        Animated.timing(headAnimated,{
          toValue:1,
          duration:8000,
          useNativeDriver:false,
          
        }).start()
        
    };
    
        
        
       
        useEffect(() => {
            
            setIsLoading(true);
            getChampionsDetail();
           // gecis();
           
            
            
         },[] );
         useEffect(() => {
            headAnimations();
      
          })
         

         if (isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <ActivityIndicator size="large" color="#5500dc" />
              </View>
            );
         }
       
          if (error) {
            setControl(true)
            setError(false)
            
           return (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ fontSize: 18}}>
                 Error fetching data... Check your network connection!
              </Text>
            </View>
           );
         }
     
    if(kostum){
        // odul();
        changeScreenOrientation();
        
        

        const costum = data[deger].skins.map((value,index) => {
            skin.push(value.num)
            return(
                <View style={{
                    flex: 1,
                    flexDirection:'column',
                    justifyContent:'flex-end',
                }}  key={index}>
                    <Image 
                    style={{width:'100%',height:'100%',position:'absolute'}}    
                    resizeMode="cover" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${value.num}.jpg`}}>
                    </Image>
                    <Icon
                        style={{alignItems:'flex-start',zIndex:2,marginTop:hp('4%'),marginLeft:wp('4%'),width:hp('6%')}}
                        name='arrow-circle-left'
                        type='font-awesome'
                        color='white'
                        size={hp('6%')}
                        onPress={() => setKostum(false)} />
                   <View style={{alignItems:'center',zIndex:3,position:'relative',marginBottom:hp('2%'),}}>
                   <Text style={{color:'white', fontSize:hp('3%'),fontFamily:'josefin'
                 }}> {value.name=="default" ? deger : value.name}</Text>
                   </View>
                </View>             
            )
    });
        return(
            <Swiper showsButtons={true}  showsPagination={false}>
                {costum}
            </Swiper>
        )
    }
         
    if(control){
         data[deger].skins.map((value,index) => {
            skin.push(value.num) 
    });
       
        normalYap();
       

        const rol = data[deger].tags.map((index) => {
                const icon={"Assassin":require('../../assets/Assassin.png'),"Fighter":require('../../assets/Fighter.png'),
                "Mage":require('../../assets/Mage.png'),"Marksman":require('../../assets/Marksman.png'),
                "Support":require('../../assets/Support.png'),"Tank":require('../../assets/Tank.png')}
                var index1=""
                index=='Mage' ? index1 = 'Mage' : null
                index=='Assassin' ? index1 = 'Assasin' : null
                index=='Marksman' ? index1 = 'Marksman' : null
                index=='Support' ? index1 = 'Support' : null
                index=='Tank' ? index1 = 'Tank' : null
                index=='Fighter' ? index1 = 'Fighter' : null
                return(
                    <View key={index} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:hp('2%'),marginHorizontal:wp('3%')}} >
                            <Text style={{color:'white',fontSize:hp('2%'),fontFamily:'josefin'}} > {index1} </Text>
                            <Image style={{width:50,height:50}} resizeMode="stretch" source={icon[index]}></Image>
                    </View>
                    
                )
        });
        const datas = {
            labels: ["ATTACK", "DEFENSE", "MAGIC","DIFFUCULTY"],
            datasets: [
                {
                    data: [data[deger].info.attack*10, data[deger].info.defense*10, data[deger].info.magic*10,data[deger].info.difficulty*10]
                }
              ]
          };
          const dot = ()=> {
              return(
                  <View style={styles.dot}></View>
              )
          }

        
         if (!fontsLoaded) {
            return <AppLoading />
          } 
        else{
        return(
            <SafeAreaView style={styles.container}>
                   
                    <View style={styles.header}>
                    <Animated.Image 
                    style={{width:'100%',height:'100%', position:'absolute',
                borderBottomLeftRadius:wp('3%'),borderBottomRightRadius:wp('3%'), transform:[{scale:headAnimated}] }}    
                    resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_0.jpg`}}>

                    </Animated.Image>
                    <Icon
                        style={{alignItems:'flex-start',justifyContent:'flex-start',zIndex:2,marginTop:hp('4%'),marginLeft:wp('4%'),width:wp('8%')}}
                        name='arrow-circle-left'     
                        color='white'
                        size={wp('8%')}
                        type='font-awesome'
                        onPress={() => navigation.navigate('Home')} />
                    <TouchableOpacity onPress={()=> setKostum(true) } style={{marginRight:wp('2%')
                    ,marginBottom:hp('2%')  ,width:wp('25%') ,justifyContent:'center',alignItems: 'center',top:hp('13%'),left:wp('73%')}}>
                            <View style={{backgroundColor:'orange',borderRadius:wp('1%'),padding:wp('1%')}}>
                            <Text style={{color:'white',fontSize:hp('2%'),fontFamily:'josefin'}}>
                            Skins
                        </Text>
                            </View>
                        
                    </TouchableOpacity>
                    </View>
    
                    
                    
                    
                        <Swiper activeDotColor="white" dot={dot()}  style={styles.wrapper} >
                            <ScrollView style={{flex:1}}  >
                                <ImageBackground 
                                    style={{width:'100%',height:'100%',position:'absolute',opacity:0.3}} 
                                    resizeMode="cover"
                                    source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${skin[skin.length-1]}.jpg`}}

                                >

                                </ImageBackground>
                                <View style={styles.info}>
                                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:hp('2.1%'),fontFamily:'josefin',}}>{data[deger].name} </Text>
                                        <Text style={{color:'white',fontSize:hp('1.5%'),fontFamily:'josefin',}}> a.k.a  </Text>
                                        <Text style={{color:'white',fontSize:hp('2.1%'),fontFamily:'josefin',}}>{data[deger].title} </Text>
                                        </View>
                                    
                                        <View style={{flexDirection:'row'}}>
                                        {rol}
                                        </View>
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'aqua' ,fontFamily:'josefin',textDecorationLine:'underline',fontSize:hp('2%')}}>Story</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%'),fontFamily:'josefin'}}> {data[deger].lore} </Text>
                                        </View>
                                        
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'#7FFF00' ,fontFamily:'josefin',textDecorationLine:'underline',fontSize:hp('2%')}}>If You Play</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%'),fontFamily:'josefin'}}> {data[deger].allytips} </Text>
                                        </View>
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'orange',fontFamily:'josefin',textDecorationLine:'underline',fontSize:hp('2%')}}>If Againist to Play</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%'),fontFamily:'josefin'}}> {data[deger].enemytips} </Text>
                                        </View>

                                </View>
                                
                            </ScrollView>

                            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <ImageBackground 
                                    style={{width:'100%',height:'100%',position:'absolute',opacity:0.3}} 
                                    resizeMode="cover"
                                    source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${skin[skin.length-2]}.jpg`}}

                                >

                                </ImageBackground>
                                <BarChart
                                   
                                    data={datas}
                                    width={wp('100%')}
                                    height={hp('60%')}
                                    withHorizontalLabels={false}
                                    fromZero={true}
                                    withInnerLines={false}
                                    chartConfig={{

                                        
                                        backgroundGradientToOpacity:.5,
                                        backgroundGradientFrom: "#251298",
                                        backgroundGradientTo: "#981225",
                                        backgroundGradientFromOpacity: .1,
                                        fillShadowGradientOpacity:.7,
                                                                            
                                         color: (opacity = .1) => `rgba(255, 255, 255, ${opacity})`,
                                         labelColor: (opacity = .1) => `rgba(255, 255, 255, ${opacity})`,
                                       
                                        
                                    }}
                                    
                                    />
                                
                            </View>
                            <ScrollView style={{flex:1}}>
                            <ImageBackground 
                                    style={{width:'100%',height:'100%',position:'absolute',opacity:0.3}} 
                                    resizeMode="cover"
                                    source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${skin[skin.length-3]}.jpg`}}

                                >

                                </ImageBackground>
                                        <View style={{marginTop:hp('3%'),padding:wp('2.5%')}}>
                                        
                                            <View style={{flexDirection:'row',width:wp('96%'),alignItems:'center',height:hp('15%'),justifyContent:'space-around'}}>
                                               
                                                <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/passive/${data[deger].passive.image.full}`}} ></Image>
                                                <View style={[styles.skills,{justifyContent:'center'}]}>
                                                <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> Pasif </Text>
                                                </View>
                                                <View style={[styles.skills,{justifyContent:'center'}]}>
                                                <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].passive.name} </Text>
                                                </View>
                                                <View style={[styles.skills,{justifyContent:'center'}]}>
                                                <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> {data[deger].name} </Text>
                                                </View>
                                                
                                            </View>
                                            <Text style={[styles.specsText,{fontFamily:'josefin',textAlign:'justify'}]}> {data[deger].passive.description} </Text>
                                        </View>
                                        <View style={{marginTop:hp('3%'),padding:wp('2.5%')}}>
                                        
                                            <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('96%'),alignItems:'center',height:hp('15%')}}>
                                                <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[0].id}.png`}} ></Image>
                                                <View style={[styles.skills]}>
                                                <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> Q </Text>
                                                <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[0].name} </Text>
                                                </View>
                                                
                                                <View style={[styles.skills]}>
                                                <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Bekleme Süresi</Text>
                                                <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[0].cooldownBurn} </Text>
                                                </View>
                                                <View style={styles.skills}>
                                                <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Menzil</Text>
                                                <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[0].rangeBurn} </Text>
                                                </View>
                                                
                                                
                                                
                                            </View>
                                            <Text style={[styles.specsText,{fontFamily:'josefin',textAlign:'justify'}]}> {data[deger].spells[0].description} </Text>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}> Mana Bedeli : {data[deger].spells[0].costBurn} </Text>
                                            
                                        </View>
                                        <View style={{marginTop:hp('3%'),padding:wp('2.5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('96%'),alignItems:'center',height:hp('15%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[1].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> W </Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[1].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills]}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[1].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Menzil</Text>
                                            <Text  style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[1].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={[styles.specsText,{fontFamily:'josefin',textAlign:'justify'}]}> {data[deger].spells[1].description} </Text>
                                        <Text style={[styles.specsText,{fontFamily:'josefin'}]}> Mana Bedeli : {data[deger].spells[1].costBurn} </Text>
                                        
                                    </View>
                                    <View style={{marginTop:hp('3%'),padding:wp('2.5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('96%'),alignItems:'center',height:hp('15%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[2].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> E </Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[2].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills]}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[2].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Menzil</Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[2].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={[styles.specsText,{fontFamily:'josefin',textAlign:'justify'}]}> {data[deger].spells[2].description} </Text>
                                        <Text style={[styles.specsText,{fontFamily:'josefin'}]}> Mana Bedeli : {data[deger].spells[2].costBurn} </Text>
                                        
                                    </View>
                                    <View style={{marginTop:hp('3%'),padding:wp('2.5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('96%'),alignItems:'center',height:hp('15%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[3].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin',color:'orange'}]}> R </Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[3].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills]}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[3].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={[styles.specsText,{fontFamily:'josefin'}]}>Menzil</Text>
                                            <Text style={[styles.specsText,{textAlign:'center',fontFamily:'josefin'}]}> {data[deger].spells[3].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={[styles.specsText,{fontFamily:'josefin',textAlign:'justify'}]}> {data[deger].spells[3].description} </Text>
                                        <Text style={[styles.specsText,{fontFamily:'josefin'}]}> Mana Bedeli : {data[deger].spells[3].costBurn} </Text>
                                        
                                    </View>
                            </ScrollView>
                            
                                
                        </Swiper>
                        
                  
    
            </SafeAreaView>
        )
      }
    
    } 
  
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    

}

const styles=StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:'black',
        
    },
    left:{
        width:'20%',
        marginTop:'10%'
    },
   
    header:{
        width:'100%',
        height:'25%'
    },
    info:{
        flex:1,
        
        marginHorizontal:'2%',
        marginVertical:'2%',
        alignItems:'center',justifyContent:'center',
        padding:wp('3%'),
       
        
        
    },
    wrapper:{},
    specs :{
        flexDirection:'column',alignItems:'center'
    },
    specsText:{
        color:'white',
        fontSize:hp('1.9%'),
        marginBottom:hp('1.5%'),
        textAlign:'center',
        marginVertical:hp('1%')
       
        
    },
    stats:{
        flexDirection:'row',
        justifyContent:'space-between'
    },skills
    :{
        width:wp('25%'),
        height:hp('15%'),
        justifyContent:'space-between',
        padding:wp('1.5%'),
        alignItems:'stretch'
    },
    dot:{
        width:wp('3%'),height:hp('1%'), backgroundColor:'orange',borderRadius:wp('1%')
    }
})
