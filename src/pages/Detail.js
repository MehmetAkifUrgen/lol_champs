import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Alert, ActivityIndicator,Image, FlatList,ScrollView, SafeAreaView,ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Detail  ({route,navigation})  {
    const veri="http://ddragon.leagueoflegends.com/cdn/11.8.1/data/tr_TR/champion/";
    
    const [data,setData]=useState([]);
    const [newData,setNewData]=useState([]);
    const [deger,setValue]=useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [control, setControl] = useState(null);
    const skin=[]
    
    const getChampionsDetail = () => {
        AsyncStorage.getItem('hero',(error,value) => {
            console.log('sadsad',value)
            if(!error){
                setValue(value)
                if(value !== null){
                    fetch(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/tr_TR/champion/${value}.json`, {
                        method: 'GET',
                      
                            }).then((response)=>response.json()).then((json)=>{setData(json.data); setnewData(data[deger]); setIsLoading(false),setControl(true) })
                            .catch((err)=> {setIsLoading(false),setError(err)}
                               );
                           
                        };
                       
                        
                }
            }
        );
    } 
        

        useEffect(() => {
            setIsLoading(true);
            getChampionsDetail();
            
            
            
         },[] );
         

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

       

        const renderItem= ({item}) => {
            
            return(
                    <View style={{flex:1}}>
                            <Image 
                style={{width:'80%',height:'80%'}}    
                resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${item.num}.jpg`}}>

                </Image>
                    </View>
                    
                
                
              )
            }

       
         
         
    if(control){

        const costum = data[deger].skins.map((value,index) => {
            skin.push(value.num)
            return(
                <View style={{

                    flex: 1,

                }}  key={index}>
                    <Image 
                    style={{width:'100%',height:'95%'}}    
                    resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${value.num}.jpg`}}>

                    </Image>

                    <Text style={{color:'white', fontSize:20 }}> {value.name=="default" ? deger:value.name  } </Text>
                </View>
                
                
            )
    });

        const rol = data[deger].tags.map((index) => {
                const icon={"Assassin":require('../../assets/Assassin.png'),"Fighter":require('../../assets/Fighter.png'),
                "Mage":require('../../assets/Mage.png'),"Marksman":require('../../assets/Marksman.png'),
                "Support":require('../../assets/Support.png'),"Tank":require('../../assets/Tank.png')}
                
                
                return(
                    <View key={index} style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:hp('2%')}} >
                            <Text style={{color:'white',fontSize:hp('2%')}} > {index} </Text>
                            <Image style={{width:50,height:50}} resizeMode="stretch" source={icon[index]}></Image>
                    </View>
                    
                )
        });

        return(
            <SafeAreaView style={styles.container}>
                    <StatusBar style="auto" ></StatusBar>
                    <View style={styles.header}>
                    <Image 
                    style={{width:'100%',height:'100%'}}    
                    resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_0.jpg`}}>

                    </Image>
                    </View>
    
                    
                    
                    
                        <Swiper style={styles.wrapper} >
                            <ScrollView style={{flex:1}} >
                                <ImageBackground 
                                    style={{width:'100%',height:'100%',position:'absolute',opacity:0.3}} 
                                    resizeMode="cover"
                                    source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${skin[skin.length-1]}.jpg`}}

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

                            <View>

                            </View>
                                
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
        alignItems:'center',justifyContent:'space-around'
        
        
    },
    wrapper:{}
})
