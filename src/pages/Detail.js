import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Alert, ActivityIndicator,Image, Easing,ScrollView, SafeAreaView,ImageBackground, TouchableOpacity,Animated, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import Swiper from 'react-native-swiper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import {
    
    BarChart,
    PieChart,
    ProgressChart,
   
    StackedBarChart
  } from "react-native-chart-kit";
import * as ScreenOrientation from 'expo-screen-orientation';
import { version } from 'react/cjs/react.development';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';


export default function Detail  ({route,navigation})  {
    


    
    
    const [data,setData]=useState([]);
    const [newData,setNewData]=useState([]);
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
                console.log('sadsad',value)
                if(!error){
                    setValue(value)
                    if(value !== null){
                        fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/tr_TR/champion/${value}.json`, {
                            method: 'GET',
                          
                                }).then((response)=>response.json()).then((json)=>{setData(json.data); setnewData(data[deger]);  setIsLoading(false),setControl(true) })
                                .catch((err)=> {setIsLoading(false),setError(err)}
                                   );
                               
                            };
                           
                            
                    }
            })
            
            }
        );
    } 
   
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        
      }
    async function  odul () {
        await AdMobRewarded.setAdUnitID('ca-app-pub-7956816566156883/9819910150'); // Test ID, Replace with your-admob-unit-id
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
    } 
      async function normalYap() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
       
      }
      gecis = async ()=> {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-7956816566156883/1548676078'); // Test ID, Replace with your-admob-unit-id
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
            gecis();
            
            
            
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
            console.log("dsfsdfsdf",data)
           return (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ fontSize: 18}}>
                 Error fetching data... Check your network connection!
              </Text>
            </View>
           );
         }

       

        // const renderItem= ({item}) => {
            
        //     return(
        //             <View style={{flex:1}}>
        //                     <Image 
        //         style={{width:'80%',height:'80%'}}    
        //         resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${item.num}.jpg`}}>

        //         </Image>
        //             </View>
                    
                
                
        //       )
        //     }

       
    if(kostum){
        odul();
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
                   <TouchableOpacity onPress={()=> setKostum(false)} style={{flex:1,position:'relative',alignItems:'flex-start',justifyContent:'flex-start',zIndex:2,margin:wp('4%')}}>
                   <Image style={{width:hp('4%'),height:wp('8%')}} source={require('../../assets/back.png')}>

                            </Image>
                   </TouchableOpacity>
                   <View style={{alignItems:'center',zIndex:3,position:'relative',marginBottom:hp('2%'),}}>
                   <Text style={{color:'white', fontSize:hp('3%'),
                 }}> {value.name=="default" ? deger:value.name  } </Text>
                   </View>

                    
                </View>
                
                
            )
    });
        return(
            <Swiper>
                {costum}
            </Swiper>
        )
    }
         
    if(control){

         data[deger].skins.map((value,index) => {
            skin.push(value.num)
           
    });
       
        normalYap();
        console.log('*****',skin.length)

        const rol = data[deger].tags.map((index) => {
                const icon={"Assassin":require('../../assets/Assassin.png'),"Fighter":require('../../assets/Fighter.png'),
                "Mage":require('../../assets/Mage.png'),"Marksman":require('../../assets/Marksman.png'),
                "Support":require('../../assets/Support.png'),"Tank":require('../../assets/Tank.png')}
                var index1=""
                index=='Mage' ? index1='Büyücü' : null
                index=='Assassin' ? index1='Suikastçi' : null
                index=='Marksman' ? index1='Nişancı' : null
                index=='Support' ? index1='Destek' : null
                index=='Tank' ? index1='Tank' : null
                index=='Fighter' ? index1='Dövüşçü' : null
                return(
                    <View key={index} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:hp('2%'),marginHorizontal:wp('3%')}} >
                            <Text style={{color:'white',fontSize:hp('2%')}} > {index1} </Text>
                            <Image style={{width:50,height:50}} resizeMode="stretch" source={icon[index]}></Image>
                    </View>
                    
                )
        });
        const datas = {
            labels: ["SALDIRI", "SAVUNMA", "BÜYÜ","ZORLUK"], // optional
            datasets: [
                {
                    data: [data[deger].info.attack*10, data[deger].info.defense*10, data[deger].info.magic*10,data[deger].info.difficulty*10]
                }
              ]
          };

        

        return(
            <SafeAreaView style={styles.container}>
                    <StatusBar style="auto" ></StatusBar>
                    <View style={styles.header}>
                    <Animated.Image 
                    style={{width:'100%',height:'100%', position:'absolute',
                borderBottomLeftRadius:wp('3%'),borderBottomRightRadius:wp('3%'), transform:[{scale:headAnimated}] }}    
                    resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_0.jpg`}}>

                    </Animated.Image>
                    <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={{flex:1,position:'relative',alignItems:'flex-start',justifyContent:'flex-start',zIndex:2,margin:wp('4%')}}>
                   <Image style={{width:hp('4%'),height:wp('8%')}} source={require('../../assets/back.png')}>

                            </Image>
                   </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setKostum(true) } style={{flex:1,alignItems:'flex-end',position:'relative',justifyContent:'flex-end', marginRight:wp('2%')
                    ,marginBottom:hp('2%')    }}>
                            <View style={{backgroundColor:'tomato',borderRadius:wp('1%')}}>
                            <Text style={{color:'white',fontSize:hp('2%')}}>
                            Kostümler
                        </Text>
                            </View>
                        
                    </TouchableOpacity>
                    </View>
    
                    
                    
                    
                        <Swiper showsButtons={true} style={styles.wrapper} >
                            <ScrollView style={{flex:1}}  >
                                <ImageBackground 
                                    style={{width:'100%',height:'100%',position:'absolute',opacity:0.3}} 
                                    resizeMode="cover"
                                    source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${skin[skin.length-1]}.jpg`}}

                                >

                                </ImageBackground>
                                <View style={styles.info}>
                                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                        <Text style={{color:'white',fontSize:hp('2.5%'),fontWeight:'bold',}}>{data[deger].name} </Text>
                                        <Text style={{color:'white',fontSize:hp('1.5%'),fontWeight:'bold',}}> a.k.a  </Text>
                                        <Text style={{color:'white',fontSize:hp('2.5%'),fontWeight:'bold',}}>{data[deger].title} </Text>
                                        </View>
                                    
                                        <View style={{flexDirection:'row'}}>
                                        {rol}
                                        </View>
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'aqua' ,fontWeight:'bold',textDecorationLine:'underline',fontSize:hp('2%')}}>Hikaye</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%')}}> {data[deger].lore} </Text>
                                        </View>
                                        
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'#7FFF00' ,fontWeight:'bold',textDecorationLine:'underline',fontSize:hp('2%')}}>Sen Oynuyorsan</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%')}}> {data[deger].allytips} </Text>
                                        </View>
                                        <View style={{alignItems:'center',marginTop:hp('2%')}}>
                                            <Text style={{color:'orange',fontWeight:'bold',textDecorationLine:'underline',fontSize:hp('2%')}}>Rakip Oynuyorsa</Text>
                                        <Text style={{color:'white',textAlign:'justify',fontSize:hp('2%'),marginTop:hp('2%')}}> {data[deger].enemytips} </Text>
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
                                        <View style={{marginTop:hp('3%'),padding:wp('5%')}}>
                                        
                                            <View style={{flexDirection:'row',width:wp('100%'),alignItems:'center'}}>
                                               
                                                <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/passive/${data[deger].passive.image.full}`}} ></Image>
                                                <Text style={[styles.specsText,{width:wp('25%')}]}> Pasif </Text>
                                                <Text style={[styles.specsText,{width:wp('25%'),textAlign:'auto'}]}> {data[deger].passive.name} </Text>
                                                <Text style={{width:wp('25%'),fontSize:hp('1.5%'),fontWeight:'bold',color:'tomato',textAlign:'center'}}> {data[deger].name} </Text>
                                                
                                            </View>
                                            <Text style={styles.specsText}> {data[deger].passive.description} </Text>
                                        </View>
                                        <View style={{marginTop:hp('3%'),padding:wp('5%')}}>
                                        
                                            <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('100%')}}>
                                                <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[0].id}.png`}} ></Image>
                                                <View style={styles.skills}>
                                                <Text style={styles.specsText}> Q </Text>
                                                <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[0].name} </Text>
                                                </View>
                                                
                                                <View style={[styles.skills],{width:wp('30%')}}>
                                                <Text style={styles.specsText}>Bekleme Süresi</Text>
                                                <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[0].cooldownBurn} </Text>
                                                </View>
                                                <View style={styles.skills}>
                                                <Text style={styles.specsText}>Menzil</Text>
                                                <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[0].rangeBurn} </Text>
                                                </View>
                                                
                                                
                                                
                                            </View>
                                            <Text style={styles.specsText}> {data[deger].spells[0].description} </Text>
                                            <Text style={styles.specsText}> Mana Bedeli : {data[deger].spells[0].costBurn} </Text>
                                            
                                        </View>
                                        <View style={{marginTop:hp('3%'),padding:wp('5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('100%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[1].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}> W </Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[1].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills],{width:wp('30%')}}>
                                            <Text style={styles.specsText}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[1].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}>Menzil</Text>
                                            <Text  style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[1].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={styles.specsText}> {data[deger].spells[1].description} </Text>
                                        <Text style={styles.specsText}> Mana Bedeli : {data[deger].spells[1].costBurn} </Text>
                                        
                                    </View>
                                    <View style={{marginTop:hp('3%'),padding:wp('5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('100%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[2].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}> E </Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[2].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills],{width:wp('30%')}}>
                                            <Text style={styles.specsText}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[2].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}>Menzil</Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[2].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={styles.specsText}> {data[deger].spells[2].description} </Text>
                                        <Text style={styles.specsText}> Mana Bedeli : {data[deger].spells[2].costBurn} </Text>
                                        
                                    </View>
                                    <View style={{marginTop:hp('3%'),padding:wp('5%')}}>
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-around',width:wp('100%')}}>
                                            <Image resizeMode="stretch" style={{width:wp('14%'),height:hp('8%'),borderRadius:10}}  source={{uri:`http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[3].id}.png`}} ></Image>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}> R </Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[3].name} </Text>
                                            </View>
                                            
                                            <View style={[styles.skills],{width:wp('30%')}}>
                                            <Text style={styles.specsText}>Bekleme Süresi</Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[3].cooldownBurn} </Text>
                                            </View>
                                            <View style={styles.skills}>
                                            <Text style={styles.specsText}>Menzil</Text>
                                            <Text style={[styles.specsText,{textAlign:'auto'}]}> {data[deger].spells[3].rangeBurn} </Text>
                                            </View>
                                            
                                            
                                            
                                        </View>
                                        <Text style={styles.specsText}> {data[deger].spells[3].description} </Text>
                                        <Text style={styles.specsText}> Mana Bedeli : {data[deger].spells[3].costBurn} </Text>
                                        
                                    </View>
                            </ScrollView>
                            
                                
                        </Swiper>
                        
                  
    
            </SafeAreaView>
        )
    
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
        fontSize:hp('2%'),
        fontWeight:'bold',
        marginBottom:hp('1.5%'),
        textAlign:'justify',
        marginVertical:hp('1%')
       
        
    },
    stats:{
        flexDirection:'row',
        justifyContent:'space-between'
    },skills
    :{
        flexDirection:'column',width:wp('25%')
    }
})
