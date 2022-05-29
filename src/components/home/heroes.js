import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Heroes = (props) => (
  <View style={styles.container} key={props.keys}>
    <Image
      defaultSource={props.defaultSource}
      resizeMode="stretch"
      style={styles.image}
      source={props.source}
    ></Image>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    
  },
});

export default Heroes;
