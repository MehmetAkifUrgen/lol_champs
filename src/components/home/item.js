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
    <Text
      maxFontSizeMultiplier={1}
      numberOfLines={1}
      style={[{ fontFamily: props.fontFamily }, styles.text]}
    >
      {" "}
      {props.name}{" "}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    width: wp("24%"),
    height: hp("14%"),
    borderRadius: wp("2%"),
  },
  hero: {
    width: wp("30%"),
    height: hp("25%"),
    marginHorizontal: "0.6%",
    alignItems: "center",
    marginBottom: "2%",
    justifyContent: "center",
  },
  text: {
    fontSize: hp("2%"),
    color: "white",
    textAlign: "center",
    width: wp("30%"),
  },
});

export default Item;
