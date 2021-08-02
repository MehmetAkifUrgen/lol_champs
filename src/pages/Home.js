import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, TextInput,Image, FlatList,TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filter } from 'lodash';
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';

export default function App() {

  const navigation = useNavigation();
  const veri="http://ddragon.leagueoflegends.com/cdn/11.9.1/data/tr_TR/champion.json";
  const icon ="http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/";
  const [data,setData]=useState([])
  const [newData,setnewData]=useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [progress,setProgress]=useState(false);
  const startAnimated = new Animated.Value(0);
  const [version,setVersion] = useState([]);
  const opaAnimated=new Animated.Value(1)
  const [control,setControl]=useState(false)
  const [randoma,setRandom]=useState([])


 
  const getVersion = () => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json", {
    method: 'GET',
        }).then((response)=>response.json()).then((json)=>{setVersion(json),setControl(true) })
        .catch((err)=> {setIsLoading(false),
        setError(err)} );
        
    };
  

  const getChampionsName = () => {
    fetch(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/data/tr_TR/champion.json`, {
    method: 'GET',
        }).then((response)=>response.json()).then((json)=>{setData(json.data); setnewData(json.data), setIsLoading(false) ,setControl(true) })
        .catch((err)=> {setIsLoading(false),
        setError(err)} );
        
    };
   
    
    const startAnimations = () => {
        Animated.timing(startAnimated,{
          toValue:360,
          duration:1000,
          useNativeDriver:false,
          easing:Easing.elastic(10)
        }).start()
    };
    const opaAnimations = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opaAnimated,{
            toValue:.3,
            duration:3000,
            useNativeDriver:false,
          
            
          }),
          Animated.timing(opaAnimated,{
            toValue:1,
            duration:3000,
            useNativeDriver:false,
           
          })
        ]),
        
      ).start()
     
  };
     const startInterpolate = startAnimated.interpolate({
       inputRange:[0,360],
       outputRange:['0deg','360deg']
     })
     const rotateStyles = {
       transform:[{
         rotate:startInterpolate
       }]
     }

    useEffect(() => {
      getVersion();
      setIsLoading(true);

      if ( version[0] != null ){
        
        getChampionsName()
      }
      
     
     
   },[control] );

    useEffect(() => {
      startAnimations();
      opaAnimations();

    })

   
    if (isLoading) {
      
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
       </View>
     );
  }

   if (error) {
      getChampionsName()
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
    // console.log("*****",Object.values(data).length )
    // console.log('--------',version[0])
    
    const costum = Object.values(data).map((value,index) => {
      
      return(
          <View style={{flexDirection:'row',flex:1}} key={index}>
                <Animated.Image resizeMode="stretch" style={{opacity:opaAnimated, width:'100%',height:'100%',borderBottomLeftRadius:wp('15%'),borderBottomRightRadius:wp('15%'),
                 backgroundColor: 'transparent'}} source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${value.length ==0 ? "Jarvan" :Object.values(data)[Math.floor(Math.random() * Object.values(data).length)]["id"] }_0.jpg`}} ></Animated.Image>
          </View>
          
          
      )
});

   const gonder = ( champ,image )=>{
    

    setProgress(false)
 
    AsyncStorage.setItem('hero', champ).then(() => {
     // console.log("TOKEN ==>>", champ)

    });
    AsyncStorage.setItem('version', version[0]).then(() => {
     // console.log("TOKEN ==>>", version[0])

    });
    navigation.navigate('Detail',{champ})
   
   }
   


   
   
   const renderItem= ({item}) => {    
    const champ=item.id
    const name=item.name
    return(
      
            <TouchableOpacity onPress={()=>gonder(item.id,item.image.full)} style={styles.hero}>
          <Animated.Image  resizeMode="stretch" style={{width:wp('20%'),height:hp('10%'),transform:[{rotate:startInterpolate}],borderRadius:wp('5%')}} source={{uri:icon+""+item.image.full}} >
            </Animated.Image>   
            <Text style={styles.text} > {item.name} </Text>
        </TouchableOpacity>

      )
    }
    // const searchFilter = (textToSearch) => {
        
    //     setData( Object.values(newData).filter(i => i.name.toLowerCase().includes(textToSearch.toLowerCase())));
        
        
    //   };
     const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(Object.values(newData), hero => {
          return contains(hero, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
      };
      
      const contains = ({id,name}, query) => {
        
      
        if (id.toLowerCase().includes(query)){
          return true;
        }
      
        return false;
      };


     
    
      return (
    
        <View style={styles.container}>
          {/* <ImageBackground style={{
                    width:'100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position:'absolute'
                }} source={require('./assets/ground.jpg')}></ImageBackground> */}
          <View style={styles.header}> 
              
           <Swiper showsPagination={false} showsButtons={false}  autoplay={true}>
             {costum}
           </Swiper>
          </View>
          <View style={{marginTop:'3%',
        marginHorizontal:'20%',
        marginBottom:'3%'}}>
          <TextInput
    
                // onChangeText={(text)=>{                   
                //     searchFilter(text)     
                // }}
            
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search"
                style={{ backgroundColor: '#fff', paddingHorizontal: 20,borderRadius:10 }}
            
          />
          </View>
          
          <FlatList
                    contentContainerStyle={{flexGrow:1,}}
    
                    //ListHeaderComponent={renderHeader}
                  data={Object.values(data)}
                  initialNumToRender={7}
                    renderItem={renderItem}
                  refreshing={true}
                  keyExtractor={item=>item.key}
                  numColumns={4}
                  horizontal={false}
                
                />

          <StatusBar hidden={true} style="auto" />
        </View>
      );
     }
  
   
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position:'relative'
  },
  header:{
    
    height:'20%',
    width:'100%'  ,
    
    
   
  },
  headerText:{
    color:'black',
    fontSize:20
  },
  body:{
    
    flex:20,
    alignItems:'center',
    
   

  },
  input: {
    padding:4,
    fontSize: 15,
    backgroundColor: 'white',
    color:'#9642f7',
    borderWidth:2,
    borderRadius:10,
    borderColor:'#46c8fb',
  },
  hero:{
    
    flex:1,  
    marginHorizontal:'0.6%',
    
    alignItems:'center',
    marginBottom:'2%',
    justifyContent:'center'
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'white',
    textAlign:'center'
  }
});
