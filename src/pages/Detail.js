import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Alert, TextInput,Image, FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Detail  ({route,navigation})  {
    const veri="http://ddragon.leagueoflegends.com/cdn/11.8.1/data/tr_TR/champion/";
    
    const [data,setData]=useState([]);
    const [newData,setNewData]=useState([]);
    const {champ}   = route.params;
    const [count,setCount]=useState(0);

    
    const getChampionsDetail = () => {
        fetch(veri+champ+".json", {
        method: 'GET',
      
            }).then((response)=>response.json()).then((json)=>setData(json.data))
            .catch((error)=>Alert(error));
            console.log('asdasd',data)
           
            
            
        };

        useEffect(() => {
            getChampionsDetail();
            if(data.length==0){
                setCount(count+1)
            }
            
         },[count] );

       

        const renderItem= ({item}) => {
            
            return(
                <Image 
                style={{width:'100%',height:'100%'}}    
                resizeMode="stretch" source={{uri:`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_${item.num}.jpg`}}>

                </Image>
              )
            }
         
         
            
    return(
        <View style={styles.container}>

            <View style={{flex:1,flexDirection:'row'}}>

                <View style={styles.left}>
                    {/* <Text style={{color:'white'}}> {newData.name} </Text>

                    <Text style={{color:'white'}} > {newData.title} </Text> */}

                </View>
                <View style={styles.right} >

                    <FlatList 
                        contentContainerStyle={{flexGrow:1,}}
                        //data={newData.skins}
                        renderItem={renderItem}
                        refreshing={true}
                        keyExtractor={item=>item.num}
                        numColumns={1}
                        horizontal={true}
                        

                    />

                    
                    

                </View>

            </View>

        </View>
    )


}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    left:{
        flex:1,
    },
    right:{
        
        flex:3
    }
})
