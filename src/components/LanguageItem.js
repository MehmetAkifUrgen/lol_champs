import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function LanguageItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.text}>
            {props.text}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'white',
        padding:10,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    text:{
        color:'black',
        fontSize:15
    }
})