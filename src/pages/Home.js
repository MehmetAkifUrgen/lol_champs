import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, TextInput,Image, FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filter } from 'lodash';

export default function App() {

  const navigation = useNavigation();
  const veri="http://ddragon.leagueoflegends.com/cdn/11.8.1/data/tr_TR/champion.json";
  const icon ="http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/";
  const [data,setData]=useState([])
  const [newData,setnewData]=useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  
  

  const getChampionsName = () => {
    fetch(veri, {
    method: 'GET',
        }).then((response)=>response.json()).then((json)=>{setData(json.data); setnewData(json.data); setIsLoading(false) })
        .catch((err)=> {setIsLoading(false),
        setError(err)} );
        
    };


    useEffect(() => {
      setIsLoading(true);

      getChampionsName();
     
   },[] );

   
    if (isLoading) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
       </View>
     );
  }

   if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
       </Text>
     </View>
    );
  }


   const gonder = ( champ )=>{
    AsyncStorage.setItem('hero', champ).then(() => {
      console.log("TOKEN ==>>", champ)

    });
    navigation.navigate('Detail',{champ})
   }
   


   
   
   const renderItem= ({item}) => {

    
    
    
    const champ=item.id
    const name=item.name
    return(
        <TouchableOpacity onPress={()=> gonder(item.id)} style={styles.hero} >
          <Image  resizeMode="stretch" style={{width:100,height:100}} source={{uri:icon+""+item.image.full}} >
            </Image>   
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


      function renderHeader() {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              borderRadius: 20
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        );
      }


   
  return (
    
    <View style={styles.container}>
      {/* <ImageBackground style={{
                width:'100%',
                height: '100%',
                resizeMode: 'cover',
                position:'absolute'
            }} source={require('./assets/ground.jpg')}></ImageBackground> */}
      <View style={styles.header}> 
          
        <Image resizeMode="stretch" style={{width:'100%',height:'100%'}} source={require('../../assets/jarvan.jpg')} ></Image>
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
                renderItem={renderItem}
              refreshing={true}
              keyExtractor={item=>item.key}
              numColumns={4}
              horizontal={false}
            
            />
            
      
            
   
      
      
     
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
   
  },
  header:{
    
    height:'20%',
    width:'100%'  ,
    
    justifyContent:'center',
    alignItems:'center',
   
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
    marginBottom:'2%'
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'white'
  }
});
