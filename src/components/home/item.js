import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Item = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.hero}>
    <Image
      resizeMode="stretch"
      style={styles.image}
      source={{ uri: props.uri }}
    ></Image>
    {/* <Text
      maxFontSizeMultiplier={1}
      numberOfLines={1}
      style={[{ fontFamily: props.fontFamily }, styles.text]}
    >
      {" "}
      {props.name}{" "}
    </Text> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    width:'100%',
    height:'100%',
    borderRadius:25
  },
  hero: {
    width: wp("96%"),
    height: hp("25%"),
    borderRadius:10,
    marginBottom:wp('2%'),
    borderWidth:2,
    shadowColor:'black',
    elevation:8
  },
  text: {
    fontSize: hp("3%"),
    color: "black",
    textAlign: "center",
    width: wp("30%"),
  },
});

export default Item;
